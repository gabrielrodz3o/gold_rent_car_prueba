<template>
  <v-container fluid>
    <v-flex xs12 sm12 offset-sm0 pt-2>
      <form>
        <v-row justify="center" v-if="loaded">
          <v-col cols="6">
            <v-skeleton-loader
              class="mt-10"
              type="article, actions"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-layout v-else column>
          <v-container>
            <v-row v-if="requestPayments.length > 0">
              <v-col cols="12">
                <v-data-table
                  dense
                  :headers="headers"
                  :items="requestPayments"
                  item-key="name"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat id="toolbar">
                      <span class="pl-2">Pagos</span>
                      <v-divider class="mx-4" inset vertical></v-divider>

                      <v-spacer></v-spacer>
                      <!-- <v-text-field
                        class="text-xs-center"
                        v-model="search"
                        append-icon="search"
                        label="Buscar"
                        single-line
                        hide-details
                      >
                      </v-text-field> -->
                      <v-spacer></v-spacer>

                      <v-divider class="mx-4" inset vertical></v-divider>
                    </v-toolbar>
                  </template>

                  <template v-slot:[`item.approved`]="{ item }">
                    <v-chip color="success" v-if="item.approved == true">
                      Aprobado
                    </v-chip>
                    <v-chip color="orange" v-if="item.approved == null">
                      En espeta de aprobacion
                    </v-chip>
                    <v-chip color="red" v-if="item.approved == false">
                      Rechazado
                    </v-chip>
                  </template>

                  <template v-slot:[`item.paymentType`]="{ item }">
                    <v-row no-gutters>
                      <v-img
                        contain
                        width="30"
                        height="30"
                        :src="item.paymentType.iconUrl"
                      >
                      </v-img>

                      <span>{{ item.paymentType.name }}</span>
                      <v-spacer></v-spacer>
                    </v-row>
                    <v-spacer></v-spacer>
                  </template>

                  <template v-slot:[`item.actions`]="{ item }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          @click="watchItem(item)"
                          class="mr-2"
                          large
                          color="blue"
                          v-bind="attrs"
                          v-on="on"
                          >visibility</v-icon
                        >
                      </template>
                      <span>Ver</span>
                    </v-tooltip>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row justify="center" align="center" v-else>
              <v-col cols="12">
                <v-row justify="center" class="mt-14">
                  No tienes ninguna peticion de supcripciones
                </v-row>

                <v-row justify="center" class="mt-10">
                  <v-btn>
                    <v-icon> search </v-icon>
                    Busca un vehiculo
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-layout>
      </form>

      <v-dialog
        transition="dialog-bottom-transition"
        max-width="1000px"
        v-model="dialogPayments"
      >
        <v-card width="1000px" height="600px" elevation="0">
          <v-row class="pt-4" justify="center" no-gutters>
            <v-col cols="12" md="1"> </v-col>
            <v-col cols="12" md="10">
              <v-row justify="center">
                <span style="font-size: 20px" class="my-application3">
                  Pagos
                </span>
              </v-row>

              <v-row v-if="selectedItem != ``" justify="center">
                <span style="font-size: 20px" class="my-application3">
                  {{ selectedItem.subscription.name }}
                  ${{ selectedItem.subscription.price }}
                  {{ selectedItem.user.firstname }}
                  {{ selectedItem.user.lastname }}
                </span>
              </v-row>
            </v-col>
            <v-col cols="12" md="1">
              <v-icon @click="dialogPayments = false" size="40px">close</v-icon>
            </v-col>
          </v-row>
          <v-row class="pt-4" no-gutters justify="center">
            <v-col cols="12">
              <v-row justify="center">
                <v-img
                  contain
                  width="500px"
                  height="500px"
                  :src="selectedItem.paymentPhotoUrl"
                >
                </v-img>
              </v-row>

              <v-row class="mt-4" justify="center">
                <v-btn
                  v-if="selectedItem.approved == null"
                  class="mx-2"
                  outlined
                  @click="approveOrRejectPayment(true)"
                >
                  <v-icon color="success lighten-1">thumb_up</v-icon>Aceptar
                  pago
                </v-btn>

                <v-btn
                  v-if="selectedItem.approved != false"
                  class="mx-2"
                  outlined
                  @click="approveOrRejectPayment(false)"
                >
                  <v-icon color="red lighten-1">thumb_down</v-icon>Cancelar pago
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-container>
</template>

<script>
import {
  APPROVAL_OR_REJECT_RQUEST,
  CANCEL_REQUEST,
  APROVE_OR_REJECT_PAYMENT_SUPCRIPTIONS,
  DELETE_RENTAL_STATE,
  CREATE_RENTAL_STATE,
  APPROVAL_OR_REJECT_PAYMENT,
} from "../gql/mutation";
import {
  GET_PAYMENT_TYPES,
  GET_PAYMENTS,
  GET_SUPCRIPTIONS_PAYMENT,
} from "../gql/queries";
import { uuid } from "vue-uuid";
import firebase from "firebase/compat/app";
import moment from "moment";
import "firebase/compat/storage";
export default {
  components: {},
  data() {
    return {
      loaded: false,
      loading: false,
      dialog: false,
      dialogPayment: false,
      dialogStatus: false,
      dialogPayments: false,
      dialogImage: false,
      selectedImage: null,
      viewImage: false,
      requestPayments: [],
      selectedItem: [],
      typePayments: [],

      payments: [],

      selectedPayment: "",
      headers: [
        {
          align: "start",
          sortable: false,
          value: "image",
        },
        { text: "Supcripcion", value: "subscription.name" },
        { text: "Precio", value: "subscription.price" },
        { text: "Usuario", value: "user.firstname", width: "15%" },
        { text: "Tipo pago", value: "paymentType", align: "center" },
        { text: "Status", value: "approved", width: "10%" },

        { text: "Actions", value: "actions", width: "15%" },
      ],
      type: 1,
      showRentals: true,
      rentals: [],
      image: null,
    };
  },

  created() {
    this.getItems();
  },
  computed: {
    profile() {
      return this.$store.state.Auth;
    },
  },
  methods: {
    watchItem(item) {
      this.selectedItem = item;
      this.dialogPayments = true;
    },

    showData(item) {
      return moment(item).format("YYYY-MM-DD - hh:mm:ss A");
    },
    clear() {
      this.selectedItem = [];

      this.dialogPayment = false;
    },
    async checkPayments() {
      this.payments = [];
      var payments = await this.$apollo.query({
        query: GET_PAYMENTS,
        variables: { rentalId: this.selectedItem.rowId },
      });

      this.payments = payments.data.rentalPayments.nodes;
      this.dialogPayments = true;
    },
    async approveOrRejectPayment(type) {
      try {
        var data = await this.$apollo.mutate({
          mutation: APROVE_OR_REJECT_PAYMENT_SUPCRIPTIONS,
          variables: {
            subscriptionId: this.selectedItem.subscription.rowId,
            approval: type,
            paymentDate: this.selectedItem.paymentDate,
            userId: this.$store.state.Auth.user.rowId,
          },
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      } finally {
        this.getItems();
        this.dialogPayments = false;
      }
    },

    async getItems() {
      this.loaded = true;
      this.requestPayments = [];
      var dataPayments = await this.$apollo.query({
        query: GET_PAYMENT_TYPES,
        variables: {
          companyId: this.$companie_id,
        },
        fetchPolicy: "no-cache",
      });
      var requestPayments = await this.$apollo.query({
        query: GET_SUPCRIPTIONS_PAYMENT,
        variables: {
          companyId: this.$companie_id,
        },
        fetchPolicy: "no-cache",
      });
      this.requestPayments = requestPayments.data.subscriptionPayments.nodes;

      for (var item of dataPayments.data.rentalPaymentTypes.nodes) {
        this.typePayments.push({ text: item.name, value: item.rowId });
      }
      this.loaded = false;
    },
  },
};
</script>

<style></style>
