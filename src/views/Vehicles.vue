<template>
  <v-flex>
    <v-row justify="center">
      <v-col cols="12">
        <v-tabs
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
            <!-- <v-icon>mdi-car</v-icon> -->
          </v-tab>

          <!-- <v-tab>
            Filtros
            <v-icon>mdi-filter</v-icon>
          </v-tab> -->
          <v-spacer></v-spacer>
          <!-- <v-btn large class="ma-2" outlined>
            Crear

            <v-icon>mdi-car</v-icon>
          </v-btn> -->
        </v-tabs>
        <v-tabs> </v-tabs>
      </v-col>
    </v-row>
    <v-container fluid>
      <template v-if="loadData">
        <v-row justify="center" class="px-10">
          <ItemCard
            class="px-6"
            v-for="item in vehicles"
            :key="item.id"
            :item="item"
          />
        </v-row>
      </template>
      <v-row class="mt-15" justify="center" v-else>
        <v-progress-circular
          :size="170"
          :width="7"
          color="black"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </v-container>
  </v-flex>
</template>
<script>
import ItemCard from "@/components/ItemCard";
import {
  GET_VEHICLES,
  GET_VEHICLES_BY_BRANCH_AND_MODEL,
  GET_VEHICLES_BY_BRANCH,
  GET_VEHICLES_FIRST,
} from "../gql/queries";

export default {
  name: "my-vehicles",
  components: {
    ItemCard,
  },
  data() {
    return {
      loadData: false,
      selectedtab: "",
      active_tab: 0,
      vehicles: [],
      filters: [],
      vehicleBrand: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loadData = false;
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
      if (JSON.parse(localStorage.getItem("FILTERS_VEHICLES")) != null) {
        this.filters = [JSON.parse(localStorage.getItem("FILTERS_VEHICLES"))];
      }

      if (this.filters.length > 0) {
        this.vehicles = [];
        if (this.filters.Models == "") {
          this.data_vehicle_brans_and_model = await this.$apollo.query({
            query: GET_VEHICLES_BY_BRANCH_AND_MODEL,
            variables: {
              branchIds: this.$branch_id,
              vehicleBrandId: this.filters.Brandes,
              vehicleModelId: this.filters.Models,
              yearGreaterThan: this.filters.InitYears,
              yearLessThan: this.filters.YearEnd,
            },
          });
          this.vehicles = this.data_vehicle_brans_and_model.data.vehicles.nodes;
        } else {
          this.data_vehicle_brands = await this.$apollo.query({
            query: GET_VEHICLES_BY_BRANCH,
            variables: {
              branchIds: this.$branch_id,
              vehicleBrandId: this.filters[0].Brandes,
              yearGreaterThan: this.filters[0].InitYears,
              yearLessThan: this.filters[0].YearEnd,
            },
          });

          this.vehicles = this.data_vehicle_brands.data.vehicles.nodes;
        }
      } else {
        await this.loadAllVehicles();
      }

      this.filters = [];
      localStorage.removeItem("FILTERS_VEHICLES");
      this.loadData = true;
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
      this.active_tab = this.vehicleBrand.length - 1;
      this.vehicles = [];
      var data = await this.$apollo.query({
        query: GET_VEHICLES_FIRST,
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
    },
  },
};
</script>
