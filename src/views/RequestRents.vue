<template>
  <v-row v-if="isLoaded" no-gutters>
    <Rents :items="RequestRentals" @refresh-rent="reload()" types="2" />
  </v-row>
  <v-row class="mt-15" justify="center" v-else>
    <v-progress-circular
      :size="170"
      :width="7"
      color="black"
      indeterminate
    ></v-progress-circular>
  </v-row>
</template>

<script>
import Rents from "../components/Rents";
import { GET_REQUEST_RENTS } from "../gql/queries";
export default {
  data() {
    return {
      isLoaded: false,

      RequestRentals: [],
    };
  },
  components: { Rents },
  created() {
    this.getData();
  },
  computed: {
    profile() {
      return this.$store.state.Auth;
    },
  },
  methods: {
    reload() {
      this.getData();
      // location.reload();
    },
    async getData() {
      this.isLoaded = false;
      this.RequestRentals = [];
      var data = await this.$apollo.query({
        query: GET_REQUEST_RENTS,
        variables: { companyId: this.$companie_id },
        fetchPolicy: "no-cache",
      });

      this.RequestRentals = data.data.rentals.nodes;

      this.isLoaded = true;
    },
  },
};
</script>

<style></style>
