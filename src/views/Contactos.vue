<template>
  <v-flex>
    <v-row>
      <v-img
        style="filter: brightness(50%)"
        width="100%"
        max-height="300px"
        src="../assets/fondo/mercedes-min.jpg"
      >
      </v-img>
    </v-row>
    <v-row class="mt-6" justify="center" align="center">
      <v-layout justify-center style="margin-top: -300px; position: relative">
        <span
          data-aos="fade-left"
          data-aos-duration="1500"
          style="font-size: 60px"
          class="my-application4 white--text"
          >{{ $t("menuAppBar.contactos") }}</span
        >
      </v-layout>
    </v-row>

    <v-container>
      <v-row no-gutters justify="center">
        <MapModalVue :coordinates="coordinates" />
      </v-row>

      <v-row style="margin-top: -550px" class="pr-16" no-gutters justify="end">
        <v-card elevation="6" outlined width="350px" height="450px">
          <v-row no-gutters justify="center">
            <span>{{ $t("menuAppBar.contactos") }}</span>
          </v-row>
          <v-row class="px-4" justify="center">
            <v-col cols="12" md="12">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Nombre"
                    placeholder="Su Nombre"
                    required
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Correo Eletronico"
                    placeholder="Su Correo Eletronico"
                    hide-details="auto"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="12">
                  <v-textarea>
                    <template v-slot:label>
                      <div>Mensaje <small>(opcional)</small></div>
                    </template>
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-row justify="center">
                    <v-btn outlined rounded x-large>Enviar</v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </v-flex>
</template>

<script>
import MapModalVue from "@/components/MapModal.vue";
export default {
  data() {
    return {
      coordinates: { lat: 19.386956, long: -70.608138 },
      hotel_id: 0,
      hotel_details: [],
      photos: [],
    };
  },
  components: {
    MapModalVue,
    //  HotelCardRating,
  },
};
</script>

<style></style>
