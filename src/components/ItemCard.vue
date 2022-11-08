<template>
  <v-col
    data-aos="fade-up"
    data-aos-duration="800"
    offset-md="0"
    sm="3"
    md="3"
    lg="3"
    xl="3"
  >
    <v-card class="pt-2 rounded-xl" elevation="0">
      <v-carousel
        :style="
          item.isDeluxe
            ? ' ;border: 8px solid  rgb(212, 175, 55) ; 	border-radius: 0.15rem; '
            : 'color:black'
        "
        height="auto"
        hide-delimiter-background
        class="rounded-xl"
      >
        <template v-if="maintenance == false">
          <v-carousel-item
            :to="`/vehicles/${item.rowId}`"
            v-for="(items, i) in item.vehicleImages.nodes"
            aspect-ratio="1.0"
            :src="items.imageUrl"
            :key="i"
          >
            <template v-slot:placeholder>
              <v-sheet>
                <v-skeleton-loader
                  class="mx-auto"
                  width="auto"
                  height="auto"
                  type="image,image"
                ></v-skeleton-loader>
              </v-sheet>
            </template>
            <div
              v-if="item.isDeluxe && maintenance == false"
              style=""
              class="pa-4 text-right"
            >
              <v-col cols="12" md="12">
                <v-row justify="end">
                  <div
                    class="pa-2 text-center rounded-xl"
                    style="background-color: #d4af37"
                  >
                    <span
                      style="font-size: 14px; border-radius: 0.6rem"
                      class="font-weight-bold text-center"
                    >
                      DELUXE</span
                    >
                  </div>
                </v-row>
              </v-col>
            </div>
          </v-carousel-item>
        </template>
        <template v-if="maintenance == true">
          <v-carousel-item
            v-for="(items, i) in item.vehicleImages.nodes"
            aspect-ratio="1.0"
            :src="items.imageUrl"
            :key="i"
          >
            <template v-slot:placeholder>
              <v-sheet>
                <v-skeleton-loader
                  class="mx-auto"
                  width="auto"
                  height="auto"
                  type="image,image"
                ></v-skeleton-loader>
              </v-sheet>
            </template>
            <div
              v-if="item.isDeluxe && maintenance == false"
              style=""
              class="pa-4 text-right"
            >
              <v-col cols="12" md="12">
                <v-row justify="end">
                  <div
                    class="pa-2 text-center rounded-xl"
                    style="background-color: #d4af37"
                  >
                    <span
                      style="font-size: 14px; border-radius: 0.6rem"
                      class="font-weight-bold text-center"
                    >
                      DELUXE</span
                    >
                  </div>
                </v-row>
              </v-col>
            </div>

            <div
              v-if="Authentication.user.isAdmin == true && maintenance == true"
              style=""
              class="text-right px-2 mt-n6 pt-1"
            >
              <v-col cols="12" md="12">
                <v-row justify="end">
                  <v-card
                    @click="show(item)"
                    color="primary"
                    class="mr-n6 rounded-xl"
                    height="100px"
                    width="100px"
                  >
                    <v-icon class="pt-10 mr-9" color="white" size="40px">
                      settings
                    </v-icon>
                  </v-card>
                </v-row>
              </v-col>
            </div>
          </v-carousel-item>
        </template>
      </v-carousel>

      <v-row justify="start" class="px-6 pt-4">
        <span
          style="color: gray; font-size: 24px"
          class="font-weight-bold text-center"
          >{{ item.vehicleBrand.name }} {{ item.vehicleModel.name }}
          {{ item.year }}</span
        >
      </v-row>
      <v-row class="px-6 pt-0">
        <span
          style="color: gray; font-size: 18px"
          class="font-weight-light text-center pt-0"
        >
          Pasajeros {{ item.personQuantity }}
        </span>
      </v-row>

      <v-row justify="start" class="px-6 pt-1 pb-4">
        <b> ${{ item.basePrice }}</b> / Dia
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "itemCard",
  data() {
    return {
      isLoad: false,
      isFavorite: false,
    };
  },
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
    maintenance: {
      type: Boolean,
    },
  },

  methods: {
    show(item) {
      this.$emit("show-edit", item);
    },
    async loaded() {
      this.isLoad = true;
    },
    next(i) {},
    load(item) {},
  },
  computed: {
    Authentication() {
      return this.$store.state.Auth;
    },
  },
};
</script>
<style scoped>
.img {
  object-fit: fill;
}
skeleton-loader-image-height {
  height: 200px;
}
.inner-img {
  transition: 0.3s;
}
.img-wrapper {
  overflow: hidden;
}

.inner-img:hover {
  transform: scale(1.1);
}
</style>
