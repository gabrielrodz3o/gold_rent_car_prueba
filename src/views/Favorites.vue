<template>
  <v-container style="background-color: #fafafa" fluid>
    <v-flex xs12 sm12 offset-sm3 pt-2>
      <form>
        <v-layout column>
          <v-container>
            <v-row>
              <span class="my-application3 px-4" style="font-size: 30px"
                >Vehiculos Favoritos</span
              >
            </v-row>
            <v-row>
              <v-list class="wrapper mt-4" style="offset-position: left">
                <template>
                  <template v-for="(item, i) in vehicleFavorites">
                    <v-list-item
                      :to="`/vehicles/${item.vehicle.rowId}`"
                      @click="watchVehicle(item)"
                      lines="two"
                      :key="i"
                    >
                      <v-row no-gutters>
                        <v-col cols="12" md="5">
                          <v-img
                            contain
                            width="300px"
                            height="300px"
                            :src="item.vehicle.vehicleImages.nodes[0].imageUrl"
                          >
                          </v-img>
                        </v-col>
                        <v-col cols="12" md="7">
                          <v-row class="mt-15" justify="center">
                            <b style="font-size: 24px">
                              {{ item.vehicle.vehicleBrand.name }}
                              {{ item.vehicle.vehicleModel.name }}
                              {{ item.vehicle.year }}</b
                            >
                          </v-row>
                          <v-row class="mt-15" justify="center">
                            <b style="font-size: 24px">
                              {{ item.vehicle.basePrice }}
                              {{ item.vehicle.currency.code }}</b
                            >
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </template>
                  <v-list-item
                    class="pb-14"
                    v-if="vehicleFavorites.length == 0"
                  >
                    <v-row justify="center" align="center">
                      <span>No tienes favoritos</span>
                    </v-row>
                  </v-list-item>
                </template>
              </v-list>
            </v-row>
          </v-container>
        </v-layout>
      </form>
    </v-flex>
  </v-container>
</template>
<script>
import { GET_USER_VEHICLE_FAVORITES } from "../gql/queries";

import moment from "moment";
export default {
  name: "my-perfil",
  data() {
    return {
      vehicleFavorites: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      var favorites = await this.$apollo.query({
        query: GET_USER_VEHICLE_FAVORITES,
        variables: { userId: this.$store.state.Auth.user.rowId },
      });
      console.log(this.$store.state.Auth.user.rowId);
      this.vehicleFavorites = favorites.data.userVehicleFavorites.nodes;
    },
  },
  computed: {},
};
</script>
