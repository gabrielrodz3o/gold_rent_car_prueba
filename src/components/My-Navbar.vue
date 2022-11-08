<template>
  <v-app-bar
    elevate-on-scroll
    app
    flat
    height="70px"
    color="white"
    elevation="0"
    outlined
  >
    <v-spacer></v-spacer>
    <v-toolbar-title style="width: 300px">
      <router-link to="/">
        <v-img contain src="@/assets/newlogo.png" aspect-ratio="5"></v-img>
      </router-link>
    </v-toolbar-title>
    <v-menu :close-on-content-click="true" :nudge-width="200" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <template class="hidden-sm-and-down">
            <span class="hidden-sm-and-down"> Menu </span>
          </template>

          <v-icon class="pr-1" size="30px" color="black">menu</v-icon>
        </div>
      </template>

      <v-card class="rounded-lg" width="500px">
        <v-list nav dense>
          <template>
            <v-list-item color="white" :to="{ name: 'Home' }"
              ><v-icon color="black" size="40px" class="mx-3">mdi-home</v-icon>
              <v-list-item-subtitle><b>Inicio</b></v-list-item-subtitle>
            </v-list-item>
          </template>
          <template>
            <v-list-item color="white" :to="{ name: 'Vehicles' }"
              ><v-icon color="black" size="40px" class="mx-3">mdi-car</v-icon>
              <v-list-item-subtitle><b>Vehiculos</b></v-list-item-subtitle>
            </v-list-item>
          </template>
          <template>
            <v-list-item color="white" :to="{ name: 'Requerimiento' }"
              ><v-icon color="black" size="40px" class="mx-3"
                >mdi-vector-polyline-edit</v-icon
              >
              <v-list-item-subtitle><b>Requerimientos</b></v-list-item-subtitle>
            </v-list-item>
          </template>

          <template>
            <v-list-item color="white" :to="{ name: 'Contactos' }"
              ><v-icon color="black" size="40px" class="mx-3"
                >mdi-account-box</v-icon
              >
              <v-list-item-subtitle><b>Contactos</b></v-list-item-subtitle>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-menu>
    <v-spacer></v-spacer>
    <v-text-field
      outlined
      hide-details
      single-line
      dense
      prepend-inner-icon="mdi-magnify"
      label="Buscar"
      class="rounded-xl hidden-sm-and-down"
    />

    <v-spacer />
    <!-- <v-btn color="grey" class="rounded-lg" >
        <v-badge content="2" value="2" color="black" left>
          <v-icon size="25px" color="white">mdi-bell</v-icon>
        </v-badge>
      </v-btn> -->

    <v-btn icon :href="url" target="_blank">
      <v-icon color="black"> mdi-whatsapp </v-icon>
    </v-btn>
    <!-- <v-icon class="" color="black">mdi-web</v-icon> -->

    <v-menu
      v-if="Authentication.authStatus == true"
      :value="shown"
      rounded="lg"
      :nudge-width="300"
      transition="scroll-y-reverse-transition"
      offset-y
      left
      nudge-left="-10"
      nudge-top="-10"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-badge
          v-bind="attrs"
          v-on="on"
          color="primary"
          overlap
          :content="counNotifications"
          class="pl-2 mr-4 mt-1"
        >
          <v-icon v-bind="attrs" v-on="on" color="black">notifications</v-icon>
        </v-badge>
      </template>

      <!-- <v-card      style="z-index:99" height="auto"> -->
      <v-card class="mx-auto" max-width="400" tile>
        <v-row class="mt-4">
          <span
            class="my-application3 mx-6 pl-2 mt-3 pb-2"
            style="font-size: 24px"
          >
            Notificaciones
          </span>
        </v-row>
        <v-divider class="mt-4"></v-divider>
        <v-list
          style="
            height: 60vh;
            overflow-y: auto;
            overflow-x: hidden;
            offset-position: left;
          "
          class="wrapper mt-4"
        >
          <template v-if="loadedDate == true">
            <template v-for="(item, i) in notifications">
              <v-list-item
                @click="readNotification(item)"
                v-if="i < 8"
                lines="two"
                :key="i"
                class="pb-4"
              >
                <v-row>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" md="2">
                        <v-icon color="primary" class="mx-2"
                          >notifications</v-icon
                        >
                      </v-col>
                      <v-col cols="12" md="10">
                        <b> {{ item.notificationType.name }}</b>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12" md="2"> </v-col>
                      <v-col cols="12" md="10">
                        <span>
                          {{ item.body }}
                        </span>
                      </v-col>
                    </v-row>

                    <v-row no-gutters>
                      <v-col cols="12" md="2"> </v-col>
                      <v-col cols="12" md="10">
                        <span style="color: #1b5e20">
                          {{ getYears(item.createdAt) }}
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-list-item>
              <v-list-item v-if="i == 8">
                <v-row justify="center">
                  <v-btn plain @click="go()"> Ver todas </v-btn>
                </v-row>
              </v-list-item>
            </template>
            <v-list-item class="pb-14" v-if="notifications.length == 0">
              <v-row justify="center" align="center">
                <span>No tienes notificaciones</span>
              </v-row>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-menu>
    <!-- <span v-if="Authentication.authStatus == true">
        Hola, {{ Authentication.user.firstname }}
      </span> -->
    <v-menu
      :value="shown"
      rounded="xl"
      :nudge-width="160"
      transition="scroll-y-reverse-transition"
      offset-y
      left
      nudge-left="-10"
      nudge-top="-15"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="grey lighten-2"
          outlined
          elevation="0"
          class="rounded-pill"
          width="auto"
          height="48"
          v-bind="attrs"
          v-on="on"
          slot="activator"
        >
          <v-icon class="pr-1" size="25px" color="black">mdi-menu</v-icon>

          <v-icon size="35px" color="grey">mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <!-- <v-card      style="z-index:99" height="auto"> -->
      <v-list class="wrapper" style="offset-position: left">
        <v-list-item v-if="Authentication.authStatus == true">
          <v-list-item-title
            ><v-icon class="pr-2">mdi-message</v-icon
            >Mensajes</v-list-item-title
          >
        </v-list-item>

        <v-list-item v-if="Authentication.authStatus == true">
          <v-list-item-title
            ><v-icon class="pr-2">mdi-heart</v-icon> Lista de
            favoritos</v-list-item-title
          >
        </v-list-item>

        <v-divider v-if="Authentication.authStatus == true"> </v-divider>

        <template v-if="Authentication.authStatus == false">
          <v-list-item
            @click.stop="(shown = false), (Authentication.loginForm = true)"
          >
            <v-list-item-title
              ><v-icon class="pr-2 my-application3">mdi-login</v-icon> Inicia
              session</v-list-item-title
            >
          </v-list-item>
        </template>

        <template v-if="Authentication.authStatus == false">
          <v-list-item
            @click.stop="(showRegister = false), (showRegisterForm = true)"
          >
            <v-list-item-title
              ><v-icon class="pr-2">mdi-account-plus </v-icon
              >Registrarte</v-list-item-title
            >
          </v-list-item>
        </template>

        <template v-if="Authentication.authStatus == true">
          <v-list-item :to="{ name: 'Accountsetting' }">
            <v-list-item-title
              ><v-icon class="pr-2">mdi-account</v-icon>
              Cuenta</v-list-item-title
            >
          </v-list-item>
        </template>
        <template v-if="Authentication.authStatus == true">
          <v-list-item :to="{ name: 'MyRenta' }">
            <v-list-item-title
              ><v-icon class="pr-2">mdi-calendar</v-icon> Mis
              rentas</v-list-item-title
            >
          </v-list-item>
        </template>
        <v-divider v-if="Authentication.authStatus == true"> </v-divider>
        <template>
          <v-list-item
            :to="{ name: 'PostVehicles' }"
            v-if="Authentication.authStatus == true"
          >
            <v-list-item-title
              ><v-icon class="pr-2">mdi-car-key</v-icon> Publicar
              <v-chip class="pr-4" pill>Admin</v-chip></v-list-item-title
            >
          </v-list-item>
        </template>

        <template v-if="Authentication.authStatus == true">
          <v-list-item :to="{ name: 'Advertisements' }">
            <v-list-item-title
              ><v-icon class="pr-2">mdi-format-list-bulleted</v-icon>Mis
              anuncios
              <v-chip class="pr-4" pill>Admin</v-chip></v-list-item-title
            >
          </v-list-item>
        </template>

        <template>
          <v-list-item
            :to="{ name: 'RequestRents' }"
            v-if="Authentication.authStatus == true"
          >
            <v-list-item-title
              ><v-icon class="pr-2">mdi-book-open-variant</v-icon>Rentas
              <v-chip class="pr-4" pill>Admin</v-chip></v-list-item-title
            >
          </v-list-item>
        </template>

        <!-- <template v-if="Authentication.authStatus == true">
            <v-list-item>
              <v-list-item-title
                ><v-icon class="pr-2">mdi-receipt</v-icon> Facturas
                <v-chip class="pr-4" pill>Admin</v-chip></v-list-item-title
              >
            </v-list-item>
          </template> -->
        <v-divider></v-divider>

        <template v-if="Authentication.authStatus == false">
          <v-list-item>
            <v-list-item-title>Ayuda</v-list-item-title>
          </v-list-item>
        </template>

        <template v-if="Authentication.authStatus == true">
          <v-list-item @click="logout">
            <v-list-item-title
              ><v-icon class="pr-2">mdi-logout</v-icon> Cerrar
              session</v-list-item-title
            >
          </v-list-item>
        </template>
      </v-list>
    </v-menu>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script>
import { mapActions } from "vuex";
import {
  GET_VEHICLE_BRANDS_AND_MODLES,
  GET_NOTIICATIONS,
  COUNT_NOTIFICATIONS,
} from "../gql/queries";
import { READ_NOTIFICAION } from "../gql/mutation";
export default {
  data() {
    return { notifications: [], counNotifications: null };
  },
  props: {
    dialog: {
      default: true,
    },
  },
  created() {
    //this.whatsapp();
    this.getNotifications();
  },
  computed: {
    url() {
      localStorage.setItem("apilinkws", this.apilink);

      return this.apilink;
    },
    Authentication() {
      return this.$store.state.Auth;
    },
  },
  methods: {
    async getNotifications() {
      // this.loadingNotifications=false
      var notification = await this.$apollo.query({
        query: GET_NOTIICATIONS,
        variables: { userId: this.$store.state.Auth.user.rowId },
      });

      this.notifications = notification.data.notifications.nodes;
      this.loadedDate = true;
      var cNotifications = await this.$apollo.query({
        query: COUNT_NOTIFICATIONS,
        variables: { userId: this.$store.state.Auth.user.rowId },
      });

      this.counNotifications = cNotifications.data.notifications.totalCount;
    },
    show() {
      this.$dialogLogin = true;
    },
  },
};
</script>
