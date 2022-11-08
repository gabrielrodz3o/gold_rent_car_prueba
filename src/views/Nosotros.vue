<template>
  <v-flex class="mt-n1">
    <v-row>
      <v-img
        style="filter: brightness(50%)"
        width="100%"
        max-height="300px"
        src="../assets/fondo/mercedes-min.jpg"
      >
      </v-img>
    </v-row>
    <v-row justify="center" align="center">
      <v-layout justify-center style="margin-top: -300px; position: relative">
        <span
          data-aos="fade-left"
          data-aos-duration="1500"
          style="font-size: 60px"
          class="my-application4 white--text"
          >{{ $t("menuAppBar.nosotros") }}</span
        >
      </v-layout>
    </v-row>
    <v-row style="background-color: #f5f5f5">
      <v-col cols="12" md="8" offset="2" class="mt-14">
        <v-row align="center" justify="center">
          <v-col
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-delay="400"
            cols="12"
            md="6"
          >
            <v-img aspect-ratio="1" src="../assets/141.jpg"> </v-img>
          </v-col>

          <v-col
            data-aos="fade-left"
            data-aos-delay="400"
            data-aos-duration="800"
            cols="12"
            md="6"
          >
            <v-container>
              <v-row class="mt-10">
                <p style="font-size: 34px" class="black--text my-application2">
                  {{ $t("nosotros.1.1") }}
                </p>
              </v-row>
              <v-row class="mt-8">
                <p style="font-size: 20px" class="text-capitalize black--text">
                  {{ $t("nosotros.1.2") }}
                </p>
              </v-row>

              <v-row class="mt-8">
                <p style="font-size: 20px" class="text-capitalize black--text">
                  {{ $t("nosotros.1.2") }}
                </p>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-col></v-row
    >

    <v-col cols="12" md="8" offset="2" class="mt-14 mb-14">
      <v-row align="center" justify="center">
        <v-col
          data-aos="fade-left"
          data-aos-delay="400"
          data-aos-duration="800"
          cols="12"
          md="6"
        >
          <v-container>
            <v-row class="mt-10">
              <p style="font-size: 34px" class="black--text my-application2">
                {{ $t("nosotros.2.1") }}
              </p>
            </v-row>
            <v-row class="mt-8">
              <p style="font-size: 20px" class="text-capitalize black--text">
                {{ $t("nosotros.2.2") }}
              </p>
            </v-row>
          </v-container> </v-col
        ><v-col
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay="400"
          cols="12"
          md="6"
        >
          <v-img aspect-ratio="1" src="../assets/historia.jpg"> </v-img>
        </v-col>
      </v-row>
    </v-col>
    <v-row style="background-color: #f5f5f5">
      <v-col cols="12" md="8" offset="2" class="mt-14">
        <v-row align="center" justify="center">
          <v-col
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-delay="400"
            cols="12"
            md="6"
          >
            <v-img aspect-ratio="1" src="../assets/mision.jpg"> </v-img>
          </v-col>

          <v-col
            data-aos="fade-left"
            data-aos-delay="400"
            data-aos-duration="800"
            cols="12"
            md="6"
          >
            <v-container>
              <v-row class="mt-10">
                <p style="font-size: 34px" class="black--text my-application2">
                  {{ $t("nosotros.3.1") }}
                </p>
              </v-row>
              <v-row class="mt-8">
                <p style="font-size: 20px" class="text-capitalize black--text">
                  {{ $t("nosotros.3.2") }}
                </p>
              </v-row>

              <v-row class="mt-8">
                <p style="font-size: 20px" class="text-capitalize black--text">
                  {{ $t("nosotros.3.3") }}
                </p>
              </v-row>
              <v-row class="mt-8">
                <p style="font-size: 20px" class="text-capitalize black--text">
                  {{ $t("nosotros.3.4") }}
                </p>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-col></v-row
    >
  </v-flex>
</template>

<script>
export default {};
</script>

<style></style>
