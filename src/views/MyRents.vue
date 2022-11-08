<template>
  <v-flex>
    <Rents
      v-if="loadData == true"
      @refresh-rent="getData()"
      :items="rentals"
      :types="1"
    />

    <v-row class="mt-15" justify="center" v-else>
      <v-progress-circular
        :size="170"
        :width="7"
        color="black"
        indeterminate
      ></v-progress-circular>
    </v-row>
  </v-flex>
</template>

<script>
import Rents from "../components/Rents";
import { GET_MY_RENTS } from "../gql/queries";
export default {
  data() {
    return {
      loadData: false,
      headers: [
        {
          align: "start",
          sortable: false,
          value: "image",
        },
        { text: "Vehiculo", value: "vehicleName" },
        { text: "Recogida", value: "recogida" },
        { text: "Devuelta", value: "devuelta" },
        { text: "Estatus", value: "status" },
        { text: "Precio", value: "amount" },
        { text: "Actions", value: "actions" },
      ],
      type: 1,
      showRentals: true,
      rentals: [],
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
    showReserve(item) {},
    async getData() {
      this.loadData = false;
      this.data = await this.$apollo.query({
        query: GET_MY_RENTS,
        variables: { userId: this.$store.state.Auth.user.rowId },
        fetchPolicy: "no-cache",
      });
      this.rentals = this.data.data.rentals.nodes;
      if (this.rentals.length == 0) {
      }
      this.loadData = true;
    },
  },
};
</script>

<style></style>
