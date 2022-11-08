<template>
  <v-container class="mt-n1" style="background-color: #fafafa" fluid>
    <v-row>
      <v-carousel height="auto" hide-delimiter-background cycle>
        <v-carousel-item
          v-for="(item, i) in items"
          :src="item.src"
          aspect-ratio="2.67"
          :key="i"
        >
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row style="">
      <v-layout
        style="opacity: 90%; margin-top: -400px"
        class=""
        align-center
        justify-end
        fill-height
      >
        <v-col cols="12" md="3">
          <v-row class="pr-16">
            <SearchCarsVue
              data-aos="fade-left"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration="500"
              :vehicleBrandes="vehiclesBrandes"
              :vehicleModels="vehicleModels"
              :type="2"
            />
          </v-row>
        </v-col>
      </v-layout>
    </v-row>

    <v-container fluid id="features" style="margin-top: 50px">
      <v-row align="center" justify="center">
        <v-col cols="12" md="8">
          <v-row align="center" justify="space-around">
            <v-col
              cols="12"
              md="4"
              class="text-center"
              v-for="(item, i) in articles"
              :key="i"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  width="100%"
                  height="180px"
                  class="rounded-lg"
                  :color="
                    item.icon == `mdi-calendar-month-outline`
                      ? `primary`
                      : `black `
                  "
                  :elevation="hover ? 10 : 4"
                  :class="{ up: hover }"
                >
                  <v-icon
                    size="50px"
                    color="white"
                    class="mt-5"
                    :class="{ 'zoom-efect': hover }"
                  >
                    {{ item.icon }}
                  </v-icon>

                  <h1 class="font-weight-regular white--text">
                    {{ item.title }}
                  </h1>
                  <h4 class="font-weight-regular subtitle-1 white--text">
                    {{ item.text }}
                  </h4>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-row
      data-aos="fade-up"
      data-aos-duration="800"
      class="mt-4"
      style="background-color: black"
      justify="center"
    >
      <v-col class="mt-n3 mb-6" cols="12" md="10">
        <v-card elevation="0">
          <v-row align="center">
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
                <v-row>
                  <span
                    style="font-size: 20px"
                    class="primary--text my-application2"
                    >{{ this.$t("home.a2.1") }}</span
                  >
                </v-row>

                <v-row class="mt-10">
                  <span
                    style="font-size: 30px"
                    class="black--text my-application2"
                    >{{ this.$t("home.a2.2") }}</span
                  >
                </v-row>
                <v-row class="mt-8">
                  <span
                    style="font-size: 20px"
                    class="black--text my-application"
                    >{{ this.$t("home.a2.3") }}</span
                  >
                </v-row>
              </v-container>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col cols="12" md="4">
              <v-img contain aspect-ratio="1" src="../assets/143.jpeg"> </v-img
            ></v-col>
            <v-col cols="12" md="4">
              <v-img contain aspect-ratio="1" src="../assets/144.jpeg"> </v-img>
            </v-col>
            <v-col cols="12" md="4">
              <v-img contain aspect-ratio="1" src="../assets/145.jpeg"> </v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-container fluid>
        <v-row justify="start" class="mt-10">
          <span
            style="font-size: 30px"
            class="text-center my-application4 pl-16"
            >{{ this.$t("home.vehiculoPopulares") }}
          </span>
        </v-row>
        <v-row justify="center" class="px-10">
          <ItemCard
            class="px-6"
            v-for="item in vehicles"
            :key="item.id"
            :item="item"
          />
        </v-row>
      </v-container>
    </v-row>

    <div class="pb-8">
      <v-parallax height="400" src="../assets/fondo/audi.jpg">
        <v-layout style="opacity: 90%" align-center justify-center>
          <span class="my-application3" style="font-size: 34px">
            Comunicate con nosotros available 24/7
          </span>
          <v-icon class="px-4" size="70px" color="red"> phone </v-icon>
          <span lass="my-application3" style="font-size: 40px">
            (800) 650 743</span
          >
        </v-layout></v-parallax
      >
    </div>

    <v-row justify="center" class="mt-8 pb-8">
      <v-container fluid>
        <v-row justify="center">
          <span class="my-application2 pb-4" style="font-size: 23px">{{
            this.$t("home.supcripciones")
          }}</span>
        </v-row>
        <v-row
          ><Supcriptions v-if="loading" :supcriptions="supcriptions" />
        </v-row>
      </v-container>
    </v-row>

    <v-row style="background-color: #1c1c1c; margin-bottom: 50px">
      <v-container>
        <v-row justify="center" style="margin-top: 50px">
          <span
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            class="primary--text my-application2"
            >GOLD RENT CAR
          </span>
        </v-row>

        <v-row justify="center" style="margin-top: 50px">
          <span
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            style="font-size: 42px"
            class="white--text my-application2"
            >{{ this.$t("home.a3.title") }}
          </span>
        </v-row>

        <v-row justify="center" class="mb-15 mt-10">
          <v-col
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="1000"
            cols="12"
            md="3"
            ><v-row justify="center">
              <v-icon dense size="50px" color="white">mdi-car </v-icon>
            </v-row>
            <v-row class="mt-8" justify="center">
              <span
                style="font-size: 24px"
                class="primary--text my-application2"
                >{{ this.$t("home.a3.1.name") }}
              </span>
            </v-row>
            <v-row class="mt-8" justify="center">
              <p
                style="font-size: 18px"
                class="white--text my-application text-center"
              >
                {{ this.$t("home.a3.1.details") }}
              </p>
            </v-row>
          </v-col>

          <v-col
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1000"
            cols="12"
            md="3"
            ><v-row justify="center">
              <v-icon
                dense
                size="50px"
                color="white"
                style="transform: rotate(90deg)"
              >
                flight
              </v-icon>
            </v-row>
            <v-row class="mt-8" justify="center">
              <span
                style="font-size: 24px"
                class="primary--text my-application2"
                >{{ this.$t("home.a3.2.name") }}
              </span>
            </v-row>
            <v-row class="mt-8" justify="center">
              <p
                style="font-size: 18px"
                class="white--text my-application text-center"
              >
                {{ this.$t("home.a3.2.details") }}
              </p>
            </v-row>
          </v-col>

          <v-col
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="1000"
            cols="12"
            md="3"
            ><v-row justify="center">
              <v-icon dense size="50px" color="white">mdi-face-agent</v-icon>
            </v-row>
            <v-row class="mt-8" justify="center">
              <span
                style="font-size: 24px"
                class="primary--text my-application2"
                >{{ this.$t("home.a3.3.name") }}
              </span>
            </v-row>
            <v-row class="mt-8" justify="center">
              <p
                style="font-size: 18px"
                class="white--text my-application text-center"
              >
                {{ this.$t("home.a3.3.details") }}
              </p>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <!-- <v-card
      flat
      color="#E2F2E5"
      class="rounded-xl mtop mbottom mx-10 pa-4"
      height="350"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="5">
          <v-card
            class="rounded-xl mt-n16 ml-16 mobile"
            outlined
            flat
            height="450"
            width="220"
          >
            <v-img src="../assets/phone.jpg"></v-img>
          </v-card>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="7">
          <h1 class="mt-16">Download App</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
            Provident sequi esse tempore maiores quasi quia non.<br />
            Itaque laboriosam dicta nostrum accusantium assumenda,<br />
            vitae ab ut vel tenetur minima natus commodi!
          </p>
          <v-btn color="black" dark class="mb-10">
            <v-icon color="white" left>apple</v-icon>
            App Store
          </v-btn>
          <v-btn color="black" dark class="ml-4 mb-10">
            <v-icon color="white" left>android</v-icon>
            Play Store
          </v-btn>
        </v-col>
      </v-row>
    </v-card> -->
  </v-container>
</template>
<script>
import ItemCard from "@/components/ItemCard";
import SearchCarsVue from "@/components/Search-Cars.vue";
import Supcriptions from "@/components/My-Supcriptions.vue";
import { GET_VEHICLES_POPULARS, GET_SUPCRIPTIONS } from "../gql/queries";
const json = require("../data/vehciles.json");
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    ItemCard,
    SearchCarsVue,
    Supcriptions,
  },
  data() {
    return {
      loading: false,
      vehicles: [],
      vehiclesBrandes: [],
      vehicleModels: [],
      paginado: json,
      supcriptions: [],

      items: [
        {
          marca: "Hyundai Tucson",
          src: require("../assets/fondo/audi.jpg"),
        },
        {
          marca: "Hyundai Tucson",
          src: require("../assets/fondo/mercedes-min.jpg"),
        },
        {
          marca: "Hyundai Tucson",
          src: "https://images.unsplash.com/photo-1571753823631-6b68326c7c19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
        {
          marca: "Highlander",
          src: "https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1079&q=80",
        },
      ],
    };
  },

  created() {
    this.getData();
  },
  computed: {
    articles() {
      var articles = [
        {
          img: require("@/assets/customer-support.png"),
          title: this.$t("home.a1.support"),
          text: this.$t("home.a1.support"),
          icon: "mdi-face-agent",
        },

        {
          img: require("@/assets/booking.png"),
          title: this.$t("home.a1.reservation"),
          text: localStorage.getItem("email"),
          icon: "mdi-calendar-month-outline",
        },
        {
          img: require("@/assets/location.png"),
          title: this.$t("home.a1.locations"),
          text: this.$t("home.a1.locations"),
          icon: "mdi-airplane-marker",
        },
      ];

      return articles;
    },
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    },
    async getData() {
      this.loading = false;
      this.vehiclesBrandes = JSON.parse(localStorage.getItem("VEHICLE_BRANDS"));
      this.vehicleModels = JSON.parse(localStorage.getItem("VEHICLE_MODELS"));
      var data2 = await this.$apollo.query({
        query: GET_SUPCRIPTIONS,
        variables: { companyId: this.$companie_id },
      });

      this.supcriptions = data2.data.subscriptions.nodes;
      var data = await this.$apollo.query({
        query: GET_VEHICLES_POPULARS,
        variables: { companyId: this.$companie_id, branchIds: this.$branch_id },
      });

      var datos = data.data.vehicles.nodes;

      for (var a = 0; a < datos.length; a++) {
        this.vehicles.push(datos[a]);

        // for (var items of datos[a].vehicles.nodes) {
        //   this.vehicles.push({
        //     rowId: items.rowId,
        //     isDeluxe: items.isDeluxe,
        //     basePrice: items.basePrice,

        //     tractionControlType: items.tractionControlType,
        //     vehicleAmenities: items.vehicleAmenities,
        //     vehicleColor: items.vehicleColor,
        //     vehicleNotAvailableDates: items.vehicleNotAvailableDates,
        //     vehicleSeating: items.vehicleSeating,
        //     branch: items.branch,
        //     currency: items.currency,
        //     vehicleImages: items.vehicleImages,
        //     vehicleBrand: items.vehicleBrand,
        //     vehicleModel: items.vehicleModel,
        //     year: items.year,
        //   });
        // }
      }
      this.loading = true;
    },
    async searchVehicles() {},
  },
};
</script>
<style lang="scss">
.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}

.playBut {
  /*  border: 1px solid red;*/
  display: inline-block;
  -webkit-transition: all 0.5s ease;

  .triangle {
    -webkit-transition: all 0.7s ease-in-out;
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
  }

  &:hover {
    .triangle {
      stroke-dashoffset: 0;
      opacity: 1;
      stroke: white;
      animation: nudge 0.7s ease-in-out;

      @keyframes nudge {
        0% {
          transform: translateX(0);
        }
        30% {
          transform: translateX(-5px);
        }
        50% {
          transform: translateX(5px);
        }
        70% {
          transform: translateX(-2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }

    .circle {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}
</style>

<style>
.btn-play {
  transition: 0.2s;
}

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

#hero {
  z-index: 0;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}

.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}

.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}

.card h1 {
  margin-bottom: 10px;
}

.zoom-efect {
  transform: scale(1.1);
}

.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
</style>

<style>
section {
  position: relative;
}
</style>
