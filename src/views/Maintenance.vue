<template>
  <v-container fluid>
    <router-view></router-view>
    <v-flex xs12 sm6 offset-sm3 pt-13>
      <form>
        <v-layout column>
          <v-container>
            <v-row>
              <span class="my-application3 px-4" style="font-size: 30px"
                >Manteminientos</span
              >
            </v-row>

            <v-row class="pt-4">
              <v-col
                v-for="(item, index) in items"
                :key="index"
                cols="12"
                md="4"
              >
                <v-card
                  @click="showDialog(item)"
                  elevation="1"
                  class="rounded-lg"
                  width="auto"
                  height="180px"
                >
                  <v-container>
                    <v-row no-gutters class="pb-4">
                      <v-icon size="40px">{{ item.icon }}</v-icon>
                    </v-row>

                    <div>
                      <span class="my-application3" style="font-size: 20px">
                        {{ item.name }}
                      </span>
                    </div>

                    <div class="pt-2">
                      <span class="my-application1" style="font-size: 16px">
                        {{ item.description }}
                      </span>
                    </div>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-layout>
      </form>
    </v-flex>
    <v-dialog
      fullscreen
      v-model="dialogSeguros"
      transition="dialog-bottom-transition"
    >
      <v-card color="">
        <v-toolbar elevation="0" color="white">
          <v-btn icon @click.native="dialogSeguros = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-center">Seguros</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>

        <Seguros
          v-if="loading"
          :insurances="insurances"
          @refresh-data="getItems()"
        />
      </v-card>

      <!-- <Reserva :airport="airport" :airlines="airlines" /> -->
    </v-dialog>
    <v-dialog
      fullscreen
      v-model="dialogProvincias"
      transition="dialog-bottom-transition"
    >
      <v-card color="">
        <v-toolbar elevation="0" color="white">
          <v-btn icon @click.native="dialogProvincias = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-center">Provincias</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <Provincies @refresh-data="getItems()" :provincies="provincies" />
      </v-card>

      <!-- <Reserva :airport="airport" :airlines="airlines" /> -->
    </v-dialog>
    <v-dialog
      fullscreen
      v-model="dialogAeropuertos"
      transition="dialog-bottom-transition"
    >
      <v-card color="">
        <v-toolbar elevation="0" color="white">
          <v-btn icon @click.native="dialogAeropuertos = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-center">Aeropuertos</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <Airtports @refresh-data="getItems()" :airports="airports" />
      </v-card>

      <!-- <Reserva :airport="airport" :airlines="airlines" /> -->
    </v-dialog>
    <v-dialog
      fullscreen
      v-model="dialogSucursales"
      transition="dialog-bottom-transition"
    >
      <v-card color="">
        <v-toolbar elevation="0" color="white">
          <v-btn icon @click.native="dialogSucursales = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-center">Sucursales</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <Branches @refresh-data="getItems()" :branches="branches" />
      </v-card>

      <!-- <Reserva :airport="airport" :airlines="airlines" /> -->
    </v-dialog>
    <v-dialog
      fullscreen
      v-model="dialogSegurosAdicionales"
      transition="dialog-bottom-transition"
    >
      <v-card color="">
        <v-toolbar elevation="0" color="white">
          <v-btn icon @click.native="dialogSegurosAdicionales = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-center"
            >Seguros adicionales</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <SegurosAdicionales
          @refresh-data="getItems()"
          :additionalCoverages="additionalCoverages"
        />
      </v-card>

      <!-- <Reserva :airport="airport" :airlines="airlines" /> -->
    </v-dialog>
    <v-dialog
      fullscreen
      v-model="dialgoItems"
      transition="dialog-bottom-transition"
    >
      <v-card color="">
        <v-toolbar elevation="0" color="white">
          <v-btn icon @click.native="dialgoItems = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-center">Acesorios</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <Items @refresh-data="getItems()" :newItems="newItems" />
      </v-card>

      <!-- <Reserva :airport="airport" :airlines="airlines" /> -->
    </v-dialog>
    <v-dialog
      fullscreen
      v-model="dialogSuscripcion"
      transition="dialog-bottom-transition"
    >
      <v-card color="">
        <v-toolbar elevation="0" color="white">
          <v-btn icon @click.native="dialogSuscripcion = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-center">Suscripciones </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <Suscripciones
          @refresh-data="getItems()"
          :suscriptions="suscriptions"
          :airports="airports"
          :provincies="provincies"
          :additionalCoverages="additionalCoverages"
          :acesorios="newItems"
        />
      </v-card>

      <!-- <Reserva :airport="airport" :airlines="airlines" /> -->
    </v-dialog>
  </v-container>
</template>
<script>
import Seguros from "@/components/maintenance/Seguros.vue";
import Provincies from "@/components/maintenance/Provincias.vue";
import Airtports from "@/components/maintenance/Aeropuerto.vue";
import Branches from "@/components/maintenance/Sucursales.vue";
import SegurosAdicionales from "@/components/maintenance/SegurosAdicionals.vue";
import Suscripciones from "@/components/maintenance/Suscripciones.vue";
import Items from "@/components/maintenance/Items.vue";
import { GET_MATEINANCES } from "@/gql/queries";
export default {
  name: "my-perfil",
  data() {
    return {
      dialogSeguros: false,
      dialogProvincias: false,
      dialogAeropuertos: false,
      dialogSucursales: false,
      dialogSegurosAdicionales: false,
      dialogSuscripcion: false,
      dialgoItems: false,
      insurances: [],
      provincies: [],
      airports: [],
      branches: [],
      newItems: [],
      additionalCoverages: [],
      suscriptions: [],
      items: [
        {
          icon: "sell",
          name: "Suscripciones",
          description: "Gestiona las suscripciones disponibles.",
          dialog: "Suscripciones",
        },
        {
          icon: "mdi-shield-car",
          name: "Seguros",
          description: "Gestiona los seguros disponibles.",
          dialog: "Seguros",
        },

        {
          icon: "location_on",
          name: "Provincias",
          description: "Gestiona los provincias disponibles.",
          dialog: "Provincias",
        },
        {
          icon: "flight",
          name: "Aeropuertos",
          description: "Gestiona los aeropuesrtos disponibles.",
          dialog: "Aeropuertos",
        },

        {
          icon: "home",
          name: "Sucursales",
          description: "Gestiona tu sucursales.",
          dialog: "Sucursales",
        },

        {
          icon: "mdi-shield-car",
          name: "Seguros adicionales",
          description: "Gestiona tu seguros disponibles.",
          dialog: "SegurosAdicionales",
        },

        {
          icon: "add",
          name: "Acesorios",
          description: "Gestiona tu acesorios.",
          dialog: "Acesorios",
        },
      ],
    };
  },
  created() {
    this.getItems();
  },
  components: {
    Seguros,
    Provincies,
    Airtports,
    Branches,
    SegurosAdicionales,
    Suscripciones,
    Items,
  },
  computed: {
    profile() {
      return this.$store.state.Auth;
    },
  },
  methods: {
    async getItems() {
      this.loading = false;
      const data = await this.$apollo.query({
        query: GET_MATEINANCES,
        variables: { companyId: this.$companie_id },
        fetchPolicy: "no-cache",
      });
      this.insurances = data.data.insurances.nodes;
      this.suscriptions = data.data.subscriptions.nodes;
      this.newItems = data.data.rentalItems.nodes;
      this.provincies = data.data.provinceInCompanies.nodes;
      this.airports = data.data.airports.nodes;
      this.branches = data.data.branches.nodes;
      this.additionalCoverages = data.data.additionalCoverages.edges;
      this.loading = true;
    },
    showDialog(item) {
      if (item.dialog == "Seguros") {
        this.dialogSeguros = true;
      }
      if (item.dialog == "Provincias") {
        this.dialogProvincias = true;
      }

      if (item.dialog == "Aeropuertos") {
        this.dialogAeropuertos = true;
      }

      if (item.dialog == "Sucursales") {
        this.dialogSucursales = true;
      }

      if (item.dialog == "SegurosAdicionales") {
        this.dialogSegurosAdicionales = true;
      }
      if (item.dialog == "Suscripciones") {
        this.dialogSuscripcion = true;
      }
      if (item.dialog == "Acesorios") {
        this.dialgoItems = true;
      }
    },
  },
};
</script>
