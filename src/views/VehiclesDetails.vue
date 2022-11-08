<template>
  <v-container fluid>
    <v-flex xs12 sm10 offset-sm1 pt-4>
      <v-container v-if="loading">
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-row justify="center">
              <v-card-title
                style="color: black; font-size: 2.3em"
                class="my-application3 text-center mt-n4"
              >
                {{ vehicle_details.vehicleBrand.name }}
                {{ vehicle_details.vehicleModel.name }}
                {{ vehicle_details.year }}
              </v-card-title>
            </v-row>
            <v-row no-gutters justify="center">
              <span
                style="color: black; font-size: 1.6em"
                class="my-application text-center"
              >
                {{ vehicle_details.basePrice }} USD
              </span>
            </v-row>

            <v-row no-gutters justify="center" class="d-flex align-center">
              <v-btn @click="showReserva()">
                <v-icon>near_me</v-icon> {{ $t("reserva.name") }}
              </v-btn>

              <v-btn :href="url2" target="_blank">
                <v-icon>whatsapp</v-icon> Whatsapp
              </v-btn>
              <v-btn @click="emailTo()"> <v-icon>mail</v-icon>Email </v-btn>
            </v-row>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-row>
              <!-- LADO IZQUIERDO -->
              <v-col cols="12" md="6">
                <v-row justify="center" align="center" class="px-4 pt-2">
                  <v-col cols="12" md="12" sm="6">
                    <v-carousel
                      :style="
                        vehicle_details.isDeluxe
                          ? 'color:red ;border: 8px solid  rgb(212, 175, 55)  ; 	border-radius: 0.15rem; '
                          : 'color:black'
                      "
                      height="auto"
                      cycle
                      hide-delimiter-background
                      class="rounded-xl"
                    >
                      <v-carousel-item
                        v-for="item in vehicle_details.vehicleImages.nodes"
                        :aspect-ratio="1 / 1"
                        :src="item.imageUrl"
                        :key="item.id"
                      >
                        <template v-slot:placeholder>
                          <v-sheet>
                            <v-skeleton-loader
                              class="mx-auto"
                              width="100%"
                              height="100%"
                              type="image,image,image"
                            ></v-skeleton-loader>
                          </v-sheet>
                        </template>
                        <v-row>
                          <v-col cols="12" md="6">
                            <div
                              v-if="vehicle_details.isDeluxe"
                              style=""
                              class="pa-4 text-right"
                            >
                              <v-col cols="12" md="12">
                                <v-row justify="start">
                                  <div
                                    class="pa-3 text-center rounded-xl"
                                    style="background-color: #d4af37"
                                  >
                                    <span
                                      style="
                                        font-size: 18px;
                                        border-radius: 0.6rem;
                                      "
                                      class="font-weight-bold text-center"
                                    >
                                      DELUXE</span
                                    >
                                  </div>
                                </v-row>
                              </v-col>
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-row justify="end">
                              <v-btn class="mt-8 mr-8" @click="favorite()" icon>
                                <v-icon
                                  outlined
                                  size="40px"
                                  :color="isFavorite ? `red` : `white`"
                                >
                                  favorite
                                </v-icon>
                              </v-btn>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-carousel-item>
                    </v-carousel>
                  </v-col>
                </v-row>
              </v-col>
              <!-- LADO DERECHO -->
              <v-col cols="12" md="6">
                <v-row justify="start">
                  <span
                    style="color: black; font-size: 1.6em"
                    class="font-weight-bold px-2 pt-4"
                  >
                    {{ $t("reserva.informaciones") }}
                  </span>
                </v-row>
                <v-row>
                  <v-col
                    v-for="(details, i) in datailVehicles"
                    :key="i"
                    cols="12"
                    md="6"
                  >
                    <v-row justify="start">
                      <v-col cols="12" md="6">
                        <v-row no-gutters>
                          <v-img
                            contain
                            class="pt-4"
                            max-width="30px"
                            max-height="30px"
                            :src="
                              require(`@/assets/iconsdetailscars/${details.url}`)
                            "
                            :lazy-src="
                              require(`@/assets/iconsdetailscars/${details.url}`)
                            "
                          >
                            <template v-slot:placeholder>
                              <v-sheet>
                                <v-skeleton-loader
                                  class="mx-auto"
                                  width="auto"
                                  height="auto"
                                  type="image,image"
                                ></v-skeleton-loader>
                              </v-sheet>
                            </template>
                          </v-img>
                          <span
                            style="color: black; font-size: 0.9em"
                            class="font-weight-black pl-2"
                          >
                            {{ details.name }}:
                          </span>
                        </v-row>
                      </v-col>

                      <v-col cols="12" md="6" aling="start">
                        <span
                          style="color: black; font-size: 1em"
                          class="font-weight-black px-2"
                        >
                          {{ details.description }}
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row justify="start" class="pt-4">
                  <span
                    style="color: black; font-size: 1.6em"
                    class="font-weight-bold px-2"
                  >
                    {{ $t("reserva.accesorios") }}
                  </span>
                </v-row>
                <v-row>
                  <v-col
                    v-for="(details, indice) of vehicle_details.vehicleAmenities
                      .nodes"
                    :key="indice"
                    cols="12"
                    md="4"
                  >
                    <v-row>
                      <v-list-item-group>
                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="green"
                              >mdi-checkbox-marked-circle</v-icon
                            >
                            <v-list-item-title v-if="$i18n.locale == `es`">
                              {{ details.amenity.name }}
                            </v-list-item-title>
                            <v-list-item-title v-if="$i18n.locale == `en`">
                              {{ details.amenity.nameUs }}
                            </v-list-item-title>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-list-item-group>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row justify="end" class="pt-2 pb-4 px-6">
              <v-row justify="center" align="center">
                <img
                  class="image"
                  v-for="(image, i) in newImages"
                  :src="image"
                  :key="i"
                  @click="index = i"
                />

                <!-- <v-col
                  v-for="(item, i) in vehicle_details.vehicleImages.nodes"
                  :key="i"
                  cols="12"
                  md="3"
                  sm="3"
                  class="d-none d-sm-flex"
                >
                  <v-img
                    class="rounded-lg"
                    :aspect-ratio="1.0"
                    :src="item.imageUrl"
                  >
                  </v-img>
                </v-col> -->
              </v-row>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-row class="mt-15" justify="center" v-else>
        <v-progress-circular
          :size="170"
          :width="7"
          color="black"
          indeterminate
        ></v-progress-circular>
      </v-row>

      <v-dialog
        fullscreen
        v-model="dialog"
        transition="dialog-bottom-transition"
      >
        <v-card color="">
          <v-toolbar elevation="0" color="white">
            <v-btn icon @click.native="dialog = false">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title class="text-center"
              >Solicitar renta</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <Reserva
            v-if="vehicle_details != ''"
            :datos="{
              rowId: id_vehicle,
              image: vehicle_details.vehicleImages.nodes[0].imageUrl,
              name:
                vehicle_details.vehicleBrand.name +
                ' ' +
                vehicle_details.vehicleModel.name +
                ' ' +
                vehicle_details.year,
              price: vehicle_details.basePrice,
            }"
          />
        </v-card>

        <!-- <Reserva :airport="airport" :airlines="airlines" /> -->
      </v-dialog>
    </v-flex>
  </v-container>
</template>
<script>
//import draggable from "vuedraggable";
import {
  GET_AIRLINES,
  GET_AIRPORTS,
  GET_VEHICLES_BY_ID,
  GET_VEHICLES_FAVORITES,
} from "../gql/queries";
import { ADD_FAVORITE_VEHICLE, DELETE_FAVORITE_VEHICLE } from "../gql/mutation";
import Reserva from "@/components/Reserva";
const json = require("../data/vehciles.json");
export default {
  name: "VehiclesDetails",

  data() {
    return {
      index: null,

      loading: false,
      dialog: false,
      myFiles: [],
      modal: false,
      rating: 4.5,
      bpm: 0,
      url2: "",
      menu1: false,
      id_vehicle: 0,
      vehicle_details: [],
      new_vehciles: [],
      airlines: [],
      airport: [],
      newImages: [],
      isFavorite: false,
      datailVehicles: [],
      datos: [
        { name: "tipo", url: "tipo.png" },
        { name: "transmision", url: "transmision.png" },
        { name: "marca", url: "marca.png" },
        { name: "traccion", url: "traccion.png" },
        { name: "modelo", url: "modelo.png" },
        { name: "combustible", url: "combustible.png" },
        { name: "edicio", url: "edicion.png" },
        { name: "motor", url: "motor.png" },

        { name: "año ", url: "ano.png" },
        { name: "cilindros", url: "cilindros.png" },
        { name: "exterior-color", url: "exterior-color.png" },

        { name: "puertas", url: "puertas.png" },
        { name: "pasajeros", url: "pasajeros.png" },
      ],
      paginado: json,
      items: json,
    };
  },
  components: {
    Reserva,
  },
  computed: {
    url() {
      return localStorage.getItem("apilinkws");
    },
  },
  mounted() {},
  async created() {
    await this.getData();
  },
  computed: {
    Authentication() {
      return this.$store.state.Auth;
    },
  },
  methods: {
    emailTo() {
      window.open(
        "mailto:" +
          localStorage.getItem("email") +
          "?Renta Vehiculo=" +
          "cc" +
          "&subject=" +
          "" +
          "&body=" +
          "Estoy interesado en el vehiculo  " +
          encodeURIComponent(window.location.href)
      );
    },
    async favorite() {
      if (this.Authentication.authStatus == true) {
        if (this.isFavorite == false) {
          try {
            var data = await this.$apollo.mutate({
              mutation: ADD_FAVORITE_VEHICLE,
              variables: {
                userId: this.$store.state.Auth.user.rowId,
                vehicleId: this.id_vehicle,
              },
            });
          } catch (err) {
            this.$toast.error("A ocurrido un error " + err);
          } finally {
          }
        } else if (this.isFavorite == true) {
          try {
            var data = await this.$apollo.mutate({
              mutation: DELETE_FAVORITE_VEHICLE,
              variables: {
                userId: Jthis.$store.state.Auth.user.rowId,
                vehicleId: this.id_vehicle,
              },
            });
          } catch (err) {
            this.$toast.error("A ocurrido un error " + err);
          } finally {
            //   this.getData()
          }
        }
        this.isFavorite = !this.isFavorite;
      } else {
        this.Authentication.loginForm = true;
      }
    },
    async getData() {
      this.loading = false;
      this.id_vehicle = this.$route.params.id;
      this.url2 =
        localStorage.getItem("apilinkws") +
        encodeURIComponent(window.location.href);

      this.data = await this.$apollo.query({
        query: GET_VEHICLES_BY_ID,
        variables: {
          vehicle: this.id_vehicle,
        },
      });

      if (this.Authentication.authStatus == true) {
        var favorites = await this.$apollo.query({
          query: GET_VEHICLES_FAVORITES,
          variables: {
            userId: this.$store.state.Auth.user.rowId,
            vehicleId: this.id_vehicle,
          },
        });

        if (favorites.data.userVehicleFavorites.nodes.length != 0) {
          for (var item of favorites.data.userVehicleFavorites.nodes) {
            if (item.vehicle.rowId === this.id_vehicle) {
              this.isFavorite = true;
            }
          }
        } else {
          this.isFavorite = false;
        }
      }

      this.vehicle_details = this.data.data.vehicles.edges[0].node;
      for (var item of this.vehicle_details.vehicleImages.nodes) {
        this.newImages.push(item.imageUrl);
      }

      var types = "";
      for (var item of this.vehicle_details.vehicleWithTypes.nodes) {
        types = types + " " + item.vehicleType.name;
      }
      this.datailVehicles = [
        {
          name: this.$i18n.locale == "es" ? "tipo" : "type",
          description: types,
          url: "tipo.png",
        },
        {
          name: this.$i18n.locale == "es" ? "year" : "year",
          description: this.vehicle_details.year,
          url: "ano.png",
        },
        {
          name: this.$i18n.locale == "es" ? "marca" : "brand",
          description: this.vehicle_details.vehicleBrand.name,
          url: "marca.png",
        },
        {
          name: this.$i18n.locale == "es" ? "traccion" : "traction",
          description: this.vehicle_details.tractionControlType.name,
          url: "traccion.png",
        },
        {
          name: this.$i18n.locale == "es" ? "traccion" : "model",
          description: this.vehicle_details.vehicleModel.name,
          url: "modelo.png",
        },
        {
          name: this.$i18n.locale == "es" ? "combustible" : "fuel",
          description: this.vehicle_details.fuelType.name,
          url: "combustible.png",
        },

        {
          name: this.$i18n.locale == "es" ? "color" : "color",
          description: this.vehicle_details.vehicleColor.name,
          url: "exterior-color.png",
        },

        {
          name: this.$i18n.locale == "es" ? "asientos" : "seating",
          description: this.vehicle_details.personQuantity,
          url: "pasajeros.png",
        },
      ];

      this.dataAirport = await this.$apollo.query({
        query: GET_AIRPORTS,
      });

      for (var item of this.dataAirport.data.airports.edges) {
        this.airport.push({
          text: item.node.name,
          value: item.node.id,
        });
      }
      this.dataAirlines = await this.$apollo.query({
        query: GET_AIRLINES,
      });

      for (var items of this.dataAirlines.data.airlines.nodes) {
        this.airlines.push({
          text: items.name,
          value: items.rowId,
        });
      }
      this.loading = true;
    },
    showReserva() {
      if (this.Authentication.authStatus == true) {
        if (this.Authentication.user.licensePhotoUrl == null) {
          this.Authentication.formCompletProfile = true;
        } else {
          this.dialog = false;
          this.dialog = true;
        }
      } else {
        this.Authentication.loginForm = true;
      }
    },
  },
};
</script>
<style scoped>
.image {
  width: 250px;
  height: 250px;
  background-size: cover;
  cursor: pointer;
  margin: 5px;
  border-radius: 3px;
  border: 1px solid lightgray;
  object-fit: contain;
}
.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
</style>
