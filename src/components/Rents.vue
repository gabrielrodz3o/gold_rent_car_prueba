<template>
  <v-container fluid>
    <v-flex xs12 sm12 offset-sm0 pt-2>
      <form>
        <v-layout column>
          <v-container>
            <v-row>
              <span
                v-if="types == 1"
                class="my-application3 px-4"
                style="font-size: 30px"
                >Mis rentas</span
              >

              <span
                v-if="types == 2"
                class="my-application3 px-4"
                style="font-size: 30px"
                >Rentas Solicitadas</span
              >
            </v-row>

            <v-row v-if="items.length > 0">
              <v-col cols="12">
                <v-data-table
                  dense
                  :headers="headers"
                  :items="items"
                  item-key="name"
                  class="elevation-1"
                >
                  <template v-slot:[`item.image`]="{ item }">
                    <v-img
                      width="100"
                      height="100"
                      :src="item.vehicle.vehicleImages.nodes[0].imageUrl"
                    >
                    </v-img>
                  </template>

                  <template v-slot:[`item.code`]="{ item }">
                    <span>
                      {{ String(item.rentalNumber).padStart(8, "0") }}</span
                    >
                  </template>
                  <template v-slot:[`item.vehicleName`]="{ item }">
                    {{ item.vehicle.vehicleBrand.name }}
                    {{ item.vehicle.vehicleModel.name }}
                    {{ item.vehicle.year }}</template
                  >

                  <template v-slot:[`item.recogida`]="{ item }">
                    <template v-if="item.branch">
                      {{ item.branch.name }}
                    </template>
                    <template v-if="item.provinceByFromProvince">
                      {{ item.provinceByFromProvince.name }}
                    </template>

                    <template v-if="item.airportByFromAirport">
                      {{ item.airportByFromAirport.name }}
                    </template></template
                  >
                  <template v-slot:[`item.devuelta`]="{ item }">
                    <template v-if="item.branch">
                      {{ item.branch.name }}
                    </template>
                    <template v-if="item.airportByToAirport">
                      {{ item.airportByToAirport.name }}
                    </template>
                    <template v-if="item.provinceByFromProvince">
                      {{ item.provinceByToProvince.name }}
                    </template>
                  </template>

                  <template v-slot:[`item.solicitante`]="{ item }">
                    <template>
                      {{ item.userByRequestedBy.firstname }}
                      {{ item.userByRequestedBy.lastname }}
                    </template>
                  </template>
                  <template v-slot:[`item.status`]="{ item }">
                    <template>
                      <v-chip
                        outlined
                        class="ma-2"
                        :color="getColor(item.rentalStates.nodes[0])"
                      >
                        {{ item.rentalStates.nodes[0].rentalStateType.name }}
                        <!-- <span>{{ getData(item) }}</span> -->
                      </v-chip></template
                    >
                  </template>
                  <template v-slot:[`item.amount`]="{ item }">
                    {{ item.totalAmount }} USD
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

                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          @click="
                            clear(),
                              (selectedItem = item),
                              (dialogPayment = true)
                          "
                          v-if="
                            item.rentalStates.nodes[0].rentalStateType.rowId ==
                            `5a8e53a5-a537-4c8c-8749-32a4619de80c`
                          "
                          class="mr-2"
                          large
                          color="success"
                          v-bind="attrs"
                          v-on="on"
                          >upload</v-icon
                        >
                      </template>
                      <span>Subir pago</span>
                    </v-tooltip>

                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          @click="
                            clear(),
                              (selectedItem = item),
                              (dialogStatus = true)
                          "
                          class="mr-2"
                          large
                          color="grey"
                          v-bind="attrs"
                          v-on="on"
                          >toc</v-icon
                        >
                      </template>
                      <span>Estados</span>
                    </v-tooltip>
                  </template>
                </v-data-table>
              </v-col>

              <v-list v-if="type == 2" width="100%">
                <template>
                  <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    class="pt-2"
                  >
                    <v-card
                      @click="showReserve(item)"
                      style="
                        border: 3px solid rgb(0, 0, 0);
                        border-radius: 0.15rem;
                      "
                      width="100%"
                      outlined
                      class="rounded-lg"
                    >
                      <v-row no-gutters justify="center">
                        <v-col cols="12" md="4">
                          <v-card elevation="0" class="pt-4 pb-4 px-4">
                            <v-img
                              :aspect-ratio="1"
                              class="rounded-lg"
                              :src="
                                item.vehicle.vehicleImages.nodes[0].imageUrl
                              "
                            >
                              <template v-slot:placeholder>
                                <v-sheet>
                                  <v-skeleton-loader
                                    class="mx-auto"
                                    width="100%"
                                    height="100%"
                                    type="image,image,image"
                                  ></v-skeleton-loader>
                                </v-sheet> </template
                            ></v-img>
                          </v-card>
                        </v-col>
                        <v-col cols="12" md="8">
                          <v-card-title class="my-application3">
                            {{ item.vehicle.vehicleBrand.name }}
                            {{ item.vehicle.vehicleModel.name }}
                            {{ item.vehicle.year }}
                            <v-spacer> </v-spacer>

                            <v-icon size="30px" dense> visibility </v-icon>
                          </v-card-title>
                          <v-card-text>
                            <v-icon> calendar_month </v-icon><b></b>
                            {{ item.fromDate }} <v-icon> calendar_month </v-icon
                            ><b></b> {{ item.toDate }} (
                            {{ item.requestDayQuantity }} dias )<br />
                            <v-icon> location_on </v-icon>

                            <template v-if="item.provinceByFromProvince">
                              {{ item.provinceByFromProvince.name }}
                            </template>

                            <template v-if="item.airportByFromAirport">
                              {{ item.airportByFromAirport.name }}
                            </template>

                            <br />
                            <v-icon> location_on </v-icon>

                            <template v-if="item.airportByToAirport">
                              {{ item.airportByToAirport.name }}
                            </template>
                            <template v-if="item.provinceByFromProvince">
                              {{ item.provinceByToProvince.name }}
                            </template>
                          </v-card-text>
                          <v-card-text class="text-end">
                            <span
                              class="my-application3"
                              style="font-size: large"
                            >
                              {{ item.totalAmount }} USD
                            </span>
                            <br />
                            {{
                              item.rentalStates.nodes[0].rentalStateType.name
                            }}
                          </v-card-text>
                          <v-card-text> </v-card-text>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-list-item>
                </template>
              </v-list>
            </v-row>
            <v-row justify="center" align="center" v-else>
              <v-col cols="12">
                <v-row justify="center" class="mt-14">
                  No tienes ninguna renta
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
        v-model="dialog"
      >
        <v-card elevation="0">
          <v-row v-if="dialog" class="" no-gutters>
            <ViewReserveVue
              @close-dialog="dialog = false"
              :items="selectedItem"
            />
          </v-row>

          <v-row
            v-if="dialog"
            no-gutters
            class="pb-4 align-xl-stretchs justify-space-around"
            justify=""
          >
            <v-col cols="12" md="8">
              <v-row class="pb-4 align-xl-stretchs justify-space-around">
                <v-btn
                  large
                  outlined
                  class="px-2"
                  @click="approveOrRechaze(selectedItem, true)"
                  v-if="
                    types == 2 &&
                    selectedItem.rentalStates.nodes[0].rentalStateType.rowId ==
                      'e7640557-d6b3-4160-9306-33f36737be42'
                  "
                >
                  <v-icon class="mr-2" large color="primary">thumb_up</v-icon>
                  Aceptar Peticion
                </v-btn>

                <v-btn
                  outlined
                  large
                  @click="approveOrRechaze(selectedItem, false)"
                  v-if="
                    types == 2 &&
                    selectedItem.rentalStates.nodes[0].rentalStateType.rowId ==
                      'e7640557-d6b3-4160-9306-33f36737be42'
                  "
                >
                  <v-icon class="mr-2" large color="red">thumb_down</v-icon>
                  Rechazar Peticion
                </v-btn>

                <v-btn
                  large
                  outlined
                  v-if="
                    selectedItem.rentalStates.nodes[0].rentalStateType.rowId !=
                      '07da1179-aae9-4627-8ed7-7db20929c09c' &&
                    selectedItem.rentalStates.nodes[0].rentalStateType.rowId !=
                      'f1357418-6331-414e-a5cd-dffd0555e473'
                  "
                  @click="cancelRequest(selectedItem)"
                >
                  <v-icon class="mr-2" large color="red">cancel</v-icon>
                  Cancelar
                </v-btn>
                <v-btn
                  outlined
                  large
                  v-if="
                    selectedItem.rentalStates.nodes[0].rentalStateType.rowId ==
                    'f62957c9-ebd3-4cd8-a562-f20f807376d1'
                  "
                  @click="checkPayments()"
                >
                  <v-icon class="mr-2" large color="success">payments</v-icon>
                  Verificar pago
                </v-btn>

                <v-btn
                  large
                  outlined
                  v-if="
                    selectedItem.rentalStates.nodes[0].rentalStateType.rowId ==
                    '95de2f01-893b-44ed-a694-ab7a2b9ef36b'
                  "
                  @click="createRentalState(`rent`)"
                >
                  <v-icon class="mr-2" large color="success">car_rental</v-icon>
                  Poner en renta
                </v-btn>

                <v-btn
                  large
                  outlined
                  v-if="
                    selectedItem.rentalStates.nodes[0].rentalStateType.rowId ==
                    '1e7fea0a-2653-44b7-a416-84f5b33ac656'
                  "
                  @click="createRentalState(`end`)"
                >
                  <v-icon class="mr-2" large color="success">no_crash</v-icon>
                  Finalizar
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

      <v-dialog
        transition="dialog-bottom-transition"
        max-width="900px"
        v-model="dialogPayment"
      >
        <v-card width="900px" height="600px" elevation="0">
          <v-row class="pt-4" justify="center" no-gutters>
            <span style="font-size: 20px" class="my-application3">
              Seleciona el tipo de pago
            </span>
          </v-row>
          <v-row no-gutters class="pt-4" justify="center">
            <v-col cols="12" md="6">
              <v-autocomplete
                outlined
                v-model="selectedPayment"
                :items="typePayments"
                prepend-inner-icon="payment"
                filled
                return-object
                background-color="grey lighten-5"
                label="Tipo de pago"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="6">
              <v-row justify="center">
                <v-btn color="primary" class="btn btn-info" @click="onPickFile">
                  Seleciona la foto
                </v-btn>

                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  accept="image/*"
                  @change="selectFile"
                />
              </v-row>
            </v-col>
          </v-row>
          <v-row
            class="mt-10"
            v-if="viewImage == true"
            no-gutters
            justify="center"
          >
            <v-col cols="12" md="6">
              <v-row justify="center">
                <v-img
                  v-for="(item, i) of itemsImages"
                  :key="i"
                  class="rounded-lg"
                  :src="item.path"
                  width="350px"
                  height="350px"
                >
                </v-img>
              </v-row>
            </v-col>
          </v-row>

          <v-row
            v-if="itemsImages.length > 0"
            class="mt-8"
            justify="center"
            no-gutters
          >
            <v-col cols="12" md="6">
              <v-row justify="center">
                <v-btn
                  :loading="loading"
                  @click="sendPayment()"
                  color="primary"
                >
                  <v-icon> send </v-icon>
                  Enviar
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

      <v-dialog
        transition="dialog-bottom-transition"
        width="1000px"
        v-model="dialogStatus"
      >
        <v-card>
          <v-row justify="end" no-gutters>
            <v-col cols="12" md="12"> </v-col>
            <v-col cols="12" md="1">
              <v-icon @click="dialogStatus = false" size="40px">close</v-icon>
            </v-col>
          </v-row>
          <v-row class="pt-4" justify="center" no-gutters>
            <span style="font-size: 20px" class="my-application3">
              Estado reserva
            </span>
          </v-row>
          <v-col cols="12" md="10" aling="center" offset="1">
            <v-timeline
              v-if="selectedItem.rentalStates"
              align-top
              :dense="$vuetify.breakpoint.smAndDown"
            >
              <v-timeline-item
                class="mt-n8"
                v-for="(item, i) in selectedItem.rentalStates.nodes"
                :key="i"
                :color="getColor(item)"
                fill-dot
              >
                <v-card :color="getColor(item)" dark>
                  <v-card-title class="text-h6">
                    {{ item.rentalStateType.name }}
                  </v-card-title>
                  <v-card-text class="white text--primary">
                    <p>{{ showData(item.addedAt) }}</p>
                    <v-btn
                      :loading="loadingPay"
                      @click="deleteStatus(item)"
                      v-if="types == 2"
                      :color="getColor(item)"
                      class="mx-0"
                      outlined
                    >
                      Eliminar
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline></v-col
          >
        </v-card>
      </v-dialog>
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="1000px"
        v-model="dialogImage"
      >
        <v-card width="1000px" height="100%" elevation="0">
          <v-row justify="end" no-gutters>
            <v-icon @click="dialogImage = false" size="40px">close</v-icon>
          </v-row>
          <v-row justify="center" no-gutters>
            <v-col cols="12" md="8">
              <v-img contain :aspect-ratio="1" :src="selectedImage"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
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
            </v-col>
            <v-col cols="12" md="1">
              <v-icon @click="dialogPayments = false" size="40px">close</v-icon>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="12" md="8">
              <v-row no-gutters justify="center">
                <template v-for="(item, i) in payments">
                  <v-list-item :key="i">
                    <v-list-item-avatar>
                      <v-img
                        contain
                        width="100px"
                        height="100px"
                        :src="item.paymentPhotoUrl"
                      >
                      </v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        class="my-application3"
                        v-text="item.paymentType.name"
                      >
                      </v-list-item-title>

                      <v-list-item-subtitle>{{
                        showData(item.createdAt)
                      }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-row>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              @click="
                                (dialogImage = true),
                                  (selectedImage = item.paymentPhotoUrl)
                              "
                              v-bind="attrs"
                              v-on="on"
                              icon
                            >
                              <v-icon color="blue">visibility</v-icon>
                            </v-btn>
                          </template>
                          <span>Ver pago</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              :loading="loadingPay"
                              @click="approveOrRejectPayment(true)"
                              v-bind="attrs"
                              v-on="on"
                              icon
                            >
                              <v-icon color="success lighten-1"
                                >thumb_up</v-icon
                              >
                            </v-btn>
                          </template>
                          <span>Aceptar pago</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              :loading="loadingPay"
                              @click="approveOrRejectPayment(false)"
                              v-bind="attrs"
                              v-on="on"
                              icon
                            >
                              <v-icon color="red lighten-1">thumb_down</v-icon>
                            </v-btn>
                          </template>
                          <span>Cancelar pago</span>
                        </v-tooltip>
                      </v-row>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider></v-divider> </template
              ></v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-container>
</template>

<script>
import ViewReserveVue from "./ViewReserve.vue";
import {
  SEND_EMAIL,
  APPROVAL_OR_REJECT_RQUEST,
  CANCEL_REQUEST,
  GO_PAYMENT,
  DELETE_RENTAL_STATE,
  CREATE_RENTAL_STATE,
  APPROVAL_OR_REJECT_PAYMENT,
} from "../gql/mutation";
import { GET_PAYMENT_TYPES, GET_PAYMENTS } from "../gql/queries";
import { uuid } from "vue-uuid";
import firebase from "firebase/compat/app";
import moment from "moment";
import "firebase/compat/storage";
export default {
  components: { ViewReserveVue },
  data() {
    return {
      loading: false,
      dialog: false,
      dialogPayment: false,
      dialogStatus: false,
      dialogPayments: false,
      dialogImage: false,
      loadingPay: false,
      selectedImage: null,
      viewImage: false,
      selectedItem: [],
      typePayments: [],
      itemsImages: [],
      myNewImages: [],
      payments: [],
      imagesUploaded: "",
      selectedPayment: "",
      headers: [
        {
          align: "start",
          sortable: false,
          value: "image",
        },
        { text: "Codigo", value: "code" },
        { text: "Vehiculo", value: "vehicleName" },
        { text: "Recogida", value: "recogida", width: "15%" },
        { text: "Devuelta", value: "devuelta", width: "15%" },
        { text: "Solicitante", value: "solicitante", width: "10%" },
        { text: "Estatus", value: "status" },
        { text: "Precio", value: "amount", width: "8%" },
        { text: "Actions", value: "actions", width: "15%" },
      ],
      type: 1,
      showRentals: true,
      rentals: [],
      image: null,
    };
  },
  props: {
    items: {
      type: Array,
    },
    types: {
      type: String,
    },
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
    async deleteStatus(item) {
      this.loadingPay = true;
      try {
        var data = await this.$apollo.mutate({
          mutation: DELETE_RENTAL_STATE,
          variables: {
            rentalId: this.selectedItem.rowId,
            rentalStateTypeId: item.rentalStateType.rowId,
          },
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      } finally {
        this.$emit("refresh-rent");
      }
      this.loadingPay = false;
    },
    showData(item) {
      return moment(item).format("YYYY-MM-DD - hh:mm:ss A");
    },
    clear() {
      this.selectedItem = [];
      this.selectedPayment = "";
      this.itemsImages = [];
      this.myNewImages = [];
      this.payments = [];
      this.imagesUploaded = "";
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
      this.loadingPay = true;
      try {
        var data = await this.$apollo.mutate({
          mutation: APPROVAL_OR_REJECT_PAYMENT,
          variables: {
            rentalId: this.selectedItem.rowId,
            userId: this.$store.state.Auth.user.rowId,
            approval: type,
          },
        });
        var dataEmail = data.data.approvalOrRejectPayment.rental;
        console.log(dataEmail);
        var html = `
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Invoice details</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin: 0; padding: 0; background-color:#eaeced " bgcolor="#ffff">
    <table bgcolor="#eaeced" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffff; ">
        <tr>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>

                <table align="center" bgcolor="#ffffff" cellpadding="20" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #f0f0f0;">
                    <tr style="border-top: 4px solid #FFE404;">
                        <td align="left" style="padding: 15px 20px 20px;">
                            <table width="100%">
                                <tr>
                                    <td><img src='${localStorage.getItem(
                                      "logo"
                                    )}'
                                      
                                   width="200px" /></td>

                                </tr>
                                <tr>
                                    <td>
                                        <h2>RESERVACION DE VEHICULO</h2>
                                    <td>
                                    <td>
                                </tr>
                                <tr>
                                    <td> <span>Fecha: </span><b>   ${
                                      dataEmail.fromDate
                                    }' </b>
                                    <td>
                                    <td>
                                </tr>
                                <tr>
                                    <td> <span>Nombre: </span><b>${
                                      dataEmail.userByRequestedBy.firstname
                                    } ${
          dataEmail.userByRequestedBy.lastname
        }</b>
                                    <td>
                                    <td>
                                </tr>
                                <tr>
                                    <td> <span>Email: </span><b>${
                                      dataEmail.userByRequestedBy.email
                                    }</b>
                                    <td>
                                    <td>
                                </tr>
                                <tr>
                                    <td> <span>Vehiculo: </span><b>${
                                      dataEmail.vehicle.vehicleModel.name
                                    } ${dataEmail.vehicle.vehicleBrand.name} ${
          dataEmail.vehicle.year
        }</b>
                                    <td>
                                    <td>
                                </tr>
                                <tr >
                                    <td  style="  margin-top: 10px;"> <span>Aeropuerto llegada: </span><b>${
                                      dataEmail.airportByFromAirport.name
                                    }</b>
                                    <td>
                                    <td>
                                </tr>
                                  <tr>
                                    <td> <span>Aerolina llegada: </span><b>${
                                      dataEmail.airlineByFromAirline.name
                                    }</b>
                                    <td>
                                    <td>
                                </tr>
                                <tr >
                                    <td> <span>Aeropuerto salida: </span><b>${
                                      dataEmail.airportByToAirport.name
                                    }</b>
                                    <td>
                                    <td>
                                </tr>
                                   <tr>
                                    <td> <span> Aerolina salida: </span><b>${
                                      dataEmail.airlineByToAirline.name
                                    }</b>
                                    <td>
                                    <td>
                                </tr>
                                <tr style="  margin-top: 10px;">
                                    <td> <span>No vuelo: </span><b>${
                                      dataEmail.toFlightNumber
                                    }</b>
                                    <td>
                                    <td>
                                </tr>
                                <tr style="  margin-top: 10px;">
                                    <td> <span>Desde: </span><b>${
                                      dataEmail.fromDate
                                    }</b> <span style="margin-left:15px">Hasta: </span><b>${
          dataEmail.toDate
        }</b>
                                    <td>
                                    <td>
                                </tr>

                                <tr>
                                    <td> <span>Hora llegada: </span><b>${
                                      dataEmail.fromTime
                                    }</b> <span style="margin-left:15px">Hora salida: </span><b>${
          dataEmail.toTime
        }</b>
                                    <td>
                                    <td>
                                </tr>

                                <tr style="  margin-top: 10px;">
                                    <td> <span>Dias reservado: </span><b>${
                                      dataEmail.dayQuantity
                                    }</b>
                                    <td>
                                    <td>
                                </tr>
                                <tr>
                                    <td> <span>Deposito: </span><b>200.00</b>
                                    <td>
                                    <td>
                                </tr>
                                <tr>
                                    <td> <span>Observacion: </span><b>--</b>
                                    <td>
                                    <td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px; border-top: 1px solid #f0f0f0; background: #fafafa; font-family: 'Open Sans',Helvetica,Arial,sans-serif; ">
                            <div>Total Reserva:</div>
                            <h2 style="margin: 10px 0; color: #333; font-weight: 500; font-size: 48px;">
                                ${dataEmail.totalAmount}
                            </h2>

                        </td>
                    </tr>
                    <tr>

                    </tr>
                    <tr style="border-top: 1px solid #eaeaea;">
                        <td align="center">
                            <div style="font-family: 'Open Sans',Helvetica,Arial,sans-serif;font-size: 14px;line-height: 1.4;color: #777;">
                                Gold rent car
                            </div>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
        <tr>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
        </tr>
    </table>
</body>

</html>
        `;

        var sendEmailClient = await this.$apollo.mutate({
          mutation: SEND_EMAIL,
          variables: {
            from: localStorage.getItem("emailSend"),
            to: this.$store.state.Auth.user.email,
            subject: "FACTURA",
            text: "HOLA",
            html: html,
          },
        });
        var sendEmailCompany = await this.$apollo.mutate({
          mutation: SEND_EMAIL,
          variables: {
            from: localStorage.getItem("emailSend"),
            to: localStorage.getItem("email"),
            subject: "FACTURA",
            text: "HOLA",
            html: html,
          },
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      } finally {
        this.dialogPayments = false;
        this.$emit("refresh-rent");
      }
      this.loadingPay = false;
    },
    async createRentalState(type) {
      var state = "";
      if (type == "rent") {
        state = "1e7fea0a-2653-44b7-a416-84f5b33ac656";
      }

      if (type == "end") {
        state = "07da1179-aae9-4627-8ed7-7db20929c09c";
      }

      try {
        var data = await this.$apollo.mutate({
          mutation: CREATE_RENTAL_STATE,
          variables: {
            rentalId: this.selectedItem.rowId,
            rentalStateTypeId: state,
            userId: this.$store.state.Auth.user.rowId,
          },
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      } finally {
        this.$emit("refresh-rent");
      }
    },
    async cancelState(type) {
      var state = "";
      if (type == "wait-pay") {
        state = "f62957c9-ebd3-4cd8-a562-f20f807376d1";
      }
      if (type == "rent") {
        state = "1e7fea0a-2653-44b7-a416-84f5b33ac656";
      }

      if (type == "final") {
        state = "07da1179-aae9-4627-8ed7-7db20929c09c";
      }

      try {
        var data = await this.$apollo.mutate({
          mutation: DELETE_RENTAL_STATE,
          variables: {
            rentalId: this.selectedItem.rowId,
            rentalStateTypeId: state,
            userId: this.$store.state.Auth.user.rowId,
          },
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      } finally {
        this.$emit("refresh-rent");
      }
    },
    async sendPayment() {
      if (this.itemsImages.length == 0) {
        return;
      }

      if (this.selectedPayment == "") {
        return;
      }
      this.loading = true;
      this.myNewImages = [];
      for (var item of this.itemsImages) {
        var uid = uuid.v1();
        var name = uid.toString() + ".jpg";

        this.myNewImages.push({
          name: name,
          path: item.path,
        });
      }

      try {
        var images = "";
        for (var items of this.myNewImages) {
          images = await this.uploadImages(items);

          this.imagesUploaded = images;
        }

        var data = await this.$apollo.mutate({
          mutation: GO_PAYMENT,
          variables: {
            rentalId: this.selectedItem.rowId,
            rentalPaymentTypeId: this.selectedPayment.value,
            userId: this.$store.state.Auth.user.rowId,
            paymentAmount: 1,
            paymentPhotoUrl: this.imagesUploaded,
            paymentReferences: "",
          },
        });

        this.clear();
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
        await this.deleteImg();
        this.clear();
      } finally {
        this.$emit("refresh-rent");
      }
      this.loading = false;
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    selectFile(files) {
      this.itemsImages = [];
      this.viewImage = false;
      for (var item of files.target.files) {
        const promise = new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(item);
        });

        promise.then((item) => {
          this.itemsImages.push({ path: item });
        });
      }
      this.viewImage = true;
    },
    async uploadImages(item) {
      var storageRef = firebase.auth().app.storage().ref();
      var mountainsRef = storageRef.child(`deposit_photos/${item.name}`);
      var snapshot = await mountainsRef.putString(
        item.path.split("data:image/jpeg;base64,")[1],
        "base64",
        {
          contentType: "image/jpeg",
        }
      );
      var downloadURL = await snapshot.ref.getDownloadURL();

      return downloadURL;
    },
    async deleteImg() {
      let storageRef = firebase.auth().app.storage().ref();
      let desertRef = storageRef
        .child("vehicle_images")
        .storage.refFromURL(this.imagesUploaded);
      await desertRef.delete();
    },
    async getItems() {
      var dataPayments = await this.$apollo.query({
        query: GET_PAYMENT_TYPES,
        variables: {
          companyId: this.$companie_id,
        },
      });
      for (var item of dataPayments.data.rentalPaymentTypes.nodes) {
        this.typePayments.push({ text: item.name, value: item.rowId });
      }
    },
    async cancelRequest(item) {
      try {
        var data = await this.$apollo.mutate({
          mutation: CANCEL_REQUEST,
          variables: {
            rentalId: item.rowId,

            userId: this.$store.state.Auth.user.rowId,
          },
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      } finally {
        this.$emit("refresh-rent");
      }
    },
    async approveOrRechaze(item, type) {
      try {
        var data = await this.$apollo.mutate({
          mutation: APPROVAL_OR_REJECT_RQUEST,
          variables: {
            rentalId: item.rowId,
            approval: type,
            userId: this.$store.state.Auth.user.rowId,
          },
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      } finally {
        this.$emit("refresh-rent");
      }
    },
    watchItem(item) {
      this.selectedItem = item;
      this.dialog = true;
    },
    getData(item) {
      var a = item.rentalStates.nodes.pop();

      return a.rentalStateType.name;
    },
    getColor(item) {
      if (
        item.rentalStateType.rowId == "e7640557-d6b3-4160-9306-33f36737be42"
      ) {
        return "orange";
      }
      if (
        item.rentalStateType.rowId == "5a8e53a5-a537-4c8c-8749-32a4619de80c"
      ) {
        return "blue";
      }

      if (
        item.rentalStateType.rowId == "297b4219-522c-4819-b9c5-4b2246051d5e"
      ) {
        return "red lighten-1";
      }

      if (
        item.rentalStateType.rowId == "f1357418-6331-414e-a5cd-dffd0555e473"
      ) {
        return "red accent-4";
      }
      if (
        item.rentalStateType.rowId == "07da1179-aae9-4627-8ed7-7db20929c09c"
      ) {
        return "success";
      }
      if (
        item.rentalStateType.rowId == "1e7fea0a-2653-44b7-a416-84f5b33ac656"
      ) {
        return "indigo ";
      }

      if (
        item.rentalStateType.rowId == "95de2f01-893b-44ed-a694-ab7a2b9ef36b"
      ) {
        return "cyan ";
      }

      if (
        item.rentalStateType.rowId == "f62957c9-ebd3-4cd8-a562-f20f807376d1"
      ) {
        return "blue-grey";
      }
    },

    showReserve(item) {},
  },
};
</script>

<style></style>
