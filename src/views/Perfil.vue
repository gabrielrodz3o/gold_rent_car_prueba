<template>
  <v-container align="center" justify="center" fill-height>
    <v-row align="center" justify="center">
      <div class="text-center">
        <h1 class="mb-2">Perfil</h1>
      </div>
    </v-row>
    <v-row v-if="Authentication" justify="center">
      <v-col cols="12" class="mt-0">
        <v-row justify="center">
          <v-card width="400">
            <v-img height="200px" src="../assets/cover.png">
              <v-app-bar class="mt-8" flat color="rgba(0, 0, 0, 0)">
                <v-avatar size="100">
                  <img alt="user" src="../assets/profile.png" />
                </v-avatar>

                <v-spacer></v-spacer>

                <v-menu offset-y left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" color="white" icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <!-- <v-list-item>
                      <v-list-item-title>Editar</v-list-item-title>
                    </v-list-item> -->
                  </v-list>
                </v-menu>
              </v-app-bar>

              <v-card-title class="white--text mt-8">
                <p class="ml-3">
                  {{ Authentication.user.firstname }}
                  {{ Authentication.user.lastname }}
                </p>
              </v-card-title>
            </v-img>

            <v-card-text>
              <div class="font-weight-bold ml-8 mb-2">Detalles</div>

              <v-list two-line>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary">phone </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      Authentication.user.phoneNumber
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary">whatsapp </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      Authentication.user.phoneNumber
                    }}</v-list-item-title>
                    <v-list-item-subtitle>chat</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary"> email </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      Authentication.user.email
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Email</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary"> badge </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      Authentication.user.driverLicense
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      >Licencia de conducir</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon>visibility</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary"> cake </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="Authentication.user.birthday"
                          label="Fecha de nacimiento"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="Authentication.user.birthday"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(Authentication.user.birthday)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu></v-list-item-content
                  >
                </v-list-item>

                <v-list-item>
                  <v-list-item-content aling="center">
                    <v-switch
                      v-model="Authentication.user.receivePromotion"
                      label="Acepto recibir notificaciones de promociones"
                    ></v-switch>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text> </v-card
        ></v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "my-perfil",
  data() {
    return {
      date: "",
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  created() {
    this.date = Authentication.user.birthday;
  },
  computed: {
    Authentication() {
      return this.$store.state.Auth;
    },
  },

  methods: {},
};
</script>
<style>
.bg-img {
  background-image: url("https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  border-radius: 3px;
}
</style>
