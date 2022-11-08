<template>
  <v-flex>
    <v-card
      elevation="0"
      transition="dialog-bottom-transition"
      max-width="1000px"
    >
      <v-col cols="12" md="12" lg="12">
        <v-row justify="center" class="pt-0">
          <v-col cols="1"> </v-col>
          <v-col cols="10">
            <v-row justify="center">
              <v-card-title
                style="color: black; font-size: 2em"
                class="my-application3 text-center"
              >
                {{ items.vehicle.vehicleBrand.name }}
                {{ items.vehicle.vehicleModel.name }}
                {{ items.vehicle.year }}
              </v-card-title></v-row
            >
          </v-col>
          <v-col cols="1">
            <v-icon @click="closeDialog()" size="40px">close</v-icon>
          </v-col>
        </v-row>

        <v-row justify="center" class="mt-n4">
          <v-chip
            outlined
            class="ma-2"
            :color="getColor(items.rentalStates.nodes[0])"
          >
            {{ items.rentalStates.nodes[0].rentalStateType.name }}
            <!-- <span>{{ getData(item) }}</span> -->
          </v-chip>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <v-img
              class="rounded-lg"
              aspect-ratio="1"
              :src="items.vehicle.vehicleImages.nodes[0].imageUrl"
            >
            </v-img>
          </v-col>
          <v-col cols="12" md="8">
            <div class="mt-n5">
              <v-timeline reverse clipped>
                <v-timeline-item>
                  <v-card class="elevation-2">
                    <v-card-title class="text-h6"> Recogida </v-card-title>
                    <v-card-text
                      v-if="items.branch && items.airportByFromAirport == null"
                      class="mt-n4"
                    >
                      <v-icon>apartment</v-icon>
                      {{ items.branch.name }}
                    </v-card-text>
                    <v-card-text
                      v-if="items.provinceByFromProvince != null"
                      class="mt-n4"
                    >
                      <v-icon>apartment</v-icon>
                      {{ items.provinceByFromProvince.name }}
                    </v-card-text>
                    <v-card-text
                      v-if="items.airportByFromAirport != null"
                      class="mt-n4"
                    >
                      <v-icon>apartment</v-icon>
                      {{ items.airportByFromAirport.name }}
                    </v-card-text>

                    <v-card-text
                      class="mt-n4"
                      v-if="items.airlineByFromAirline != null"
                    >
                      <v-icon>flight</v-icon>
                      {{ items.airlineByFromAirline.name }}
                    </v-card-text>

                    <v-card-text class="mt-n8">
                      <v-icon>calendar_month</v-icon> {{ items.fromDate }} -
                      {{ items.fromTime }}
                    </v-card-text>
                  </v-card></v-timeline-item
                >

                <v-timeline-item class="mt-n10">
                  <v-card class="elevation-2">
                    <v-card-title class="text-h6"> Devolucion </v-card-title>
                    <v-card-text
                      v-if="items.branch && items.airportByToAirport == null"
                      class="mt-n4"
                    >
                      <v-icon>apartment</v-icon>
                      {{ items.branch.name }}
                    </v-card-text>
                    <v-card-text
                      v-if="items.provinceByToProvince != null"
                      class="mt-n4"
                    >
                      <v-icon>apartment</v-icon>
                      {{ items.provinceByToProvince.name }}
                    </v-card-text>
                    <v-card-text class="mt-n4" v-if="items.airportByToAirport">
                      <v-icon>flight</v-icon>
                      {{ items.airportByToAirport.name }}
                    </v-card-text>
                    <v-card-text class="mt-n8" v-if="items.airlineByToAirline">
                      <v-icon>airlines</v-icon>
                      {{ items.airlineByToAirline.name }}
                    </v-card-text>
                    <v-card-text class="mt-n8">
                      <v-icon>calendar_month</v-icon> {{ items.toDate }} -
                      {{ items.toTime }}
                    </v-card-text>
                  </v-card></v-timeline-item
                >
              </v-timeline>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-n4" justify="start">
          <v-col cols="12" md="6">
            <v-container>
              <span style="font-size: 20px" class="px-4 font-weight-bold"
                >Detalle de pago</span
              >
              <li class="pt-4">
                <b class="my-application3">
                  Reserva por {{ items.dayQuantity }} dias (
                  {{ items.rentalAmount }} USD )
                </b>
              </li>
              <li v-if="items.insurance" class="pt-0">
                <b class="my-application3"
                  >{{ items.insurance.name }} ({{
                    items.insurance.currency.code
                  }}
                  {{ items.insurance.amount }} x dia)
                  {{ items.insurance.amount * items.dayQuantity }} USD</b
                >
              </li>
              <template
                v-if="items.rentalWithAdditionalCoverages.nodes.length > 0"
              >
                <li
                  v-for="(item, i) of items.rentalWithAdditionalCoverages.nodes"
                  :key="i"
                  class="pt-0"
                >
                  <b class="my-application3">
                    {{ item.additionalCoverage.name }}
                    {{ item.additionalCoverage.price }}
                    {{ item.additionalCoverage.currency.code }}</b
                  >
                </li>
              </template>

              <template v-if="items.rentalWithItems.nodes.length > 0">
                <li
                  v-for="(item, i) of items.rentalWithItems.nodes"
                  :key="i"
                  class="pt-0"
                >
                  <b class="my-application3">
                    {{ item.rentalItem.name }} ( {{ item.rentalItem.price }} x
                    dia )
                    {{
                      item.rentalItem.price * items.dayQuantity * item.quantity
                    }}
                    USD</b
                  >
                </li>
              </template>
            </v-container>
          </v-col>
          <v-col cols="12" md="6">
            <v-container>
              <v-row class="mt-0">
                <span style="font-size: 20px" class="px-4 font-weight-bold"
                  >{{ items.userByRequestedBy.firstname }}
                  {{ items.userByRequestedBy.lastname }}
                  {{ getYears(items.userByRequestedBy.birthday) }} Años
                </span>
              </v-row>

              <v-row no-gutters class="mt-3">
                <v-col cols="12" md="1">
                  <v-icon size="30px" class="mt-2">mail</v-icon>
                </v-col>
                <v-col cols="12" md="11">
                  <v-row no-gutters>
                    <span style="font-size: 18px" class="px-4 font-weight-bold"
                      >Email del usuario
                    </span>
                  </v-row>
                  <v-row no-gutters>
                    <span class="px-4 font-weight-light">
                      {{ items.userByRequestedBy.email }}
                    </span>
                  </v-row>
                </v-col>
              </v-row>

              <v-row no-gutters class="mt-0">
                <v-col cols="12" md="1">
                  <v-icon size="30px" class="mt-2">call</v-icon>
                </v-col>
                <v-col cols="12" md="11">
                  <v-row no-gutters>
                    <span style="font-size: 18px" class="px-4 font-weight-bold"
                      >Numero de contacto
                    </span>
                  </v-row>
                  <v-row no-gutters>
                    <span class="px-4 font-weight-light">
                      {{ items.userByRequestedBy.phoneNumber }}
                    </span>
                  </v-row>
                </v-col>
              </v-row>
              <v-row no-gutters class="mt-0">
                <v-col cols="12" md="1">
                  <v-icon size="30px" class="mt-2">car_rental</v-icon>
                </v-col>
                <v-col cols="12" md="7">
                  <v-row no-gutters>
                    <span style="font-size: 18px" class="px-4 font-weight-bold"
                      >Licencia de conducir
                    </span>
                  </v-row>
                  <v-row no-gutters>
                    <span class="px-4 font-weight-light">
                      {{ items.userByRequestedBy.driverLicense }}
                    </span>
                  </v-row>
                </v-col>
                <v-col cols="12" md="1">
                  <v-row no-gutters>
                    <v-icon @click="showLicence = true" class="ml-n10 mt-3">
                      visibility
                    </v-icon>
                  </v-row>
                </v-col>
              </v-row>

              <v-row no-gutters class="mt-0">
                <v-col cols="12" md="1">
                  <v-icon size="30px" class="mt-2">chat_bubble</v-icon>
                </v-col>
                <v-col cols="12" md="11">
                  <v-row no-gutters>
                    <span style="font-size: 18px" class="px-4 font-weight-bold"
                      >Numero chat
                    </span>
                  </v-row>
                  <v-row no-gutters>
                    <span class="px-4 font-weight-light">
                      {{ items.userByRequestedBy.chatPhoneNumber }}
                    </span>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
        <v-row no-gutters class="px-4 my-application3" justify="center">
          <v-col cols="12" md="4">
            <v-text-field
              style="font-size: 24px"
              label="Total"
              prepend-inner-icon="attach_money"
              readonly
              :value="items.totalAmount.toString() + ' USD'"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- <v-row v-if="e1 > 4" no-gutters justify="center">
      <v-spacer></v-spacer>
      <v-btn @click="e1 = 4" outlined text> Volver </v-btn>
      <v-spacer></v-spacer>
      <v-btn dark color="black" @click="save">
        <v-icon>send</v-icon> Confirmar
      </v-btn>
      <v-spacer></v-spacer>
    </v-row> -->
      </v-col></v-card
    >
    <v-dialog v-model="showLicence" width="600px">
      <v-card width="auto" height="auto">
        <v-img aspect-ratio="1" :src="items.userByRequestedBy.licensePhotoUrl">
        </v-img>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      showLicence: false,
    };
  },
  props: {
    items: {
      type: Object,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    getColor(item) {
      if (
        item.rentalStateType.rowId == "e7640557-d6b3-4160-9306-33f36737be42"
      ) {
        return "orange";
      }
      if (
        item.rentalStateType.rowId == "5a8e53a5-a537-4c8c-8749-32a4619de80c"
      ) {
        return "blue";
      }

      if (
        item.rentalStateType.rowId == "297b4219-522c-4819-b9c5-4b2246051d5e"
      ) {
        return "red lighten-3";
      }

      if (
        item.rentalStateType.rowId == "f1357418-6331-414e-a5cd-dffd0555e473"
      ) {
        return "red accent-4";
      }
    },
    getYears(year) {
      var nacimiento = moment(year);
      var hoy = moment();
      var years = hoy.diff(nacimiento, "years");
      return years;
    },
  },
};
</script>

<style></style>
