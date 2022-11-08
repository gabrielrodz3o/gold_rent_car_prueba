<template>
  <v-app class="my-application">
    <!-- <Navbar /> -->
    <v-app-bar
      v-if="type == 1"
      elevate-on-scroll
      app
      flat
      height="80px"
      color="secondary"
      elevation="0"
      outlined
    >
      <v-spacer></v-spacer>
      <v-toolbar-title style="width: 350px">
        <router-link to="/">
          <v-img contain src="@/assets/logo.png" aspect-ratio="5"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        plain
        color="secondary"
        v-for="(item, i) in menu"
        @click="goRoute(item)"
        :key="i"
        class="hidden-sm-and-down"
        :to="{ path: '/' }"
      >
        <v-icon
          :style="
            item.icon == `link` || item.icon == `push_pin`
              ? `transform: rotate(50deg)`
              : `color:white `
          "
          color="white"
          class="mx-1"
          >{{ item.icon }}
        </v-icon>
        <span
          style="color: white; text-transform: capitalize; font-size: 16px"
          >{{ item.title }}</span
        >
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn icon :href="url" target="_blank">
        <v-icon color="white"> whatsapp </v-icon>
      </v-btn>

      <div style="cursor: pointer" @click="setLocale()">
        <v-badge
          color="secondary"
          overlap
          :content="$i18n.locale"
          class="pl-2 mr-4 mt-1"
        >
          <v-icon color="white">language</v-icon>
        </v-badge>
      </div>

      <v-menu
        v-if="Authentication.authStatus == true"
        :value="shown"
        rounded="lg"
        :nudge-width="350"
        transition="scroll-y-reverse-transition"
        offset-y
        left
        absolute
        nudge-left="-10"
        nudge-top="-25"
      >
        <!-- <v-badge overlap color="white">
          <template v-slot:badge>
            <span v-if="!!counNotifications">{{ counNotifications }}</span>
          </template>
          <v-btn color="white" text>
            <v-icon color="white">notifications</v-icon>
          </v-btn>
        </v-badge> -->
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            v-bind="attrs"
            v-on="on"
            color="secondary"
            overlap
            :content="counNotifications"
            class="pl-2 mr-4 mt-1"
          >
            <v-icon
              v-if="Authentication.authStatus == true"
              v-bind="attrs"
              v-on="on"
              color="white"
              >notifications
            </v-icon>
          </v-badge>
        </template>

        <v-card class="mx-auto rounded-lg" max-width="400" tile>
          <v-row class="mt-4">
            <span
              class="my-application3 mx-6 pl-2 mt-3 pb-2"
              style="font-size: 24px"
            >
              Notificaciones
            </span>
          </v-row>
          <v-divider class="mt-4"></v-divider>
          <v-list style="" class="wrapper mt-4">
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
                          <span class="primary--text">
                            {{ getYears(item.createdAt) }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-list-item>
                <!-- <v-list-item v-if="i == 8">
                  <v-row justify="center">
                    <v-btn plain @click="go()"> Ver todas </v-btn>
                  </v-row>
                </v-list-item> -->
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
            <v-icon class="pr-1" size="25px" color="white">menu</v-icon>

            <v-icon size="35px" color="grey">account_circle</v-icon>
          </v-btn>
        </template>

        <v-list class="wrapper" style="offset-position: left">
          <v-list-item v-if="Authentication.authStatus == true">
            <v-list-item-title
              class="text-center primary--text my-application2"
            >
              <v-icon color="green">done</v-icon>
              <span v-if="$i18n.locale == 'es'"> {{ supcriptions.name }}</span>
              <span v-else> {{ supcriptions.nameEn }}</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            :to="{ name: 'Favorites' }"
            v-if="Authentication.authStatus == true"
          >
            <v-list-item-title>
              <v-icon class="pr-2">favorite</v-icon
              >{{ $t("menuProfile.favoritos") }}
            </v-list-item-title>
          </v-list-item>

          <v-divider v-if="Authentication.authStatus == true"> </v-divider>

          <template v-if="Authentication.authStatus == false">
            <v-list-item
              @click.stop="(shown = false), (Authentication.loginForm = true)"
            >
              <v-list-item-title>
                <v-icon class="pr-2 my-application3">login</v-icon>
                {{ $t("menuProfile.login") }}
              </v-list-item-title>
            </v-list-item>
          </template>

          <template v-if="Authentication.authStatus == false">
            <v-list-item
              @click.stop="(showRegister = false), (showRegisterForm = true)"
            >
              <v-list-item-title>
                <v-icon class="pr-2">person_add </v-icon
                >{{ $t("menuProfile.register") }}
              </v-list-item-title>
            </v-list-item>
          </template>

          <template v-if="Authentication.authStatus == true">
            <v-list-item :to="{ name: 'Accountsetting' }">
              <v-list-item-title>
                <v-icon class="pr-2">account_circle</v-icon>
                {{ $t("menuProfile.cuenta") }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-if="Authentication.authStatus == true">
            <v-list-item :to="{ name: 'MyRenta' }">
              <v-list-item-title>
                <v-icon class="pr-2">calendar_month</v-icon
                >{{ $t("menuProfile.rentas") }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-divider
            v-if="
              Authentication.authStatus == true &&
              Authentication.user.isAdmin == true
            "
          >
          </v-divider>
          <template>
            <v-list-item
              :to="{ name: 'PostVehicles' }"
              v-if="
                Authentication.authStatus == true &&
                Authentication.user.isAdmin == true
              "
            >
              <v-list-item-title>
                <v-icon class="pr-2">car_rental</v-icon
                >{{ $t("menuProfile.publicar") }}
                <v-chip class="pr-4" pill>Admin</v-chip>
              </v-list-item-title>
            </v-list-item>
          </template>

          <template
            v-if="
              Authentication.authStatus == true &&
              Authentication.user.isAdmin == true
            "
          >
            <v-list-item :to="{ name: 'Advertisements' }">
              <v-list-item-title>
                <v-icon class="pr-2">list</v-icon
                >{{ $t("menuProfile.anuncios") }}
                <v-chip class="pr-4" pill>Admin</v-chip>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template
            v-if="
              Authentication.authStatus == true &&
              Authentication.user.isAdmin == true
            "
          >
            <v-list-item :to="{ name: 'PaySupcriptinos' }">
              <v-list-item-title>
                <v-icon class="pr-2">payments</v-icon
                >{{ $t("menuProfile.pagoSupcripciones") }}
                <v-chip class="pr-4" pill>Admin</v-chip>
              </v-list-item-title>
            </v-list-item>
          </template>

          <template>
            <v-list-item
              :to="{ name: 'RequestRents' }"
              v-if="
                Authentication.authStatus == true &&
                Authentication.user.isAdmin == true
              "
            >
              <v-list-item-title>
                <v-icon class="pr-2">menu_book</v-icon
                >{{ $t("menuProfile.rentasSolicitadas") }}
                <v-chip class="pr-4" pill>Admin</v-chip>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template>
            <v-list-item
              :to="{ name: 'Maintenance' }"
              v-if="
                Authentication.authStatus == true &&
                Authentication.user.isAdmin == true
              "
            >
              <v-list-item-title>
                <v-icon class="pr-2">settings</v-icon
                >{{ $t("menuProfile.mantemimiento") }}
                <v-chip class="pr-4" pill>Admin</v-chip>
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-divider></v-divider>

          <template v-if="Authentication.authStatus == false">
            <v-list-item>
              <v-list-item-title>Ayuda</v-list-item-title>
            </v-list-item>
          </template>

          <template v-if="Authentication.authStatus == true">
            <v-list-item @click="logout">
              <v-list-item-title>
                <v-icon class="pr-2">logout</v-icon
                >{{ $t("menuProfile.logout") }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-app-bar
      v-if="type == 2"
      elevate-on-scroll
      app
      flat
      height="80px"
      color="secondary"
      elevation="0"
      outlined
    >
      <v-spacer></v-spacer>
      <v-toolbar-title style="width: 350px">
        <router-link to="/">
          <v-img contain src="@/assets/logo.png" aspect-ratio="5"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-menu :close-on-content-click="true" :nudge-width="200" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <template class="hidden-sm-and-down">
              <span class="hidden-sm-and-down" style="color: white">
                Menu
              </span>
            </template>

            <v-icon class="pr-1" size="30px" color="white">menu</v-icon>
          </div>
        </template>

        <v-card class="rounded-lg" width="500px">
          <v-list nav dense>
            <template>
              <v-list-item
                v-for="(item, i) in menu"
                @click="goRoute(item)"
                :key="i"
                color="white"
              >
                <v-icon color="black" size="40px" class="mx-3">{{
                  item.icon
                }}</v-icon>
                <v-list-item-subtitle
                  ><b>{{ item.title }}</b></v-list-item-subtitle
                >
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-menu>
      <v-spacer></v-spacer>
      <v-menu
        rounded="lg"
        transition="scroll-y-reverse-transition"
        offset-y
        nudge-left="-10"
        nudge-top="-10"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="search"
            outlined
            v-bind="attrs"
            v-on="on"
            hide-details
            single-line
            @keyup="seacrhVehicles"
            dense
            dark
            prepend-inner-icon="search"
            label="Buscar"
            class="rounded-xl hidden-sm-and-down"
          />
        </template>
        <v-list
          v-show="search.length > 0"
          style="
            height: auto;
            overflow-y: auto;
            overflow-x: hidden;
            offset-position: left;
          "
          class="wrapper mt-4"
        >
          <template v-for="(item, i) in resultVehicles">
            <v-list-item
              v-if="resultVehicles.length > 0"
              @click="viewVehicle(item)"
              lines="two"
              :key="i"
              class="pb-4"
            >
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-img
                        height="100px"
                        width="100px"
                        :src="item.vehicleImages.nodes[0].imageUrl"
                      >
                      </v-img>
                      <!-- <v-icon color="primary" class="mx-2">car</v-icon> -->
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-layout
                        class=""
                        align-center
                        justify-center
                        fill-height
                      >
                        <b> {{ item.name }} {{ item.year }}</b>
                      </v-layout>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-list-item>
            <!-- <v-list-item v-if="i == 8">
                  <v-row justify="center">
                    <v-btn plain @click="go()"> Ver todas </v-btn>
                  </v-row>
                </v-list-item> -->
          </template>
          <v-list-item
            class="pb-14"
            v-if="resultVehicles.length == 0 && search.length > 0"
          >
            <v-row justify="center" align="center">
              <span>No se econtraron resultados</span>
            </v-row>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn icon :href="url" target="_blank">
        <v-icon color="white"> whatsapp </v-icon>
      </v-btn>

      <v-badge
        color="secondary"
        overlap
        :content="$i18n.locale"
        class="pl-2 mr-4 mt-1"
      >
        <v-icon @click="setLocale()" color="white">language</v-icon>
      </v-badge>

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
        <!-- <v-badge overlap color="white">
          <template v-slot:badge>
            <span v-if="!!counNotifications">{{ counNotifications }}</span>
          </template>
          <v-btn color="white" text>
            <v-icon color="white">notifications</v-icon>
          </v-btn>
        </v-badge> -->
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            v-bind="attrs"
            v-on="on"
            color="secondary"
            overlap
            :content="counNotifications"
            class="pl-2 mr-4 mt-1"
          >
            <v-icon
              v-if="Authentication.authStatus == true"
              v-bind="attrs"
              v-on="on"
              color="white"
              >notifications
            </v-icon>
          </v-badge>
        </template>

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
          <v-list class="clast-list wrapper mt-4">
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
                          <span class="primary--text">
                            {{ getYears(item.createdAt) }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-list-item>
                <!-- <v-list-item v-if="i == 8">
                  <v-row justify="center">
                    <v-btn plain @click="go()"> Ver todas </v-btn>
                  </v-row>
                </v-list-item> -->
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
            <v-icon class="pr-1" size="25px" color="white">menu</v-icon>

            <v-icon size="35px" color="grey">account_circle</v-icon>
          </v-btn>
        </template>

        <v-list class="wrapper" style="offset-position: left">
          <v-list-item v-if="Authentication.authStatus == true">
            <v-list-item-title
              class="text-center primary--text my-application2"
            >
              <v-icon color="green">done</v-icon>
              <span v-if="$i18n.locale == 'en'">
                {{ supcriptions.nameEn }}</span
              >
              <span else> {{ supcriptions.name }}</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            :to="{ name: 'Favorites' }"
            v-if="Authentication.authStatus == true"
          >
            <v-list-item-title>
              <v-icon class="pr-2">favorite</v-icon
              >{{ $t("menuProfile.favoritos") }}
            </v-list-item-title>
          </v-list-item>

          <v-divider v-if="Authentication.authStatus == true"> </v-divider>

          <template v-if="Authentication.authStatus == false">
            <v-list-item
              @click.stop="(shown = false), (Authentication.loginForm = true)"
            >
              <v-list-item-title>
                <v-icon class="pr-2 my-application3">login</v-icon>
                {{ $t("menuProfile.login") }}
              </v-list-item-title>
            </v-list-item>
          </template>

          <template v-if="Authentication.authStatus == false">
            <v-list-item
              @click.stop="(showRegister = false), (showRegisterForm = true)"
            >
              <v-list-item-title>
                <v-icon class="pr-2">person_add </v-icon
                >{{ $t("menuProfile.register") }}
              </v-list-item-title>
            </v-list-item>
          </template>

          <template v-if="Authentication.authStatus == true">
            <v-list-item :to="{ name: 'Accountsetting' }">
              <v-list-item-title>
                <v-icon class="pr-2">account_circle</v-icon>
                {{ $t("menuProfile.cuenta") }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-if="Authentication.authStatus == true">
            <v-list-item :to="{ name: 'MyRenta' }">
              <v-list-item-title>
                <v-icon class="pr-2">calendar_month</v-icon
                >{{ $t("menuProfile.rentas") }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-divider
            v-if="
              Authentication.authStatus == true &&
              Authentication.user.isAdmin == true
            "
          >
          </v-divider>
          <template>
            <v-list-item
              :to="{ name: 'PostVehicles' }"
              v-if="
                Authentication.authStatus == true &&
                Authentication.user.isAdmin == true
              "
            >
              <v-list-item-title>
                <v-icon class="pr-2">car_rental</v-icon
                >{{ $t("menuProfile.publicar") }}
                <v-chip class="pr-4" pill>Admin</v-chip>
              </v-list-item-title>
            </v-list-item>
          </template>

          <template
            v-if="
              Authentication.authStatus == true &&
              Authentication.user.isAdmin == true
            "
          >
            <v-list-item :to="{ name: 'Advertisements' }">
              <v-list-item-title>
                <v-icon class="pr-2">list</v-icon
                >{{ $t("menuProfile.anuncios") }}
                <v-chip class="pr-4" pill>Admin</v-chip>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template
            v-if="
              Authentication.authStatus == true &&
              Authentication.user.isAdmin == true
            "
          >
            <v-list-item :to="{ name: 'PaySupcriptinos' }">
              <v-list-item-title>
                <v-icon class="pr-2">payments</v-icon
                >{{ $t("menuProfile.pagoSupcripciones") }}
                <v-chip class="pr-4" pill>Admin</v-chip>
              </v-list-item-title>
            </v-list-item>
          </template>

          <template>
            <v-list-item
              :to="{ name: 'RequestRents' }"
              v-if="
                Authentication.authStatus == true &&
                Authentication.user.isAdmin == true
              "
            >
              <v-list-item-title>
                <v-icon class="pr-2">menu_book</v-icon
                >{{ $t("menuProfile.rentasSolicitadas") }}
                <v-chip class="pr-4" pill>Admin</v-chip>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template>
            <v-list-item
              :to="{ name: 'Maintenance' }"
              v-if="
                Authentication.authStatus == true &&
                Authentication.user.isAdmin == true
              "
            >
              <v-list-item-title>
                <v-icon class="pr-2">settings</v-icon
                >{{ $t("menuProfile.mantemimiento") }}
                <v-chip class="pr-4" pill>Admin</v-chip>
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-divider></v-divider>

          <template v-if="Authentication.authStatus == false">
            <v-list-item>
              <v-list-item-title>Ayuda</v-list-item-title>
            </v-list-item>
          </template>

          <template v-if="Authentication.authStatus == true">
            <v-list-item @click="logout">
              <v-list-item-title>
                <v-icon class="pr-2">logout</v-icon
                >{{ $t("menuProfile.logout") }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="">
      <v-divider></v-divider>

      <CompletProfile v-model="Authentication.formCompletProfile" />
      <Login v-model="Authentication.loginForm" />
      <Register v-model="showRegisterForm" />

      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>

<script>
//import Navbar from "./components/My-Navbar";
import { mapActions } from "vuex";
import {
  GET_INFO_COMPANY,
  GET_VEHICLE_BRANDS_AND_MODLES,
  GET_NOTIICATIONS,
  GET_VEHICLES_FIRST,
  COUNT_NOTIFICATIONS,
  GET_REQUERIMENT_FOR_RENT,
} from "./gql/queries";
import { READ_NOTIFICAION } from "./gql/mutation";
import Login from "./components/My-Login";
import Register from "./components/My-Register";
import CompletProfile from "./components/account/Complet-Perfil";
import moment from "moment";
export default {
  name: "App",

  components: {
    //Navbar,
    Login,
    Register,
    CompletProfile,
  },
  data() {
    return {
      type: 1,
      apilink: "",
      newapilink: "",
      phone: "+18294496091",
      menuItems: [],
      icons: ["facebook", "whatsapp", "mdi-instagram"],
      search: "",
      vehicles: [],
      resultVehicles: [],
      vehicleBrands: [],
      vehicleModels: [],
      notifications: [],
      counNotifications: [],
      allArticles: [],
      supcriptions: [],
      doLogin: true,
      loadedDate: false,
      showLoginForm: false,
      showRegisterForm: false,
      shown: false,
      showRegister: false,
      showCompleteProflie: false,
    };
  },
  computed: {
    url() {
      localStorage.setItem("apilinkws", this.apilink);

      return this.apilink + " Hola!";
    },
    Authentication() {
      return this.$store.state.Auth;
    },
    menu() {
      var menuItems = [
        { icon: "home", title: this.$t("menuAppBar.inicio"), path: "Home" },
        {
          icon: "push_pin",
          title: this.$t("menuAppBar.requisitos"),
          path: "Requerimiento",
        },
        {
          icon: "directions_car",
          title: this.$t("menuAppBar.vehiculos"),
          path: "Vehicles",
        },
        {
          icon: "link",
          title: this.$t("menuAppBar.nosotros"),
          path: "Nosotros",
        },
        {
          icon: "public",
          title: this.$t("menuAppBar.contactos"),
          path: "Contactos",
        },
      ];
      return menuItems;
    },
  },
  created() {
    this.getData();
  },

  methods: {
    async getData() {
      var dataVehicleBrandsAndModels = await this.$apollo.query({
        query: GET_VEHICLE_BRANDS_AND_MODLES,
        variables: {
          companyId: this.$companie_id,
        },
      });

      var dataCompany = await this.$apollo.query({
        query: GET_INFO_COMPANY,
      });

      this.$company_phone = dataCompany.data.company.chatPhoneNumber;
      this.$email = dataCompany.data.company.email;
      localStorage.setItem("email", dataCompany.data.company.email);
      localStorage.setItem("emailSend", dataCompany.data.company.mailUser);
      localStorage.setItem("phone", dataCompany.data.company.chatPhoneNumber);
      localStorage.setItem("logo", dataCompany.data.company.logoUrl);

      for (var item of dataVehicleBrandsAndModels.data.publishedBrands.nodes) {
        this.vehicleBrands.push({
          text: item.name,
          value: item.rowId,
          logoUrl: item.logoUrl,
        });
      }

      for (var item2 of dataVehicleBrandsAndModels.data.publishedModels.nodes) {
        this.vehicleModels.push({
          text: item2.name,
          value: item2.rowId,
          condicion: item2.vehicleBrandId,
        });
      }

      window.localStorage.setItem(
        "VEHICLE_BRANDS",
        JSON.stringify(this.vehicleBrands)
      );
      window.localStorage.setItem(
        "VEHICLE_MODELS",
        JSON.stringify(this.vehicleModels)
      );

      if (this.$store.state.Auth.authStatus == true) {
        this.getNotifications();
        var supcriptions = await this.$apollo.query({
          query: GET_REQUERIMENT_FOR_RENT,

          variables: {
            companyId: this.$companie_id,
            userId: this.$store.state.Auth.user.rowId,
            upToDate: moment().format("YYYY-MM-DD").toString(),
          },
          fetchPolicy: "no-cache",
        });

        if (supcriptions.data.userWithSubscriptions.nodes.length > 0) {
          this.supcriptions =
            supcriptions.data.userWithSubscriptions.nodes[0].subscription;
        }
      }
      this.vehicles = [];
      var data = await this.$apollo.query({
        query: GET_VEHICLES_FIRST,
        variables: { companyId: this.$companie_id, branchIds: this.$branch_id },
        fetchPolicy: "no-cache",
      });

      var datos = data.data.vehicles.nodes;

      for (var a = 0; a < datos.length; a++) {
        this.vehicles.push({
          name: datos[a].vehicleBrand.name + " " + datos[a].vehicleModel.name,
          rowId: datos[a].rowId,
          isDeluxe: datos[a].isDeluxe,
          basePrice: datos[a].basePrice,
          depositPrice: datos[a].depositPrice,
          tractionControlType: datos[a].tractionControlType,
          vehicleAmenities: datos[a].vehicleAmenities,
          vehicleColor: datos[a].vehicleColor,
          vehicleNotAvailableDates: datos[a].vehicleNotAvailableDates,
          vehicleSeating: datos[a].vehicleSeating,
          branch: datos[a].branch,
          currency: datos[a].currency,
          vehicleImages: datos[a].vehicleImages,
          vehicleBrand: datos[a].vehicleBrand,
          vehicleModel: datos[a].vehicleModel,
          year: datos[a].year,
        });
      }
      this.whatsapp();
    },
    setLocale() {
      var locale = "";
      if (this.$i18n.locale == "es") {
        locale = "en";
      }

      if (this.$i18n.locale == "en") {
        locale = "es";
      }

      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    },
    viewVehicle(item) {
      this.search = "";
      this.$router.replace({ path: "/vehicles/" + item.rowId });
    },
    seacrhVehicles(event) {
      this.resultVehicles = [];
      if (this.search.length > 0) {
        this.resultVehicles = [];

        var result = this.vehicles.find(
          (element) => element.name === event.target.value
        );
        let resultados = [];
        this.vehicles.forEach((j) => {
          let palabra = j.name.toLowerCase();

          if (palabra.includes(event.target.value.toLowerCase())) {
            resultados.push(j);
          }
        });
        this.resultVehicles = resultados;
      }
    },
    async readNotification(item) {
      try {
        var data = await this.$apollo.mutate({
          mutation: READ_NOTIFICAION,
          variables: {
            notificationId: item.rowId,
          },
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      } finally {
        this.getNotifications();
      }
    },
    go() {
      this.$router.push({ name: "Notifications" });
    },
    goRoute(item) {
      this.$router.push({ name: item.path });
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    whatsapp() {
      this.apilink = "http://";
      this.apilink += this.isMobile() ? "api" : "web";
      this.newapilink =
        this.apilink +
        ".whatsapp.com/send?phone=" +
        this.$company_phone +
        "&text=";
      this.apilink +=
        ".whatsapp.com/send?phone=" + this.$company_phone + "&text=";
      this.$newapilinks = this.apilink;
    },
    ...mapActions({
      logOut: "Auth/logOut",
    }),
    logout() {
      this.logOut();
    },
    getYears(year) {
      moment.locale("es");
      return moment(year).fromNow();
    },
    showData(item) {
      return moment(item).format("YYYY-MM-DD - hh:mm:ss A");
    },

    async getNotifications() {
      // this.loadingNotifications=false
      var notification = await this.$apollo.query({
        query: GET_NOTIICATIONS,
        variables: { userId: this.$store.state.Auth.user.rowId },
        fetchPolicy: "no-cache",
      });

      this.notifications = notification.data.notifications.nodes;

      this.loadedDate = true;
      var cNotifications = await this.$apollo.query({
        query: COUNT_NOTIFICATIONS,
        variables: { userId: this.$store.state.Auth.user.rowId },
        fetchPolicy: "no-cache",
      });

      this.counNotifications = cNotifications.data.notifications.totalCount;
    },
  },
};
</script>
<style>
.clast-list {
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  offset-position: left;
}
@font-face {
  font-family: "Cereal";
  src: local("Cereal"), url(./fonts/AirbnbCereal_W_Lt.otf) format("truetype");
}

.my-application {
  font-family: Cereal;
}

@font-face {
  font-family: "Cerealbold";
  src: local("Cerealbold"),
    url(./fonts/AirbnbCereal_W_XBd.otf) format("truetype");
}

.my-application2 {
  font-family: Cerealbold;
}

@font-face {
  font-family: "Cerealbold2";
  src: local("Cerealbold2"),
    url(./fonts/AirbnbCereal_W_Bk.otf) format("truetype");
}

.my-application3 {
  font-family: Cerealbold3;
}

@font-face {
  font-family: "Cerealbold3";
  src: local("Cerealbold3"),
    url(./fonts/AirbnbCereal_W_Md.otf) format("truetype");
}

.my-application4 {
  font-family: Cerealbold4;
}

@font-face {
  font-family: "Cerealbold4";
  src: local("Cerealbold4"),
    url(./fonts/AirbnbCereal_W_Blk.otf) format("truetype");
}

.my-application5 {
  font-family: Cerealbold5;
}

@font-face {
  font-family: "Cerealbold5";
  src: local("Cerealbold5"),
    url(./fonts/AirbnbCereal_W_Blk.otf) format("truetype");
}
</style>
