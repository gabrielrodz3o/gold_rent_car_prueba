<template>
  <v-flex>
    <v-progress-linear :value="e1 * 20"></v-progress-linear>
    <v-container fluid>
      <v-row justify="center" no-gutters>
        <v-col v-if="status == true" cols="12" md="5" lg="5">
          <v-row justify="center" class="pt-8">
            <v-card-title
              style="color: black; font-size: 2.3em"
              class="my-application3 text-center"
            >
              {{ datos.name }}
            </v-card-title>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-img class="rounded-lg" aspect-ratio="1" :src="datos.image">
              </v-img>
            </v-col>
            <v-col cols="12" md="8">
              <div v-if="e1 > 2">
                <v-timeline dense clipped>
                  <v-timeline-item>
                    <v-card class="elevation-2">
                      <v-card-title class="text-h6"> Recogida </v-card-title>
                      <v-card-text v-if="hasCompany" class="mt-n4">
                        <v-icon>apartment</v-icon>
                        {{ selectedBranche.text }}
                      </v-card-text>
                      <v-card-text v-if="hasLocation" class="mt-n4">
                        <v-icon>apartment</v-icon>
                        {{ selectedInitLocation.province }}
                      </v-card-text>
                      <v-card-text class="mt-n4" v-if="selectedAiportArrival">
                        <v-icon>flight</v-icon>
                        {{ selectedAiportArrival.text }}
                      </v-card-text>
                      <v-card-text class="mt-n8" v-if="selectedAirlineArrival">
                        <v-icon>airlines</v-icon>
                        {{ selectedAirlineArrival.text }}
                      </v-card-text>
                      <v-card-text class="mt-n8">
                        <v-icon>calendar_month</v-icon> {{ date }} -
                        {{ selectedTimeArrival.text }}
                      </v-card-text>
                    </v-card></v-timeline-item
                  >

                  <v-timeline-item>
                    <v-card class="elevation-2">
                      <v-card-title class="text-h6"> Devolucion </v-card-title>
                      <v-card-text v-if="hasLocation" class="mt-n4">
                        <v-icon>apartment</v-icon>
                        {{ selectedEndLocation.province }}
                      </v-card-text>
                      <v-card-text v-if="hasCompany" class="mt-n4">
                        <v-icon>apartment</v-icon>
                        {{ selectedBranche.text }}
                      </v-card-text>
                      <v-card-text
                        class="mt-n4"
                        v-if="selectedAiportDepartured"
                      >
                        <v-icon>flight</v-icon>
                        {{ selectedAiportDepartured.text }}
                      </v-card-text>
                      <v-card-text
                        class="mt-n8"
                        v-if="selectedAirlineDepartured"
                      >
                        <v-icon>airlines</v-icon>
                        {{ selectedAirlineDepartured.text }}
                      </v-card-text>
                      <v-card-text class="mt-n8">
                        <v-icon>calendar_month</v-icon> {{ date2 }} -
                        {{ selectedTimeDepartured.text }}
                      </v-card-text>
                    </v-card></v-timeline-item
                  >
                </v-timeline>
              </div>
            </v-col>
          </v-row>
          <v-row justify="start">
            <v-container>
              <span style="font-size: 20px" class="font-weight-bold"
                >Detalle de pago</span
              >
              <li class="pt-4">
                <b class="my-application3">
                  Reserva por {{ countDays }} dias (USD {{ datos.price }} x dia)
                </b>
                <b
                  class="my-application3"
                  :class="
                    supcriptions.length != 0
                      ? `text-decoration-line-through red--text`
                      : `black--text`
                  "
                >
                  {{ datos.price * countDays }}
                  USD</b
                >
                <template v-if="status == true">
                  <b v-if="supcriptions.length != 0" class="my-application3">
                    {{
                      applyDiscount(
                        datos.price * countDays,
                        supcriptions.subscription.dayDiscountPercent
                      )
                    }}
                    USD</b
                  >
                </template>
              </li>

              <li v-if="cargoServices.tot > 0">
                <b class="my-application3">Cargo por servicio </b>
                <b
                  :class="
                    supcriptions.length > 0
                      ? `text-decoration-line-through red--text`
                      : `black--text`
                  "
                  class="my-application3"
                  >{{ cargoServices.tot }} USD</b
                >
                <b v-if="supcriptions.length > 0" class="my-application3">
                  {{ cargoServices.totSupcriptions }} USD</b
                >
              </li>
              <li v-if="selectedInsurances.length > 0">
                <b class="my-application3"
                  >{{ selectedInsurances[0].name }} ({{
                    selectedInsurances[0].currency.code
                  }}
                  {{ selectedInsurances[0].amount }} x dia)
                  {{ selectedInsurances[0].amount * countDays }} USD</b
                >
              </li>
              <li v-for="(item, i) of selectedCoverages" :key="i">
                <b class="my-application3"> {{ item.name }} {{ item.price }}</b>
              </li>
              <li v-for="(item, i) of selectedrentalItems" :key="i">
                <b class="my-application3">
                  {{ item.name }}( {{ item.price }} x dia )
                  {{ item.amount * countDays }} USD</b
                >
              </li>
            </v-container>
          </v-row>
          <v-row class="px-4 my-application3" justify="start">
            <v-col cols="12" md="4">
              <v-text-field
                :class="
                  supcriptions.length != 0 ? `text-decoration-line-through` : ``
                "
                style="font-size: 18px"
                label="Total"
                prepend-inner-icon="attach_money"
                readonly
                :value="Total.toString() + ' USD'"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-if="supcriptions.length != 0"
                style="font-size: 18px"
                label="Total (Suscripcion)"
                prepend-inner-icon="attach_money"
                readonly
                :value="TotalWithSupcription.toString() + ' USD'"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters class="px-4 my-application3" justify="start">
          </v-row>
          <v-row v-if="e1 > 4" no-gutters justify="center">
            <v-spacer></v-spacer>
            <v-btn @click="e1 = 4" outlined text> Volver </v-btn>
            <v-spacer></v-spacer>
            <v-btn dark color="black" @click="save">
              <v-icon>send</v-icon> Confirmar
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>

        <v-col v-if="e1 < 5" cols="12" md="7" lg="7">
          <v-stepper class="elevation-0" v-model="e1">
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card elevation="0" class="mb-12" color="white" height="auto">
                  <v-row justify="center" no-gutters>
                    <span
                      style="color: black; font-size: 2.3em"
                      class="my-application3"
                    >
                      ¿Estas en el pais?
                    </span>
                  </v-row>

                  <v-row justify="center" no-gutters class="pt-4">
                    <v-card
                      width="300px"
                      height="200px"
                      @click="stepItem(1)"
                      class="rounded-xl"
                    >
                      <v-col cols="12" md="12">
                        <v-row no-gutters justify="center">
                          <v-icon color="primary" size="100px"> flag </v-icon>
                        </v-row>
                        <v-row justify="center" no-gutters>
                          <span class="my-application3">
                            Si, estoy en el pais?
                          </span>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-row>

                  <v-row justify="center" no-gutters class="pt-4">
                    <v-card
                      width="300px"
                      height="200px"
                      @click="stepItem(2)"
                      class="rounded-xl"
                    >
                      <v-col cols="12" md="12">
                        <v-row no-gutters justify="center">
                          <v-icon color="primary" size="100px"> flight </v-icon>
                        </v-row>
                        <v-row justify="center" no-gutters>
                          <span class="my-application3">
                            No, no estoy en el pais?
                          </span>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-row>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card
                  v-if="seletedInCountry == true"
                  elevation="0"
                  class="mb-12"
                  color="white"
                  height="auto"
                >
                  <v-row justify="center" no-gutters>
                    <span
                      style="color: black; font-size: 2.3em"
                      class="my-application3"
                    >
                      ¿Tienes vuelo de salida?
                    </span>
                  </v-row>

                  <v-row justify="center" no-gutters class="pt-4">
                    <v-card
                      width="300px"
                      height="200px"
                      @click="(hasTicketDeparture = true), (e1 = 3)"
                      class="rounded-xl"
                    >
                      <v-col cols="12" md="12">
                        <v-row no-gutters justify="center">
                          <v-icon color="primary" size="100px"> flight </v-icon>
                        </v-row>
                        <v-row justify="center" no-gutters>
                          <span class="my-application3">
                            Si, tengo vuelo de salida
                          </span>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-row>

                  <v-row justify="center" no-gutters class="pt-4">
                    <v-card
                      width="300px"
                      height="200px"
                      @click="(hasTicketDeparture = false), (e1 = 3)"
                      class="rounded-xl"
                    >
                      <v-col cols="12" md="12">
                        <v-row no-gutters justify="center">
                          <v-icon color="primary" size="100px">
                            shopping_bag
                          </v-icon>
                        </v-row>
                        <v-row justify="center" no-gutters>
                          <span class="my-application3">
                            No, no tengo vuelo de salida
                          </span>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-row>
                </v-card>
                <v-card
                  v-if="seletedInCountry == false"
                  elevation="0"
                  class="mb-12"
                  color="white"
                  height="auto"
                >
                  <v-row justify="center" no-gutters>
                    <span
                      style="color: black; font-size: 2em"
                      class="my-application3"
                    >
                      ¿Desea recibir en la compania?
                    </span>
                  </v-row>

                  <v-row justify="center" no-gutters class="pt-4">
                    <v-card
                      width="300px"
                      height="200px"
                      @click="(hasCompany = true), (e1 = 3)"
                      class="rounded-xl"
                    >
                      <v-col cols="12" md="12">
                        <v-row no-gutters justify="center">
                          <v-icon color="primary" size="100px">
                            apartment
                          </v-icon>
                        </v-row>
                        <v-row justify="center" no-gutters>
                          <span class="my-application3">
                            Si, quiero recibir en la compania
                          </span>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-row>

                  <v-row justify="center" no-gutters class="pt-4">
                    <v-card
                      width="300px"
                      height="200px"
                      @click="(hasLocation = true), (e1 = 3)"
                      class="rounded-xl"
                    >
                      <v-col cols="12" md="12">
                        <v-row no-gutters justify="center">
                          <v-icon color="primary" size="100px">
                            pin_drop
                          </v-icon>
                        </v-row>
                        <v-row justify="center" no-gutters>
                          <span class="my-application3 text-center">
                            No, quiero recibir en un lugar especifico
                          </span>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-row>
                </v-card>

                <v-row no-gutters justify="center">
                  <v-spacer></v-spacer>
                  <v-btn @click="e1 = 1" outlined text>
                    <v-icon size="30px"> arrow_back </v-icon> Volver
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                  style="height: 50vh; overflow-y: auto; overflow-x: hidden"
                  elevation="0"
                  class="mb-12"
                  color="white"
                  height="500px"
                >
                  <v-row justify="center" no-gutters>
                    <span
                      style="color: black; font-size: 1.5em"
                      class="my-application3"
                    >
                      Completa los campos
                    </span>
                  </v-row>
                  <v-row
                    v-if="hasCompany != true && hasLocation != true"
                    justify="center"
                  >
                    <v-col cols="12" md="4">
                      <v-autocomplete
                        v-model="selectedAiportArrival"
                        :items="airport"
                        color="cyanText"
                        return-object
                        label="Aeropuerto Llegada"
                        prepend-inner-icon="flight"
                        outlined
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-autocomplete
                        outlined
                        v-model="selectedAirlineArrival"
                        :items="airlines"
                        return-object
                        color="cyanText"
                        label="Aerolina Llegada"
                        prepend-inner-icon="airlines"
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="ticketLlegada"
                        label="Ticket de llegada"
                        prepend-inner-icon="airplane_ticket"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="hasLocation == true" justify="center">
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        v-model="selectedInitLocation"
                        :items="provinceInCompanies"
                        color="cyanText"
                        return-object
                        label="Lugar de entrega"
                        prepend-inner-icon="push_pin"
                        outlined
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        v-model="selectedEndLocation"
                        :items="provinceInCompanies"
                        color="cyanText"
                        return-object
                        label="Lugar de salida"
                        prepend-inner-icon="push_pin"
                        outlined
                        required
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row
                    v-if="hasTicketDeparture == true && hasCompany != true"
                    justify="center"
                  >
                    <v-col cols="12" md="4">
                      <v-autocomplete
                        v-model="selectedAiportDepartured"
                        :items="airport"
                        return-object
                        color="cyanText"
                        label="Aeropuerto Salida"
                        prepend-inner-icon="flight"
                        outlined
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-autocomplete
                        v-model="selectedAirlineDepartured"
                        :items="airlines"
                        return-object
                        color="cyanText"
                        label="Aeropuerto Salida"
                        prepend-inner-icon="airlines"
                        outlined
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="ticketSalida"
                        label="Ticket de salida"
                        prepend-inner-icon="airplane_ticket"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="hasCompany == true" justify="center">
                    <v-col cols="12" md="4">
                      <v-autocomplete
                        v-model="selectedBranche"
                        :items="branches"
                        return-object
                        color="cyanText"
                        label="Seleciona la sucursal"
                        prepend-inner-icon="apartment"
                        outlined
                        required
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row
                    v-if="e1 > 2"
                    no-gutters
                    justify="center"
                    align="center"
                  >
                    <v-col cols="12" md="3">
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-left="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Fecha recogida"
                            prepend-inner-icon="calendar_month"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          no-title
                          @change="
                            countDay(date2),
                              minDate(date),
                              (date2 = minDate(date))
                          "
                          :min="datenow.toString()"
                          :allowed-dates="allowedDates"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" md="3">
                      <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="10"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date2"
                            label="Fecha entrega"
                            prepend-inner-icon="calendar_month"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date2"
                          no-title
                          @change="countDay(date2)"
                          :min="minDate(date)"
                          :allowed-dates="allowedDates"
                          @input="menu1 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row class="mt-n6" no-gutterss justify="center">
                    <v-col cols="12" md="3">
                      <v-autocomplete
                        v-model="selectedTimeArrival"
                        :items="times"
                        return-object
                        color="cyanText"
                        label="Hora llegada"
                        prepend-inner-icon="timer"
                        outlined
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-autocomplete
                        v-model="selectedTimeDepartured"
                        :items="times"
                        return-object
                        color="cyanText"
                        label="Hora salida"
                        prepend-inner-icon="timer"
                        outlined
                        required
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row no-gutters justify="center">
                  <v-spacer></v-spacer>
                  <v-btn @click="restetE3()" outlined text> Atras </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn dark color="black" @click="checkE3()">
                    Siguiente
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-card elevation="0" class="mb-12" color="white" height="auto">
                  <v-container>
                    <v-row justify="center" no-gutters>
                      <span
                        style="color: black; font-size: 1.4em"
                        class="my-application3"
                      >
                        ¿Desea agregar algo mas?
                      </span>
                    </v-row>
                    <v-card elevation="0">
                      <v-card-title>
                        Seguros
                        <v-spacer></v-spacer>
                      </v-card-title>
                      <v-data-table
                        v-model="selectedInsurances"
                        :headers="headersInsurances"
                        :items="insurances"
                        :single-select="true"
                        item-key="name"
                        show-select
                        dense
                        hide-default-footer
                        hide-default-header
                        class="elevation-0"
                      >
                        <template v-slot:[`item.name`]="{ item }">
                          <v-icon>privacy_tip</v-icon> {{ item.name }}
                        </template>
                      </v-data-table>

                      <v-card-title> Coberturas </v-card-title>
                      <v-data-table
                        v-model="selectedCoverages"
                        :headers="headersCoverages"
                        :items="additionalCoverages"
                        :single-select="false"
                        item-key="name"
                        show-select
                        hide-default-footer
                        hide-default-header
                        class="elevation-0 pt-0"
                      >
                      </v-data-table>
                      <v-card-title> Acecesorios </v-card-title>
                      <v-data-table
                        v-if="loadingAcesorios"
                        :headers="headersRentalItems"
                        :items="rentalItems"
                        item-key="name"
                        hide-default-footer
                        hide-default-header
                        class="elevation-0 pt-0"
                      >
                        <template v-slot:[`item.name`]="{ item }">
                          <span
                            >{{ item.name }} <v-spacer></v-spacer>
                            {{ item.price }}</span
                          >
                        </template>
                        <template v-slot:[`item.icon`]>
                          <v-img
                            contain
                            max-width="30px"
                            max-height="30px"
                            src="../assets/baby-car-seat.png"
                          >
                          </v-img>
                        </template>

                        <template v-slot:[`item.quantity`]="{ item }">
                          <v-card-actions class="mx-2">
                            <v-btn @click="item.quantity--" outlined class="">
                              <v-icon color="black"> remove </v-icon>
                            </v-btn>

                            <strong class="mx-2">{{ item.quantity }}</strong>
                            <v-btn @click="item.quantity++" outlined class="">
                              <v-icon color="black">add </v-icon>
                            </v-btn>
                          </v-card-actions>
                        </template>
                      </v-data-table>
                    </v-card>
                  </v-container>
                </v-card>
                <v-row no-gutters justify="center">
                  <v-spacer></v-spacer>
                  <v-btn @click="e1 = 3" outlined text> Atras </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn dark color="black" @click="e1 = 5"> Siguiente </v-btn>
                  <v-spacer></v-spacer>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="5">
                <v-card elevation="0" class="mb-12" color="white" height="auto">
                  <v-row justify="center" no-gutters>
                    <span
                      style="color: black; font-size: 2.3em"
                      class="my-application3"
                    >
                      ¿En que aerpouerto te iras?
                    </span>
                  </v-row>

                  <v-row justify="center" no-gutters class="pt-4">
                    <v-list dense>
                      <v-list-item-group color="primary">
                        <v-list-item
                          @click="selectedAiportDepartured = item"
                          v-for="(item, i) in airport"
                          :key="i"
                        >
                          <v-list-item-icon>
                            <v-icon>airplane</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="item.text"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-row>
                </v-card>
                <v-row no-gutters justify="center">
                  <v-spacer></v-spacer>
                  <v-btn @click="e1 = 4" outlined text> Atras </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn dark color="black" @click="e1 = 6"> Siguiente </v-btn>
                  <v-spacer></v-spacer>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="6">
                <v-card elevation="0" class="mb-12" color="white" height="auto">
                  <v-row justify="center" no-gutters>
                    <span
                      style="color: black; font-size: 2.3em"
                      class="my-application3"
                    >
                      ¿En que aerolina te iras?
                    </span>
                  </v-row>

                  <v-row justify="center" no-gutters class="pt-4">
                    <v-list
                      dense
                      style="height: 60vh; overflow-y: auto; overflow-x: hidden"
                    >
                      <v-list-item-group color="primary">
                        <v-list-item
                          @click="selectedAirlineDepartured = item"
                          v-for="(item, i) in airlines"
                          :key="i"
                        >
                          <v-list-item-icon>
                            <v-icon>airplane</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="item.text"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-row>
                </v-card>
                <v-row no-gutters justify="center">
                  <v-spacer></v-spacer>
                  <v-btn @click="e1 = 5" outlined text> Atras </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn dark color="black" @click="e1 = 7"> Siguiente </v-btn>
                  <v-spacer></v-spacer>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step="7">
                <v-card
                  elevation="0"
                  class="mb-12"
                  color="white"
                  height="400px"
                >
                  <v-row justify="center" no-gutters>
                    <span
                      style="color: black; font-size: 2.3em"
                      class="my-application3"
                    >
                      ¿Elije tu fechas?
                    </span>
                  </v-row>

                  <v-row justify="center" no-gutters class="pt-4">
                    <v-col cols="12" md="3">
                      <v-menu
                        v-model="dateArrival"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Fecha llegada"
                            prepend-icon="calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          @input="dateArrival = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-menu
                        ref="ManuTimeArrival"
                        v-model="ManuTimeArrival"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="timeArrival"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="timeArrival"
                            label="Hora llegada"
                            prepend-icon="clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="ManuTimeArrival"
                          v-model="timeArrival"
                          landscape
                          scrollable
                          format="ampm"
                          @click:minute="
                            $refs.ManuTimeArrival.save(timeArrival)
                          "
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row justify="center" no-gutters class="pt-4">
                    <v-col cols="12" md="3">
                      <v-menu
                        v-model="dateDepartured"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date2"
                            label="Fecha salida"
                            prepend-icon="calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date2"
                          @input="dateDepartured = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-menu
                        ref="ManuTimeDepartured"
                        v-model="ManuTimeDepartured"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="timeDepartured"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="timeDepartured"
                            label="Hora salida"
                            prepend-icon="clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="ManuTimeDepartured"
                          v-model="timeDepartured"
                          landscape
                          scrollable
                          format="ampm"
                          @click:minute="
                            $refs.ManuTimeDepartured.save(timeDepartured)
                          "
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row no-gutters justify="center">
                  <v-spacer></v-spacer>
                  <v-btn @click="e1 = 6" outlined text> Atras </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn dark color="black" @click="e1 = 8"> Siguiente </v-btn>
                  <v-spacer></v-spacer>
                </v-row>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </v-flex>
</template>
<script>
import moment from "moment";

import { GET_REQUERIMENT_FOR_RENT } from "./../gql/queries";
import { RESERVE_VEHICLE } from "./../gql/mutation";

export default {
  name: "My-Reserva",

  props: {
    datos: {
      type: Object,
    },
  },

  data() {
    return {
      loadingDatas: false,
      e1: 1,
      airport: [],
      airlines: [],
      branches: [],
      provinceInCompanies: [],
      insurances: [],
      additionalCoverages: [],
      rentalItems: [],
      settings: [],
      date2: "",
      picker: "",
      menu2: "",
      menu1: "",
      loadingAcesorios: true,
      headersRentalItems: [
        { text: "icon", value: "icon" },
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "name",
        },

        { text: "description", value: "description" },
        { text: "Cantidad", value: "quantity", sortable: false },
      ],
      headersInsurances: [
        {
          text: "name",

          value: "name",
          width: "50%",
        },
        { text: "price", value: "amount" },
      ],
      headersCoverages: [
        {
          text: "name",
          align: "start",

          value: "name",
          width: "60%",
        },
        { text: "price", value: "price", width: "20%" },
      ],

      times: [
        { value: "1", text: "12:00 AM" },
        { value: "2", text: "1:00 AM" },
        { value: "3", text: "2:00 AM" },
        { value: "4", text: "3:00 AM" },
        { value: "5", text: "4:00 AM" },
        { value: "6", text: "5:00 AM" },
        { value: "7", text: "6:00 AM" },
        { value: "8", text: "7:00 AM" },
        { value: "9", text: "8:00 AM" },
        { value: "10", text: "9:00 AM" },
        { value: "11", text: "10:00 AM" },
        { value: "12", text: "11:00 AM" },
        { value: "13", text: "1:00 PM" },
        { value: "14", text: "2:00 PM" },
        { value: "15", text: "3:00 PM" },
        { value: "16", text: "4:00 PM" },
        { value: "17", text: "5:00 PM" },
        { value: "18", text: "6:00 PM" },
        { value: "19", text: "7:00 PM" },
        { value: "20", text: "8:00 PM" },
        { value: "21", text: "9:00 PM" },
        { value: "22", text: "10:00 PM" },
        { value: "23", text: "11:00 PM" },
      ],
      el: ["2022-07-25", "2022-07-26"],
      time1: null,

      datenow: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      ManuTimeDepartured: false,

      ManuTimeArrival: false,
      timeDepartured: null,
      timeArrival: null,
      dateArrival: false,
      dateDepartured: false,
      seletedInCountry: null,
      selectedAiportArrival: "",
      selectedAirlineArrival: "",
      selectedAiportDepartured: "",
      selectedAirlineDepartured: "",
      selectedTimeArrival: "",
      selectedTimeDepartured: "",
      selectedBranche: [],
      selectedInitLocation: [],
      selectedEndLocation: [],
      selectedrentalItems: [],
      supcriptions: [],
      ticketLlegada: "",
      ticketSalida: "",
      countDays: "",
      selectedInsurances: [],
      selectedCoverages: [],
      hasTicketDeparture: false,
      hasCompany: false,
      hasLocation: false,
    };
  },
  watch: {
    date(val) {
      this.dateFormat = this.formatDate(this.date);
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    status() {
      this.loadingDatas = true;
      return this.loadingDatas;
    },
    cargoServices() {
      var selectedInitLocation = 0;
      var selectedEndLocation = 0;
      var totRentalItems = 0;
      var initProvince = 0;
      var endProvince = 0;
      var initAirport = 0;
      var endtAirport = 0;
      var discountSelectedAiportArrival = 0;
      var discountSelectedAiportDepartured = 0;
      var discountSelectedInitLocation = 0;
      var discountSelectedEndLocation = 0;

      if (this.supcriptions.length > 0) {
        for (var item of this.supcriptions.subscription.subscriptionWithAirports
          .nodes) {
          if (this.selectedAiportArrival != 0) {
            if (this.selectedAiportArrival.value == item.airport.rowId) {
              discountSelectedAiportArrival =
                item.percent * this.selectedAiportArrival.deliveryCharge;
            }
          }

          if (this.selectedAiportDepartured != 0) {
            if (this.selectedAiportDepartured.value == item.airport.rowId) {
              discountSelectedAiportDepartured =
                item.percent * this.selectedAiportDepartured.deliveryCharge;
            }
          }
        }
        for (var item of this.supcriptions.subscription
          .subscriptionWithProvinces.nodes) {
          if (this.selectedInitLocation != "") {
            if (this.selectedInitLocation.value == item.province.rowId) {
              discountSelectedInitLocation =
                item.percent * this.selectedInitLocation.amount;
            }
          }

          if (this.selectedEndLocation != "") {
            if (this.selectedEndLocation.value == item.province.rowId) {
              discountSelectedEndLocation =
                item.percent * this.selectedEndLocation.amount;
            }
          }
        }
      }

      initProvince =
        this.selectedInitLocation.length == 0
          ? 0
          : parseFloat(this.selectedInitLocation.amount);
      endProvince =
        this.selectedEndLocation.length == 0
          ? 0
          : parseFloat(this.selectedEndLocation.amount);

      initAirport =
        this.selectedAiportArrival.length == 0
          ? 0
          : parseFloat(this.selectedAiportArrival.deliveryCharge);
      endtAirport =
        this.selectedAiportDepartured.length == 0
          ? 0
          : parseFloat(this.selectedAiportDepartured.deliveryCharge);

      var tot = Math.round(
        initAirport + endtAirport + initProvince + endProvince
      );

      var totSupcriptions = Math.round(
        initAirport +
          endtAirport +
          initProvince +
          endProvince -
          (discountSelectedAiportArrival +
            discountSelectedAiportDepartured +
            discountSelectedEndLocation +
            discountSelectedInitLocation)
      );
      return { tot: tot, totSupcriptions: totSupcriptions };
    },
    TotalWithSupcription() {
      var price = this.datos.price * this.countDays;

      var amountWithDiscount = this.applyDiscount(
        price,
        this.supcriptions.subscription.dayDiscountPercent
      );

      var totCoverages = 0;
      var totInsurances = 0;
      var totRentalItems = 0;
      var initProvince = 0;
      var endProvince = 0;
      var initAirport = 0;
      var endtAirport = 0;
      var discountSelectedAiportArrival = 0;
      var discountSelectedAiportDepartured = 0;
      var discountSelectedInitLocation = 0;
      var discountSelectedEndLocation = 0;
      var discountAdditionalCoverange = 0;
      var discounrAditionalItems = 0;
      initAirport =
        this.selectedAiportArrival.length == 0
          ? 0
          : parseFloat(this.selectedAiportArrival.deliveryCharge);
      endtAirport =
        this.selectedAiportDepartured.length == 0
          ? 0
          : parseFloat(this.selectedAiportDepartured.deliveryCharge);

      initProvince =
        this.selectedInitLocation.length == 0
          ? 0
          : parseFloat(this.selectedInitLocation.amount);
      endProvince =
        this.selectedEndLocation.length == 0
          ? 0
          : parseFloat(this.selectedEndLocation.amount);

      this.selectedrentalItems = [];

      for (var item of this.selectedCoverages) {
        totCoverages = parseFloat(totCoverages) + parseFloat(item.amount);
        for (var items of this.supcriptions.subscription
          .subscriptionWithAdditionalCoverages.nodes) {
          if (item.rowId == items.additionalCoverange.rowId) {
            discountAdditionalCoverange += item.amount * items.percent;
          }
        }
      }

      for (var itemSelectedInsurances of this.selectedInsurances) {
        totInsurances =
          parseFloat(totInsurances) +
          parseFloat(itemSelectedInsurances.amount) * this.countDays;
      }

      for (var itemRentalItems of this.rentalItems) {
        if (itemRentalItems.quantity > 0) {
          //   this.selectedrentalItems.push(itemRentalItems);
          for (var item of this.supcriptions.subscription
            .subscriptionWithRentalItems.nodes) {
            if (itemRentalItems.rowId == item.rentalItem.rowId) {
              var amountWithDays = this.applyDiscount(
                itemRentalItems.amount * this.countDays,
                item.percent
              );

              discounrAditionalItems = discounrAditionalItems + amountWithDays;
            }
          }
          totRentalItems =
            (parseFloat(totRentalItems) +
              parseFloat(itemRentalItems.amount) * this.countDays) *
            itemRentalItems.quantity;
        }
      }

      if (this.supcriptions.length > 0) {
        for (var item of this.supcriptions.subscription.subscriptionWithAirports
          .nodes) {
          if (this.selectedAiportArrival != 0) {
            if (this.selectedAiportArrival.value == item.airport.rowId) {
              discountSelectedAiportArrival =
                item.percent * this.selectedAiportArrival.deliveryCharge;
            }
          }

          if (this.selectedAiportDepartured != 0) {
            if (this.selectedAiportDepartured.value == item.airport.rowId) {
              discountSelectedAiportDepartured =
                item.percent * this.selectedAiportDepartured.deliveryCharge;
            }
          }
        }
        for (var item of this.supcriptions.subscription
          .subscriptionWithProvinces.nodes) {
          if (this.selectedInitLocation != "") {
            if (this.selectedInitLocation.value == item.province.rowId) {
              discountSelectedInitLocation =
                item.percent * this.selectedInitLocation.amount;
            }
          }

          if (this.selectedEndLocation != "") {
            if (this.selectedEndLocation.value == item.province.rowId) {
              discountSelectedEndLocation =
                item.percent * this.selectedEndLocation.amount;
            }
          }
        }

        // for (var item of this.supcriptions.subscription
        //   .subscriptionWithAdditionalCoverages.nodes) {

        // }
      }
      var tot = Math.round(
        totCoverages +
          amountWithDiscount +
          totInsurances +
          totRentalItems +
          initProvince +
          endProvince +
          initAirport +
          endtAirport -
          (discountSelectedAiportArrival +
            discountSelectedAiportDepartured +
            discountSelectedEndLocation +
            discountSelectedInitLocation +
            discountAdditionalCoverange +
            discounrAditionalItems)
      );
      return tot;
    },
    Total() {
      var priceReserve = this.datos.price * this.countDays;
      var totCoverages = 0;
      var totInsurances = 0;
      var totRentalItems = 0;
      var initProvince = 0;
      var endProvince = 0;
      var initAirport = 0;
      var endtAirport = 0;

      initAirport =
        this.selectedAiportArrival.length == 0
          ? 0
          : parseFloat(this.selectedAiportArrival.deliveryCharge);
      endtAirport =
        this.selectedAiportDepartured.length == 0
          ? 0
          : parseFloat(this.selectedAiportDepartured.deliveryCharge);

      initProvince =
        this.selectedInitLocation.length == 0
          ? 0
          : parseFloat(this.selectedInitLocation.amount);
      endProvince =
        this.selectedEndLocation.length == 0
          ? 0
          : parseFloat(this.selectedEndLocation.amount);

      this.selectedrentalItems = [];

      for (var item of this.selectedCoverages) {
        totCoverages = parseFloat(totCoverages) + parseFloat(item.amount);
      }
      for (var itemSelectedInsurances of this.selectedInsurances) {
        totInsurances =
          parseFloat(totInsurances) +
          parseFloat(itemSelectedInsurances.amount) * this.countDays;
      }

      for (var itemRentalItems of this.rentalItems) {
        if (itemRentalItems.quantity > 0) {
          this.selectedrentalItems.push(itemRentalItems);

          totRentalItems =
            (parseFloat(totRentalItems) +
              parseFloat(itemRentalItems.amount) * this.countDays) *
            itemRentalItems.quantity;
        }
      }

      var tot = Math.round(
        totCoverages +
          priceReserve +
          totInsurances +
          totRentalItems +
          initProvince +
          endProvince +
          initAirport +
          endtAirport
      );
      return tot;
    },
  },
  filters: {
    date(date) {
      return new Intl.DateTimeFormat("en-US").format(date);
    },
  },
  created() {
    this.getData();
  },

  methods: {
    applyDiscount(amount, discount) {
      var percernDiscount = amount * discount;
      var priceReserve = amount - percernDiscount;
      return priceReserve;
    },
    addQuantity(item) {
      this.loadingAcesorios = false;

      for (var i = 0; i < this.rentalItems.length; i++) {
        if (this.rentalItems[i].rowId == item.rowId) {
          this.rentalItems[i].quantity = 6;
        }

        this.loadingAcesorios = true;
      }
    },
    async save() {
      var rentalItems = [];
      var coveragesItems = [];
      if (this.selectedrentalItems.length > 0) {
        for (var item of this.selectedrentalItems) {
          for (var i = 0; i < item.quantity; i++) {
            rentalItems.push(item.rowId);
          }
        }
      } else {
        rentalItems = [];
      }
      if (this.selectedCoverages.length > 0) {
        for (var items of this.selectedCoverages) {
          coveragesItems.push(items.rowId);
        }
      } else {
        coveragesItems = [];
      }

      var data = await this.$apollo.mutate({
        mutation: RESERVE_VEHICLE,
        variables: {
          companyId: this.$companie_id,
          vehicleId: this.datos.rowId,
          branchId: this.$branch_id,
          requestedBy: this.$store.state.Auth.user.rowId,
          fromDate: this.date,
          toDate: this.date2,
          fromTime: this.selectedTimeArrival.text,
          toTime: this.selectedTimeDepartured.text,
          fromProvince:
            this.selectedInitLocation.length == 0
              ? null
              : this.selectedInitLocation.value,
          toProvince:
            this.selectedEndLocation.length == 0
              ? null
              : this.selectedEndLocation.value,
          fromAirport: this.selectedAiportArrival.value,
          toAirport: this.selectedAiportDepartured.value,
          fromAirline: this.selectedAirlineArrival.value,
          toAirline: this.selectedAirlineDepartured.value,
          fromFlightNumber: this.ticketLlegada,
          toFlightNumber: this.ticketLlegada,
          insuranceId:
            this.selectedInsurances.length == 0
              ? null
              : this.selectedInsurances[0].rowId,
          subscriptionId:
            this.supcriptions.length != 0
              ? this.supcriptions.subscription.rowId
              : null,
          rentalItems: rentalItems,
          additionalCoverages: coveragesItems,
          additionalDrivers: [],
        },
      });

      this.$router.push({ name: "MyRenta" });
    },
    restetE3() {
      this.e1 = 2;
      this.hasCompany = false;
      this.hasLocation = false;
      this.hasTicketDeparture = false;

      this.selectedAiportArrival = "";
      this.selectedAirlineArrival = "";
      this.selectedAiportDepartured = "";
      this.selectedAirlineDepartured = "";
      this.selectedInitLocation = [];
      this.selectedEndLocation = [];
    },
    checkE3() {
      if (this.date2 == "") {
        this.$toast.warning("Elige la fecha final!");
        return;
      }
      if (this.selectedTimeDepartured == "") {
        this.$toast.warning("Elige la hora de recogida!");
        return;
      }
      if (this.selectedTimeArrival == "") {
        this.$toast.warning("Elige la hora de devolucion!");
        return;
      }
      if (this.hasCompany == true) {
        if (this.date2 == "") {
          this.$toast.warning("Elige la fecha final!");
          return;
        }
      }
      if (this.hasLocation == true) {
        if (this.selectedInitLocation == "") {
          this.$toast.warning("Elige el lugar de entrega!");
          return;
        }
        if (this.selectedEndLocation == "") {
          this.$toast.warning("Elige el lugar de devolucion!");
          return;
        }
      }
      if (this.seletedInCountry == true) {
        if (this.selectedAiportArrival == "") {
          this.$toast.warning("Elige el aeropuerto de recogida!");
          return;
        }
        if (this.selectedAirlineArrival == "") {
          this.$toast.warning("Elige la aerolina de recogida!");
          return;
        }

        if (this.ticketLlegada == "") {
          this.$toast.warning("Completa el ticket de llegada!");
          return;
        }

        if (this.hasTicketDeparture == true) {
          if (this.selectedAiportDepartured == "") {
            this.$toast.warning("Elige el aeropuerto de devolucion!");
            return;
          }
          if (this.selectedAirlineDepartured == "") {
            this.$toast.warning("Elige la aerolina de devolucion!");
            return;
          }
          if (this.ticketSalida == "") {
            this.$toast.warning("Completa el ticket de devolucion!");
            return;
          }
        }
      }
      this.e1 = 4;
    },
    countDay(date2) {
      var newDate = moment(date2).format("YYYY-MM-DD").toString();
      var a = moment(newDate); //now
      var b = moment(this.date);

      this.countDays = a.diff(b, "days");
    },
    minDate(date) {
      var newDate = moment(date)
        .add(this.settings[0].minimunRentalDays, "d")
        .format("YYYY-MM-DD")
        .toString();

      // this.countDay(newDate);

      return newDate;
    },

    async getData() {
      this.loadingDatas = false;

      var data = await this.$apollo.query({
        query: GET_REQUERIMENT_FOR_RENT,

        variables: {
          companyId: this.$companie_id,
          userId: this.$store.state.Auth.user.rowId,
          upToDate: moment().format("YYYY-MM-DD").toString(),
        },
        fetchPolicy: "no-cache",
      });

      if (data.data.userWithSubscriptions.nodes.length == 0) {
        this.supcriptions = [];
      } else {
        this.supcriptions = data.data.userWithSubscriptions.nodes[0];
      }

      for (var itemAirports of data.data.airports.nodes) {
        this.airport.push({
          text: itemAirports.name,
          value: itemAirports.rowId,
          deliveryCharge: itemAirports.deliveryCharge,
        });
      }

      for (var itemsAirlines of data.data.airlines.nodes) {
        this.airlines.push({
          text: itemsAirlines.name,
          value: itemsAirlines.rowId,
        });
      }

      for (var itemsBranches of data.data.branches.nodes) {
        this.branches.push({
          text: itemsBranches.name,
          value: itemsBranches.rowId,
        });
      }

      for (var itemsProvinceInCompanies of data.data.provinceInCompanies
        .nodes) {
        this.provinceInCompanies.push({
          province: itemsProvinceInCompanies.province.name,
          text:
            itemsProvinceInCompanies.province.name +
            " " +
            itemsProvinceInCompanies.currency.code +
            " " +
            itemsProvinceInCompanies.amount,
          value: itemsProvinceInCompanies.province.rowId,
          amount: itemsProvinceInCompanies.amount,
        });
      }

      for (var itemsAdditionalCoverages of data.data.additionalCoverages
        .nodes) {
        this.additionalCoverages.push({
          rowId: itemsAdditionalCoverages.rowId,
          name: itemsAdditionalCoverages.name,
          price:
            itemsAdditionalCoverages.price +
            " " +
            itemsAdditionalCoverages.currency.code,
          value: itemsAdditionalCoverages.rowId,
          amount: itemsAdditionalCoverages.price,
        });
      }
      for (var itemsRentalItems of data.data.rentalItems.nodes) {
        this.rentalItems.push({
          rowId: itemsRentalItems.rowId,
          name: itemsRentalItems.name,
          price: itemsRentalItems.price + " " + itemsRentalItems.currency.code,
          amount: itemsRentalItems.price,
          value: itemsRentalItems.rowId,
          quantity: 0,
          icon: "child_friendly",
        });
      }

      this.settings = data.data.settings.nodes;

      this.selectedBranche = this.branches[0];
      this.insurances = data.data.insurances.nodes;
      this.loadingDatas = true;
    },
    stepItem(item) {
      if (item == 1) {
        this.seletedInCountry = false;
        this.e1 = 2;
      } else if (item == 2) {
        this.seletedInCountry = true;
        this.e1 = 2;
      }
    },
    allowedDates: (val) => ["2022-07-20", "2022-07-21"].indexOf(val) == -1,
    notBeforeToday(date) {
      return date;
    },
    onChange(e) {
      this.job = e;
      this.$emit("onChange", e);
    },
    dateFormat(classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() < new Date();
      }
      return classes;
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>
