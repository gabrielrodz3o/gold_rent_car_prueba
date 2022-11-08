<template>
  <v-flex>
    <v-card
      v-if="type == 1"
      outlined
      class="pt-4 hidden-sm-and-down rounded-xl"
      elevation="0"
      color="transparent"
    >
      <v-col cols="12">
        <!-- <v-row justify="center" class="">
        <v-col>
          <h2 class="text-center">Encuentra un vehículo</h2>
        </v-col>
      </v-row> -->
        <v-row justify="center">
          <span
            class="my-application typer"
            style="color: white; font-size: 55px"
          >
            Find Your Car!
          </span>
        </v-row>
        <v-row class="">
          <v-col cols="12" md="3">
            <v-autocomplete
              v-model="filtersvehicleBrandes"
              filled
              :items="vehicleBrandes"
              background-color="grey lighten-5"
              @change="
                vehicleModels2 = updateCombo(
                  vehicleModels,
                  vehicleModels2,
                  filtersvehicleBrandes
                )
              "
              label="Marca"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              v-model="filtersvehicleModels"
              :items="vehicleModels2"
              dense
              filled
              background-color="grey lighten-5"
              label="Modelo"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              :items="years"
              v-model="yearInit"
              dense
              filled
              background-color="grey lighten-5"
              label="Desde "
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              :items="years"
              v-model="yearEnd"
              dense
              filled
              background-color="grey lighten-5"
              label="Hasta"
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-col cols="12" md="8" class="mt-n13">
          <v-alert v-model="alert" color="orange" outlined type="warning"
            >Por favor, Elige una marca!</v-alert
          >
        </v-col>

        <v-row justify="center" class="pb-6">
          <v-col cols="12" md="10">
            <v-btn @click="seeVehicles" block> BUSCAR </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
    <v-card
      width="1000px"
      v-if="type == 2"
      class="hidden-sm-and-down rounded-xl"
      elevation="12"
      color="white"
    >
      <v-col cols="12">
        <v-row justify="center" class="">
          <v-col>
            <h2 class="text-center">{{ $t("findCar") }}</h2>
          </v-col>
        </v-row>

        <v-row justify="center" class="">
          <v-col cols="12" md="5">
            <v-autocomplete
              outlined
              v-model="filtersvehicleBrandes"
              prepend-inner-icon="directions_car"
              filled
              :items="vehicleBrandes"
              background-color="grey lighten-5"
              @change="
                vehicleModels2 = updateCombo(
                  vehicleModels,
                  vehicleModels2,
                  filtersvehicleBrandes
                )
              "
              :label="$t(`marca`)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="5">
            <v-autocomplete
              outlined
              v-model="filtersvehicleModels"
              :items="vehicleModels2"
              prepend-inner-icon="car_rental"
              filled
              background-color="grey lighten-5"
              :label="$t(`modelo`)"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-n4">
          <v-col cols="12" md="5">
            <v-autocomplete
              outlined
              :items="years"
              v-model="yearInit"
              prepend-inner-icon="calendar_month"
              filled
              background-color="grey lighten-5"
              label="Desde "
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="5">
            <v-autocomplete
              outlined
              :items="years"
              v-model="yearEnd"
              prepend-inner-icon="calendar_month"
              filled
              background-color="grey lighten-5"
              label="Hasta"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-col cols="12" md="8">
          <v-alert v-model="alert" color="orange" outlined type="warning"
            >Por favor, Elige una marca!</v-alert
          >
        </v-col>

        <v-row justify="center" class="pb-6">
          <v-col cols="12" md="10">
            <v-btn color="primary" @click="seeVehicles" block> BUSCAR </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-flex>
</template>

<script>
import { number } from "@intlify/core-base";

export default {
  name: "Search-Cars",

  props: {
    vehicleBrandes: {
      type: Array,
    },
    type: {
      type: Number,
    },
    vehicleModels: {
      type: Array,
    },
  },
  data() {
    return {
      alert: false,
      filtersvehicleBrandes: "",
      filtersvehicleModels: "",
      yearInit: 2001,
      yearEnd: new Date().getFullYear(),
      vehicleBrands: [],
      vehicleModels2: [],
    };
  },
  created() {
    this.getData();
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 2000 },
        (value, index) => 2001 + index
      );
    },
  },
  methods: {
    updateCombo(itemsOrigen, itemsDestino, condicion) {
      itemsDestino.splice(0, itemsDestino.length);

      for (var item of itemsOrigen) {
        if (item.condicion === condicion) {
          itemsDestino.push({ value: item.value, text: item.text });
        }
      }

      return itemsDestino;
    },
    async seeVehicles() {
      if (this.filtersvehicleBrandes == "") {
        this.alert = true;
        return;
      } else {
        this.alert = false;
      }
      var filerVehicles = {
        Brandes: this.filtersvehicleBrandes,
        Models: this.filtersvehicleModels,
        InitYears: this.yearInit,
        YearEnd: this.yearEnd,
      };

      window.localStorage.setItem(
        "FILTERS_VEHICLES",
        JSON.stringify(filerVehicles)
      );

      this.$router.push("/vehicles");
    },
    getData() {
      // for (var item of this.vehicleBrandes) {
      //   this.vehicleBrands.push({
      //     text: item.name,
      //     value: item.rowId,
      //   });
      // }
    },
  },
};
</script>
