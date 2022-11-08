<template>
  <v-flex>
    <v-col cols="12" md="10" offset="1">
      <v-data-table
        :headers="headers"
        :items="suscriptions"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Suscripciones</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="1000px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="clear()"
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nueva suscripcion
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-stepper class="elevation-0" v-model="e1">
                      <v-stepper-header class="elevation-0">
                        <v-stepper-step :complete="e1 > 1" step="1">
                          Datos Generales
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 2" step="2">
                          Aeropuertos
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 3" step="3">
                          Provincia
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 4" step="4">
                          Acesorios
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 5" step="5">
                          Seguros adicionales
                        </v-stepper-step>
                      </v-stepper-header>

                      <v-stepper-items>
                        <v-stepper-content step="1">
                          <v-card
                            class="mb-12"
                            color="white lighten-1"
                            height="500px"
                            elevation="0"
                          >
                            <v-row justify="center">
                              <v-col cols="12">
                                <v-row
                                  class="mt-n0"
                                  justify="center"
                                  no-gutters
                                >
                                  <span class="my-application2">
                                    <v-btn-toggle
                                      v-model="selectCurrencie"
                                      mandatory
                                    >
                                      <v-btn
                                        value="51ab2049-6996-4cf1-8249-70211bf8c10e"
                                      >
                                        DOP
                                      </v-btn>
                                      <v-btn
                                        value="12dc055e-6c96-455f-9090-1f76c43b52c1"
                                      >
                                        USD
                                      </v-btn>
                                    </v-btn-toggle>
                                  </span>
                                </v-row>

                                <v-row
                                  class="mt-n2"
                                  no-gutters
                                  justify="center"
                                >
                                  <v-col cols="12" sm="6" md="5">
                                    <v-text-field
                                      outlined
                                      clearable
                                      v-model="editedItem.name"
                                      label="Nombre de la suscripcion"
                                    ></v-text-field>
                                  </v-col>
                                  <v-spacer></v-spacer>
                                  <v-col cols="12" sm="6" md="5">
                                    <v-text-field
                                      outlined
                                      clearable
                                      v-model="editedItem.nameEn"
                                      label="Nombre de la suscripcion en ingles"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>

                                <v-row no-gutters justify="center">
                                  <v-col cols="12" sm="6" md="5">
                                    <v-textarea
                                      outlined
                                      clearable
                                      v-model="editedItem.description"
                                      label="Descripcion del seguro"
                                    ></v-textarea>
                                  </v-col>
                                  <v-spacer></v-spacer>
                                  <v-col cols="12" sm="6" md="5">
                                    <v-textarea
                                      outlined
                                      clearable
                                      v-model="editedItem.descriptionEn"
                                      label="Descripcion del seguro ingles"
                                    ></v-textarea>
                                  </v-col>
                                </v-row>

                                <v-row no-gutters justify="center">
                                  <v-col cols="12" sm="6" md="5">
                                    <v-text-field
                                      prefix="$"
                                      outlined
                                      clearable
                                      v-model="editedItem.price"
                                      label="Precio de la suscripcion"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>

                                <v-row no-gutters justify="center">
                                  <v-col cols="12" sm="6" md="5">
                                    <v-text-field
                                      prefix="%"
                                      outlined
                                      :maxlength="2"
                                      clearable
                                      v-model="discountAditional"
                                      label="Descuento por conductor adicional (%)"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>

                                <v-row no-gutters justify="center" class="mb-8">
                                  <v-col cols="12" sm="6" md="5">
                                    <v-text-field
                                      prefix="%"
                                      outlined
                                      :maxlength="2"
                                      clearable
                                      v-model="discountDay"
                                      label="Descuento por dias (%)"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-col> </v-row
                          ></v-card>
                          <v-row no-gutters justify="center">
                            <v-btn text> Cancelar </v-btn>
                            <v-btn color="primary" @click="checkE1()">
                              Siguiente
                            </v-btn>
                          </v-row>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                          <v-card
                            class="mb-12"
                            color="white lighten-1"
                            height="500px"
                            elevation="0"
                          >
                            <v-row justify="center">
                              <v-col cols="12">
                                <v-row class="mt-2" no-gutters justify="center">
                                  <v-col
                                    v-for="(item, i) of airportSelected"
                                    :key="i"
                                    cols="12"
                                    sm="6"
                                    md="7"
                                  >
                                    <v-text-field
                                      v-model="item.percent"
                                      prefix="%"
                                      :maxlength="2"
                                      outlined
                                      clearable
                                      :label="item.name"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-card>
                          <v-row w no-gutters justify="center">
                            <v-btn text @click="e1 = 1"> Volver </v-btn>
                            <v-btn color="primary" @click="e1 = 3">
                              Siguiente
                            </v-btn>
                          </v-row>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                          <v-card
                            class="mb-12"
                            color="white lighten-1"
                            height="500px"
                            elevation="0"
                          >
                            <v-row class="mt-2" justify="center">
                              <v-col cols="12">
                                <v-row no-gutters justify="center">
                                  <v-col
                                    v-for="(item, i) of provinciasSelected"
                                    :key="i"
                                    cols="12"
                                    sm="6"
                                    md="7"
                                  >
                                    <v-text-field
                                      v-model="item.percent"
                                      prefix="%"
                                      outlined
                                      clearable
                                      :maxlength="2"
                                      :label="item.name"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-card>

                          <v-row w no-gutters justify="center">
                            <v-btn text @click="e1 = 2"> Volver </v-btn>
                            <v-btn color="primary" @click="e1 = 4">
                              Siguiente
                            </v-btn>
                          </v-row>
                        </v-stepper-content>

                        <v-stepper-content step="4">
                          <v-card
                            class="mb-12"
                            color="white lighten-1"
                            height="500px"
                            elevation="0"
                          >
                            <v-row justify="center">
                              <v-col cols="12">
                                <v-row class="mt-2" no-gutters justify="center">
                                  <v-col
                                    v-for="(item, i) of acesoriosSelected"
                                    :key="i"
                                    cols="12"
                                    sm="6"
                                    md="7"
                                  >
                                    <v-text-field
                                      v-model="item.percent"
                                      prefix="%"
                                      outlined
                                      :maxlength="2"
                                      clearable
                                      :label="item.name"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-card>

                          <v-row w no-gutters justify="center">
                            <v-btn text @click="e1 = 3"> Volver </v-btn>
                            <v-btn color="primary" @click="e1 = 5">
                              Siguiente
                            </v-btn>
                          </v-row>
                        </v-stepper-content>

                        <v-stepper-content step="5">
                          <v-card
                            class="mb-12"
                            color="white lighten-1"
                            height="500px"
                            elevation="0"
                          >
                            <v-row justify="center">
                              <v-col cols="12">
                                <v-row class="mt-2" no-gutters justify="center">
                                  <v-col
                                    v-for="(
                                      item, i
                                    ) of additionalCoveragesSelected"
                                    :key="i"
                                    cols="12"
                                    sm="6"
                                    md="7"
                                  >
                                    <v-text-field
                                      v-model="item.percent"
                                      :key="i"
                                      type="number"
                                      prefix="%"
                                      outlined
                                      clearable
                                      min="0"
                                      max="100"
                                      :maxlength="2"
                                      :label="item.name"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-card>

                          <v-row w no-gutters justify="center">
                            <v-btn text @click="e1 = 4"> Volver </v-btn>
                            <v-btn color="primary" @click="save()">
                              Guardar
                            </v-btn>
                          </v-row>
                        </v-stepper-content>
                      </v-stepper-items>
                    </v-stepper>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.active`]="{ item }">
          <v-chip :color="item.active == true ? `blue` : `orange`">
            <span v-if="item.active == true">Activo</span>
            <span v-else>Inactivo</span></v-chip
          >
        </template>
        <template v-slot:[`item.dayDiscountPercent`]="{ item }">
          <span>{{ parseFloat(item.dayDiscountPercent) * 100 }} %</span>
        </template>
        <template v-slot:[`item.price`]="{ item }">
          <span>{{ item.price }} {{ item.currency.code }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon size="30px" class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon
            @click="activeOrDesactive(item, true)"
            v-if="item.active == false"
            color="green"
            class="mx-1"
            size="30px"
          >
            thumb_up
          </v-icon>

          <v-icon
            @click="activeOrDesactive(item, false)"
            v-if="item.active == true"
            size="30px"
            color="red"
            class="mx-1"
            >thumb_down
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-flex>
</template>

<script>
import MapModalVue from "@/components/MapModal.vue";
import { CREATE_SUPSCRIPTION, DELETE_SUPSCRIPTION } from "../../gql/mutation";
export default {
  data() {
    return {
      e1: 1,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: [],
      additionalCoveragesSelected: [],
      acesoriosSelected: [],
      provinciasSelected: [],
      airportSelected: [],
      selectCurrencie: "",
      discountAditional: 0,
      discountDay: 0,
      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
          text: "Nombre",
        },
        { text: "Descuento", value: "dayDiscountPercent" },
        { text: "Status", value: "active" },
        { text: "Amount", value: "price", width: "15%" },
        { text: "Actions", value: "actions", width: "15%" },
      ],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nueva suscripcion"
        : "Editar suscripcion";
    },
  },
  components: { MapModalVue },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  props: {
    suscriptions: {
      type: Array,
    },
    additionalCoverages: {
      type: Array,
    },
    airports: {
      type: Array,
    },
    provincies: {
      type: Array,
    },
    acesorios: {
      type: Array,
    },
  },
  created() {
    //  this.getItems();
  },
  methods: {
    checkE1() {
      this.e1 = 2;
    },
    clear() {
      this.discountAditional = 0;
      this.discountDay = 0;
      this.additionalCoveragesSelected = [];
      this.acesoriosSelected = [];
      this.provinciasSelected = [];
      this.airportSelected = [];
      for (var item of this.additionalCoverages) {
        {
          this.additionalCoveragesSelected.push({
            rowId: item.node.rowId,
            name: item.node.name,
            nameUs: item.node.nameUs,
            price: item.node.price,
            percent: 0,
          });
        }
      }

      for (var item of this.acesorios) {
        {
          this.acesoriosSelected.push({
            rowId: item.rowId,
            name: item.name,
            nameUs: item.nameUs,
            price: item.price,
            percent: 0,
          });
        }
      }

      for (var item of this.airports) {
        {
          this.airportSelected.push({
            rowId: item.rowId,
            name: item.name,
            nameUs: item.nameUs,
            price: item.price,
            percent: 0,
          });
        }
      }

      for (var item of this.provincies) {
        {
          this.provinciasSelected.push({
            rowId: item.province.rowId,
            name: item.province.name,
            nameUs: item.nameUs,
            price: item.price,
            percent: 0,
          });
        }
      }
    },
    getAcesorios(item) {
      var percent = 0;
      if (this.editedItem.subscriptionWithRentalItems == undefined) {
        return 0;
      }

      for (var nodos of this.editedItem.subscriptionWithRentalItems.nodes) {
        if (item.rowId == nodos.rentalItem.rowId) {
          percent = nodos.percent;
        }
      }

      return percent;
    },
    getSeguroAdicional(item) {
      var percent = 0;
      if (this.editedItem.subscriptionWithAdditionalCoverages == undefined) {
        return 0;
      }

      for (var nodos of this.editedItem.subscriptionWithAdditionalCoverages
        .nodes) {
        if (item.node.rowId == nodos.additionalCoverange.rowId) {
          percent = nodos.percent;
        }
      }

      return percent;
    },
    getPercentProvincies(item) {
      var percent = 0;
      if (this.editedItem.subscriptionWithProvinces == undefined) {
        return 0;
      }

      for (var nodos of this.editedItem.subscriptionWithProvinces.nodes) {
        if (item.province.rowId == nodos.province.rowId) {
          percent = nodos.percent;
        }
      }

      return percent;
    },
    getPercent(item) {
      var percent = null;
      if (this.editedItem.subscriptionWithAirports == undefined) {
        return null;
      }

      for (var nodos of this.editedItem.subscriptionWithAirports.nodes) {
        if (item.rowId == nodos.airport.rowId) {
          percent = nodos.percent;
        }
      }

      return percent;
    },
    editItem(item) {
      this.e1 = 1;
      this.editedIndex = this.suscriptions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.additionalCoveragesSelected = [];
      this.acesoriosSelected = [];
      this.provinciasSelected = [];
      this.airportSelected = [];

      this.discountAditional =
        this.editedItem.additionalDriverDiscountPercent * 100;
      this.discountDay = this.editedItem.dayDiscountPercent * 100;
      const xAdditionalCoverages =
        this.editedItem.subscriptionWithAdditionalCoverages.nodes;
      const xAcesorios = this.editedItem.subscriptionWithRentalItems.nodes;
      const xProvincias = this.editedItem.subscriptionWithProvinces.nodes;

      const xAeropuerto = this.editedItem.subscriptionWithAirports.nodes;

      //       provinciasSelected:[],
      // airportSelected:[],
      for (var item of this.additionalCoverages) {
        {
          const resultado = xAdditionalCoverages.find(
            (element) => element.additionalCoverange.rowId === item.node.rowId
          );

          this.additionalCoveragesSelected.push({
            rowId: item.node.rowId,
            name: item.node.name,
            nameUs: item.node.nameUs,
            price: item.node.price,
            percent:
              resultado == undefined ? 0 : (resultado.percent * 100).toFixed(2),
          });
        }
      }

      for (var item of this.acesorios) {
        {
          const resultado = xAcesorios.find(
            (element) => element.rentalItem.rowId === item.rowId
          );
          this.acesoriosSelected.push({
            rowId: item.rowId,
            name: item.name,
            nameUs: item.nameUs,
            price: item.price,
            percent:
              resultado == undefined ? 0 : (resultado.percent * 100).toFixed(2),
          });
        }
      }

      for (var item of this.airports) {
        {
          const resultado = xAeropuerto.find(
            (element) => element.airport.rowId === item.rowId
          );

          this.airportSelected.push({
            rowId: item.rowId,
            name: item.name,
            nameUs: item.nameUs,
            price: item.price,
            percent:
              resultado == undefined ? 0 : (resultado.percent * 100).toFixed(2),
          });
        }
      }

      for (var item of this.provincies) {
        {
          const resultado = xProvincias.find(
            (element) => element.province.rowId === item.province.rowId
          );

          this.provinciasSelected.push({
            rowId: item.province.rowId,
            name: item.province.name,
            nameUs: item.nameUs,
            price: item.price,
            percent:
              resultado == undefined ? 0 : (resultado.percent * 100).toFixed(2),
          });
        }
      }

      this.selectCurrencie = this.editedItem.currency.rowId;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.suscriptions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async activeOrDesactive(item, status) {
      try {
        this.data = await this.$apollo.mutate({
          mutation: DELETE_SUPSCRIPTION,
          variables: {
            subscriptionId: item.rowId,
            isActive: status,
          },
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      }
      this.$emit("refresh-data");
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      var newAditionalCoveragesSelected = [];
      var newAcesoriosSelected = [];
      var newProvinciasSelected = [];
      var newAirportSelected = [];
      for (var item of this.additionalCoveragesSelected) {
        var percent = 0;
        if (item.percent > 0) {
          percent = item.percent / 100;
        }
        newAditionalCoveragesSelected.push({
          additional_coverange_id: item.rowId,
          percent: percent,
        });
      }
      for (var item of this.acesoriosSelected) {
        var percent = 0;
        if (item.percent > 0) {
          percent = item.percent / 100;
        }
        newAcesoriosSelected.push({
          rental_item_id: item.rowId,
          percent: percent,
        });
      }
      for (var item of this.provinciasSelected) {
        var percent = 0;
        if (item.percent > 0) {
          percent = item.percent / 100;
        }
        newProvinciasSelected.push({
          province_id: item.rowId,
          percent: percent,
        });
      }
      for (var item of this.airportSelected) {
        var percent = 0;
        if (item.percent > 0) {
          percent = item.percent / 100;
        }
        newAirportSelected.push({
          airport_id: item.rowId,
          percent: percent,
        });
      }

      if (this.editedIndex > -1) {
        try {
          this.data = await this.$apollo.mutate({
            mutation: CREATE_SUPSCRIPTION,
            variables: {
              subscriptionId: this.editedItem.rowId,
              companyId: this.$companie_id,
              currencyId: this.selectCurrencie,
              userId: this.$store.state.Auth.user.rowId,
              name: this.editedItem.name,
              nameEn: this.editedItem.nameEn,
              description: this.editedItem.description,
              descriptionEn: this.editedItem.descriptionEn,
              price: this.editedItem.price,
              additionalDriverDiscountPercent: this.discountAditional / 100,
              dayDiscountPercent: this.discountDay / 100,
              subscriptionWithAdditionalCoverages:
                newAditionalCoveragesSelected,
              subscriptionWithAirports: newAirportSelected,
              subscriptionWithProvinces: newProvinciasSelected,
              subscriptionWithRentalItems: newAcesoriosSelected,
            },
          });
        } catch (err) {
          this.$toast.error("A ocurrido un error " + err);
        }
      } else {
        try {
          this.data = await this.$apollo.mutate({
            mutation: CREATE_SUPSCRIPTION,
            variables: {
              subscriptionId: null,
              companyId: this.$companie_id,
              currencyId: this.selectCurrencie,
              userId: this.$store.state.Auth.user.rowId,
              name: this.editedItem.name,
              nameEn: this.editedItem.nameEn,
              description: this.editedItem.description,
              descriptionEn: this.editedItem.descriptionEn,
              price: this.editedItem.price,
              additionalDriverDiscountPercent: this.discountAditional / 100,
              dayDiscountPercent: this.discountDay / 100,
              subscriptionWithAdditionalCoverages:
                newAditionalCoveragesSelected,
              subscriptionWithAirports: newAirportSelected,
              subscriptionWithProvinces: newProvinciasSelected,
              subscriptionWithRentalItems: newAcesoriosSelected,
            },
          });
        } catch (err) {
          this.$toast.error("A ocurrido un error " + err);
        }
      }
      this.close();
      this.$emit("refresh-data");
    },
  },
};
</script>
