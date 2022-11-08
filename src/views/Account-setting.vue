<template>
  <v-container fluid>
    <router-view></router-view>
    <v-flex xs12 sm6 offset-sm3 pt-13>
      <form>
        <v-layout column>
          <v-container>
            <v-row>
              <span class="my-application3 px-4" style="font-size: 30px"
                >Cuenta</span
              >
            </v-row>
            <v-row>
              <span class="my-application3 px-4" style="font-size: 20px"
                >{{ profile.user.firstname }},
              </span>
              <span class="my-application1" style="font-size: 20px">
                {{ profile.user.email }} .
              </span>
              <router-link
                :to="{ name: 'Perfil' }"
                class="my-application3"
                style="color: black; font-size: 20px"
              >
                Ir al perfil</router-link
              >
            </v-row>
            <v-row class="pt-12">
              <v-col
                v-for="(item, index) in items"
                :key="index"
                cols="12"
                md="4"
              >
                <v-card
                  @click="$router.push({ name: item.route })"
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
  </v-container>
</template>
<script>
export default {
  name: "my-perfil",
  data() {
    return {
      items: [
        {
          icon: "mdi-card-account-details-outline",
          name: "Datos personales",
          description: "Proporciona tu datos personales",
          route: "Perfil",
        },

        {
          icon: "mdi-bell-outline",
          name: "Notificaciones",
          description: "Notificaciones",
          route: "Notifications",
        },
      ],
    };
  },
  computed: {
    profile() {
      return this.$store.state.Auth;
    },
  },
};
</script>
