<template>
  <v-flex>
    <v-row justify="center">
      <v-col cols="12">
        <v-tabs
          v-if="loadingTab"
          v-model="active_tab"
          @change="loadVehiclesByBrand"
          background-color="transparent"
          centered
          icons-and-text
          color="black"
        >
          <v-tabs-slider color=""></v-tabs-slider>

          <v-spacer></v-spacer>
          <v-tab
            @click="selectedtab = item.rowId"
            v-for="item of vehicleBrand"
            :key="item.rowID"
          >
            {{ item.name }}
            <v-img contain max-width="40px" max-height="40px" :src="item.icons">
            </v-img>
          </v-tab>

          <v-spacer></v-spacer>
        </v-tabs>
        <v-tabs> </v-tabs>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row v-if="loadData" justify="center" class="px-10">
        <ItemCard
          class="px-6"
          v-for="item in vehicles"
          :key="item.id"
          :item="item"
          :maintenance="true"
          @show-edit="showEdit($event)"
        />
      </v-row>
      <v-row class="mt-15" justify="center" v-else>
        <v-progress-circular
          :size="170"
          :width="7"
          color="black"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </v-container>
    <v-dialog fullscreen v-model="dialog" transition="dialog-bottom-transition">
      <v-card color="">
        <v-toolbar elevation="0" color="white">
          <v-btn icon @click.native="dialog = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-center">Editar Vehiculo</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <PostVehiclesVue v-if="loadData" :item="editeItem" />
      </v-card>

      <!-- <Reserva :airport="airport" :airlines="airlines" /> -->
    </v-dialog>
  </v-flex>
</template>
<script>
import ItemCard from "@/components/ItemCard";
import PostVehiclesVue from "@/components/PostVehicles.vue";
import { wrapYieldingFiberMethods } from "@wry/context";
import {
  GET_VEHICLES,
  GET_VEHICLES_BY_BRANCH_AND_MODEL,
  GET_VEHICLES_BY_BRANCH,
} from "../gql/queries";

export default {
  name: "my-vehicles",
  components: {
    ItemCard,
    PostVehiclesVue,
  },
  data() {
    return {
      loadData: false,
      dialog: false,
      editeItem: "",
      selectedtab: "",
      active_tab: 0,
      loadingTab: false,
      vehicles: [],
      filters: [],
      vehicleBrand: [],
    };
  },
  created() {
    this.getCategories();
    this.getData();
  },
  methods: {
    showEdit(item) {
      this.editeItem = [];
      this.loadData = false;

      this.editeItem = item;

      this.dialog = true;
      this.loadData = true;
    },
    async getData() {
      await this.loadAllVehicles();
    },
    getCategories() {
      this.loadingTab = false;
      for (var item of JSON.parse(localStorage.getItem("VEHICLE_BRANDS"))) {
        this.vehicleBrand.push({
          rowId: item.value,
          name: item.text,
          icons: item.logoUrl,
        });
      }
      this.vehicleBrand.push({
        rowId: "todos",
        name: "todos",
        icons: require("@/assets/two-cars-in-line.png"),
      });
      this.active_tab = this.vehicleBrand.length - 1;

      this.loadingTab = true;
    },
    async loadVehiclesByBrand() {
      this.loadData = false;
      this.vehicles = [];
      if (this.selectedtab == "todos") {
        this.loadAllVehicles();
      } else {
        var data_vehicle_brands = await this.$apollo.query({
          query: GET_VEHICLES_BY_BRANCH,
          variables: {
            branchIds: this.$branch_id,
            vehicleBrandId: this.selectedtab,
            yearGreaterThan: 2001,
            yearLessThan: new Date().getFullYear(),
          },
        });

        this.vehicles = data_vehicle_brands.data.vehicles.nodes;
      }
      this.loadData = true;
    },
    async loadAllVehicles() {
      this.loadData = false;
      this.vehicles = [];
      var data = await this.$apollo.query({
        query: GET_VEHICLES,
        variables: { companyId: this.$companie_id, branchIds: this.$branch_id },
        fetchPolicy: "no-cache",
      });

      var datos = data.data.vehicles.nodes;

      for (var a = 0; a < datos.length; a++) {
        this.vehicles.push(datos[a]);

        // for (var items of datos[a].vehicles.nodes) {
        //   this.vehicles.push({
        //     rowId: items.rowId,
        //     isDeluxe: items.isDeluxe,
        //     basePrice: items.basePrice,

        //     tractionControlType: items.tractionControlType,
        //     vehicleAmenities: items.vehicleAmenities,
        //     vehicleColor: items.vehicleColor,
        //     vehicleNotAvailableDates: items.vehicleNotAvailableDates,
        //     vehicleSeating: items.vehicleSeating,
        //     branch: items.branch,
        //     currency: items.currency,
        //     vehicleImages: items.vehicleImages,
        //     vehicleBrand: items.vehicleBrand,
        //     vehicleModel: items.vehicleModel,
        //     year: items.year,
        //   });
        // }
      }
      this.loadData = true;
    },
  },
};
</script>
