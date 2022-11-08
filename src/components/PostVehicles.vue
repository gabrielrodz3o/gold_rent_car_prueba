<template>
  <v-flex>
    <v-row no-gutters>
      <v-progress-linear :value="e1 * 9"></v-progress-linear>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-stepper class="elevation-0" v-model="e1">
          <v-stepper-items>
            <v-stepper-content style="box-shadow: none" step="1">
              <v-card elevation="0" class="mb-12" color="white" height="500px">
                <v-row v-if="loadData" justify="center" no-gutters>
                  <v-col cols="12">
                    <v-row justify="center" no-gutters>
                      <span class="my-application3">
                        ¿Cuál es el tipo de vehículo?
                      </span>
                    </v-row>

                    <v-col
                      v-for="(item, i) in tipVehicles"
                      :key="i"
                      cols="12"
                      md="12"
                    >
                      <v-row no-gutters justify="center">
                        <v-card
                          @click="addTipVehicles(item)"
                          outlined
                          :style="
                            selectedTipVehicles.find(
                              (element) => element === item.rowId
                            )
                              ? 'border: 4px solid  rgb(0, 0, 0) ; border-radius: 10px;'
                              : ''
                          "
                          class="rounded-lg"
                          width="300"
                          height="auto"
                        >
                          <v-container fill-height>
                            <v-row justify="center" align="center">
                              <v-col cols="12" md="12" align="center">
                                <p
                                  class="my-application3"
                                  style="font-size: 20px"
                                >
                                  {{ item.name }}
                                  <v-icon size="30px">directions_car</v-icon>
                                </p>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
                      </v-row>
                    </v-col>
                  </v-col>
                </v-row>
                <v-row class="mt-8" justify="center" v-else>
                  <v-progress-circular
                    :size="170"
                    :width="7"
                    color="black"
                    indeterminate
                  ></v-progress-circular>
                </v-row>
              </v-card>

              <v-row no-gutters justify="center">
                <v-spacer></v-spacer>
                <v-btn outlined text> Atras </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="black" @click="nextTipVehicles()">
                  Siguiente
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card elevation="0" class="mb-12" color="white" height="500px">
                <v-row justify="center" no-gutters>
                  <v-col cols="12">
                    <v-row justify="center" no-gutters>
                      <span class="my-application3">
                        ¿Cuál es la marca de vehículo?
                      </span>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="12" md="4">
                        <v-text-field
                          class="text-xs-center"
                          v-model="searchBrands"
                          append-icon="search"
                          label="Buscar"
                          single-line
                          @keyup="searching"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-card
                      elevation="0"
                      style="height: 50vh; overflow-y: auto; overflow-x: hidden"
                    >
                      <v-col
                        v-for="(item, i) in newBrandsVehicles"
                        :key="i"
                        cols="12"
                        md="12"
                      >
                        <v-row no-gutters justify="center">
                          <v-card
                            @click="addBrandVehicles(item)"
                            :style="
                              item.rowId == selectedBranVehicles.rowId
                                ? 'border: 4px solid  rgb(0, 0, 0) ; border-radius: 10px;'
                                : ''
                            "
                            outlined
                            class="rounded-lg"
                            width="300"
                            height="auto"
                          >
                            <v-container fill-height>
                              <v-row justify="center" align="center">
                                <v-col cols="12" md="12" align="center">
                                  <p
                                    class="my-application3"
                                    style="font-size: 20px"
                                  >
                                    {{ item.name }}
                                    <v-icon size="30px">directions_car</v-icon>
                                  </p>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>

              <v-row no-gutters justify="center">
                <v-spacer></v-spacer>
                <v-btn @click="e1 = 1" outlined text> Atras </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="black" @click="nextBrandVehicles()">
                  Siguiente
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card elevation="0" class="mb-12" color="white" height="500px">
                <v-row justify="center" no-gutters>
                  <v-col cols="12">
                    <v-row justify="center" no-gutters>
                      <span class="my-application3">
                        ¿Cuál es el modelo del vehículo?
                      </span>
                    </v-row>

                    <v-card
                      elevation="0"
                      style="height: 50vh; overflow-y: auto; overflow-x: hidden"
                    >
                      <v-col
                        v-for="(item, i) in newModelVehicles"
                        :key="i"
                        cols="12"
                        md="12"
                      >
                        <v-row no-gutters justify="center">
                          <v-card
                            @click="addModelVehicles(item)"
                            :style="
                              item.rowId == selectedModelVehicles.rowId
                                ? 'border: 4px solid  rgb(0, 0, 0) ; border-radius: 10px;'
                                : ''
                            "
                            outlined
                            class="rounded-lg"
                            width="300"
                            height="auto"
                          >
                            <v-container fill-height>
                              <v-row justify="center" align="center">
                                <v-col cols="12" md="12" align="center">
                                  <p
                                    class="my-application3"
                                    style="font-size: 20px"
                                  >
                                    {{ item.name }}
                                    <v-icon size="30px">directions_car</v-icon>
                                  </p>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>

              <v-row no-gutters justify="center">
                <v-spacer></v-spacer>
                <v-btn @click="e1 = 2" outlined text> Atras </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="black" @click="nextModelVehicles()">
                  Siguiente
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card elevation="0" class="mb-12" color="white" height="500px">
                <v-row justify="center" no-gutters>
                  <v-col cols="12">
                    <v-row justify="center" no-gutters>
                      <span class="my-application3">
                        ¿Elige un tipo de combustible?
                      </span>
                    </v-row>

                    <v-card
                      elevation="0"
                      style="height: 50vh; overflow-y: auto; overflow-x: hidden"
                    >
                      <v-col
                        v-for="(item, i) in FuelTypeVehicles"
                        :key="i"
                        cols="12"
                        md="12"
                      >
                        <v-row no-gutters justify="center">
                          <v-card
                            @click="addFuelTypeVehicles(item)"
                            :style="
                              item.rowId == selectedFuelTypeVehicles.rowId
                                ? 'border: 4px solid  rgb(0, 0, 0) ; border-radius: 10px;'
                                : ''
                            "
                            outlined
                            class="rounded-lg"
                            width="400"
                            height="auto"
                          >
                            <v-container fill-height>
                              <v-row justify="center" align="center">
                                <v-col cols="12" md="12" align="center">
                                  <p
                                    class="my-application3"
                                    style="font-size: 20px"
                                  >
                                    {{ item.name }}
                                    <v-icon size="30px">directions_car</v-icon>
                                  </p>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>

              <v-row no-gutters justify="center">
                <v-spacer></v-spacer>
                <v-btn @click="e1 = 3" outlined text> Atras </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="black" @click="nextFuelTypeVehicles()">
                  Siguiente
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="5">
              <v-card elevation="0" class="mb-12" color="white" height="500px">
                <v-row justify="center" no-gutters>
                  <v-col cols="12">
                    <v-row justify="center" no-gutters>
                      <span class="my-application3">
                        ¿Elige tracion del vehiculo?
                      </span>
                    </v-row>

                    <v-card
                      elevation="0"
                      style="height: 50vh; overflow-y: auto; overflow-x: hidden"
                    >
                      <v-col
                        v-for="(item, i) in tracionVehicles"
                        :key="i"
                        cols="12"
                        md="12"
                      >
                        <v-row no-gutters justify="center">
                          <v-card
                            @click="addTracionnVehicles(item)"
                            :style="
                              item.rowId == selectedTracionVehicles.rowId
                                ? 'border: 4px solid  rgb(0, 0, 0) ; border-radius: 10px;'
                                : ''
                            "
                            outlined
                            class="rounded-lg"
                            width="400"
                            height="auto"
                          >
                            <v-container fill-height>
                              <v-row justify="center" align="center">
                                <v-col cols="12" md="12" align="center">
                                  <p
                                    class="my-application3"
                                    style="font-size: 20px"
                                  >
                                    {{ item.name }}
                                    <v-icon size="30px">directions_car</v-icon>
                                  </p>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>

              <v-row no-gutters justify="center">
                <v-spacer></v-spacer>
                <v-btn @click="e1 = 4" outlined text> Atras </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="black" @click="nextTracionVehicles()">
                  Siguiente
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="6">
              <v-card elevation="0" class="mb-12" color="white" height="500px">
                <v-row justify="center" no-gutters>
                  <v-col cols="12">
                    <v-row justify="center" no-gutters>
                      <span class="my-application3">
                        ¿Cual es el color del vehiculo?
                      </span>
                    </v-row>

                    <v-card
                      elevation="0"
                      style="height: 50vh; overflow-y: auto; overflow-x: hidden"
                    >
                      <v-col
                        v-for="(item, i) in colorVehicle"
                        :key="i"
                        cols="12"
                        md="12"
                      >
                        <v-row no-gutters justify="center">
                          <v-card
                            @click="addColorVehicles(item)"
                            :style="
                              item.rowId == selectedColorVehicles.rowId
                                ? 'border: 4px solid  rgb(0, 0, 0) ; border-radius: 10px;'
                                : ''
                            "
                            outlined
                            class="rounded-lg"
                            width="400"
                            height="auto"
                          >
                            <v-container fill-height>
                              <v-row justify="center" align="center">
                                <v-col cols="12" md="12" align="center">
                                  <p
                                    class="my-application3"
                                    style="font-size: 20px"
                                  >
                                    {{ item.name }}
                                    <v-icon size="30px">directions_car</v-icon>
                                  </p>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>

              <v-row no-gutters justify="center">
                <v-spacer></v-spacer>
                <v-btn @click="e1 = 5" outlined text> Atras </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="black" @click="nextColorVehicles()">
                  Siguiente
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="7">
              <v-card elevation="0" class="mb-12" color="white" height="500px">
                <v-row justify="center" no-gutters>
                  <v-col cols="12">
                    <v-row justify="center" no-gutters>
                      <span class="my-application3">
                        ¿Cuales son los accesorios del vehiculo?
                      </span>
                    </v-row>
                    <center>
                      <v-card
                        elevation="0"
                        style="
                          height: 500px;
                          overflow-y: auto;
                          overflow-x: hidden;
                        "
                      >
                        <v-row no-gutters justify="center">
                          <v-container>
                            <v-chip-group
                              v-model="selectedAmeneties"
                              column
                              multiple
                              active-class="primary--text"
                            >
                              <v-chip
                                v-for="(item, i) in amenitiesVehicles"
                                :key="i"
                                filter
                                outlined
                              >
                                {{ item.name }}
                              </v-chip>
                            </v-chip-group>
                          </v-container>
                        </v-row>
                      </v-card>
                    </center>
                  </v-col>
                </v-row>
              </v-card>

              <v-row no-gutters justify="center">
                <v-spacer></v-spacer>
                <v-btn @click="e1 = 6" outlined text> Atras </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="black" @click="nextAmenetiesVehicles()">
                  Siguiente
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="8">
              <v-card elevation="0" class="mb-12" color="white" height="500px">
                <v-row justify="center" no-gutters>
                  <v-col cols="12">
                    <v-row justify="center" no-gutters>
                      <span class="my-application3">
                        ¿Cual es el tipo de asiento?
                      </span>
                    </v-row>

                    <v-card
                      elevation="0"
                      style="height: 50vh; overflow-y: auto; overflow-x: hidden"
                    >
                      <v-col
                        v-for="(item, i) in vehicleSeatings"
                        :key="i"
                        cols="12"
                        md="12"
                      >
                        <v-row no-gutters justify="center">
                          <v-card
                            @click="addSeatingVehicles(item)"
                            :style="
                              item.rowId == selectedSeatingVehicles.rowId
                                ? 'border: 4px solid  rgb(0, 0, 0) ; border-radius: 10px;'
                                : ''
                            "
                            outlined
                            class="rounded-lg"
                            width="400"
                            height="auto"
                          >
                            <v-container fill-height>
                              <v-row justify="center" align="center">
                                <v-col cols="12" md="12" align="center">
                                  <p
                                    class="my-application3"
                                    style="font-size: 20px"
                                  >
                                    {{ item.name }}
                                    <v-icon size="30px">directions_car</v-icon>
                                  </p>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>

              <v-row no-gutters justify="center">
                <v-spacer></v-spacer>
                <v-btn @click="e1 = 7" outlined text> Atras </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="black" @click="nextSeatingVehicles()">
                  Siguiente
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="9">
              <v-card
                v-if="loadData"
                elevation="0"
                class="mb-12"
                color="white"
                height="500px"
              >
                <v-row justify="center" no-gutters>
                  <v-col cols="12">
                    <v-row justify="center" no-gutters>
                      <span class="my-application2">
                        Imagenes del vehiculo
                      </span>
                    </v-row>
                    <v-row justify="center" no-gutters>
                      <span class="my-application1"> Minimo 5 imagenes </span>
                    </v-row>

                    <div
                      style="
                        overflow-x: auto;
                        overflow-y: hidden; /* Hide vertical scrollbar */
                        overflow-x: hidden; /* Hide horizontal scrollbar */
                      "
                    >
                      <!-- <v-file-input
                        @change="selectFile"
                        multiple
                      style="    visibility: hidden;"
                        label="File input"
                      ></v-file-input> -->

                      <Container
                        @drop="onDrop"
                        orientation="horizontal"
                        behaviour="contain"
                      >
                        <Draggable
                          class="px-2"
                          v-for="(item, i) in items"
                          :key="item.id"
                        >
                          <div class="draggable-item-horizontal">
                            <v-img
                              class="rounded-lg"
                              style="cursor: move"
                              :src="item.path"
                              width="350px"
                              height="350px"
                            >
                              <div class="text-end">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                      v-bind="attrs"
                                      v-on="on"
                                      color="black"
                                      @click="deleteItem(item, i)"
                                      size="35px"
                                    >
                                      cancel
                                    </v-icon>
                                  </template>
                                  <span>Eliminar imagen</span>
                                </v-tooltip>
                              </div>
                              <v-layout
                                style="
                                  -webkit-transform: rotate(40deg);
                                  -moz-transform: rotate(40deg);
                                  -ms-transform: rotate(40deg);
                                  transform: rotate(45deg);
                                "
                                v-if="i == 0"
                                fill-height
                                align-center
                                justify-end
                                column
                              >
                                <div
                                  style="
                                    text-align: center;
                                    background-color: green;
                                    border-radius: 4;
                                    width: 250px;
                                  "
                                >
                                  <span
                                    class="tetx-center pr-10"
                                    style="color: white; font-size: 24px"
                                    >Portada</span
                                  >
                                </div>
                              </v-layout>
                            </v-img>
                          </div>
                        </Draggable>
                        <!-- <v-icon
                          size="250px"
                          @click="show"
                          ize="300px "
                          >mdi-file-image-plus</v-icon
                        > -->

                        <v-file-input
                          style="size: 100px"
                          id="fileinput"
                          @change="selectFile"
                          multiple
                          accept="image/png, image/jpeg"
                          hide-input
                          prepend-icon="photo_camera"
                        >
                        </v-file-input>
                      </Container>
                    </div>

                    <!-- <v-row no-gutters justify="center">
                      <vue-upload-multiple-image
                        @upload-success="uploadImageSuccess"
                        @before-remove="beforeRemove"
                        @edit-image="editImage"
                        dropText="ddd"
                        popupText="Esta es la imagen de portada"
                        markIsPrimaryText=""
                        primaryText="Portada"
                        browseText="Minimo 5"
                        dragText="Seleciona las imagenes"
                        :data-images="myImages"
                      ></vue-upload-multiple-image>
                    </v-row> -->
                  </v-col>
                </v-row>
              </v-card>

              <v-row no-gutters justify="center">
                <v-spacer></v-spacer>
                <v-btn @click="e1 = 8" outlined text> Atras </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="black" @click="nextImages()">
                  Siguiente
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="10">
              <v-card elevation="0" class="mb-12" color="white" height="500px">
                <v-row justify="center" no-gutters>
                  <v-col cols="12">
                    <v-row justify="center" no-gutters>
                      <span class="my-application2">
                        ¿Este vehiculo es deluxe?
                      </span>
                    </v-row>

                    <v-row justify="center" no-gutters>
                      <span class="my-application2">
                        <v-btn-toggle v-model="selectDeluxe" mandatory>
                          <v-btn :value="false"> NORMAL </v-btn>
                          <v-btn :value="true"> DELUXE </v-btn>
                        </v-btn-toggle>
                      </span>
                    </v-row>

                    <v-row class="pt-4" justify="center" no-gutters>
                      <span class="my-application2">
                        ¿En que moneda se realiza el precio?
                      </span>
                    </v-row>

                    <v-row justify="center" no-gutters>
                      <span class="my-application2">
                        <v-btn-toggle v-model="selectCurrencie" mandatory>
                          <v-btn value="51ab2049-6996-4cf1-8249-70211bf8c10e">
                            DOP
                          </v-btn>
                          <v-btn value="12dc055e-6c96-455f-9090-1f76c43b52c1">
                            USD
                          </v-btn>
                        </v-btn-toggle>
                      </span>
                    </v-row>

                    <v-row justify="center" no-gutters class="pt-4">
                      <span class="my-application2">
                        ¿Cuanto asiento tiene el vehiculo?
                      </span>
                    </v-row>

                    <v-row justify="center" no-gutters class="pt-10">
                      <v-col cols="12" md="4">
                        <v-slider
                          v-model="selectedSliderAsiento"
                          max="12"
                          thumb-label="always"
                        ></v-slider>
                      </v-col>
                    </v-row>
                    <v-row justify="center" no-gutters>
                      <span class="my-application2">
                        ¿Cuanto cuesta por dia?
                      </span>
                    </v-row>

                    <v-row justify="center" no-gutters>
                      <v-col cols="12" md="1">
                        <v-text-field
                          v-model="selectedPrice"
                          label="Precio"
                          type="number"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="center" no-gutters>
                      <span class="my-application2"> ¿Que año es? </span>
                    </v-row>
                    <v-row justify="center" no-gutters>
                      <v-col cols="12" md="1">
                        <v-autocomplete
                          :items="years"
                          v-model="selectedYear"
                          dense
                          filled
                          background-color="grey lighten-5"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>

              <v-row no-gutters justify="center">
                <v-spacer></v-spacer>
                <v-btn @click="e1 = 9" outlined text> Atras </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="black" @click="nextCurrenciesVehicles()">
                  Siguiente
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="11">
              <v-card elevation="0" color="white" height="450px">
                <v-row justify="center" no-gutters>
                  <span class="my-application2 mt-n0"> Vista previa </span>
                </v-row>
                <v-row justify="center" no-gutters>
                  <v-col cols="12">
                    <v-row justify="center">
                      <v-card-title
                        style="color: black; font-size: 2.3em"
                        class="my-application3 text-center"
                      >
                        {{ selectedBranVehicles.name }}

                        {{ selectedModelVehicles.name }}
                        {{ selectedYear }}
                      </v-card-title>
                    </v-row>

                    <v-row no-gutters justify="center" class="pt-0">
                      <span
                        style="color: black; font-size: 1em"
                        class="font-weight-black px-2"
                      >
                        {{ selectedCurrency.code }} {{ selectedPrice }} / dia
                      </span>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="12" md="12">
                        <v-row>
                          <!-- LADO IZQUIERDO -->
                          <v-col cols="12" md="6">
                            <v-row
                              justify="center"
                              align="center"
                              class="px-4 pt-2"
                            >
                              <v-col cols="12" md="12" sm="6">
                                <v-carousel
                                  max-height="600px"
                                  cycle
                                  hide-delimiter-background
                                >
                                  <v-carousel-item
                                    v-for="(item, i) in items"
                                    contain
                                    max-height="600px"
                                    width="auto"
                                    :src="item.path"
                                    :key="i"
                                  >
                                  </v-carousel-item>
                                </v-carousel>
                              </v-col>
                            </v-row>
                          </v-col>
                          <!-- LADO DERECHO -->
                          <v-col cols="12" md="6">
                            <v-row justify="start">
                              <span
                                style="color: black; font-size: 1.6em"
                                class="font-weight-bold px-2"
                              >
                                Informaciones generales
                              </span>
                            </v-row>
                            <v-row no-gutters class="pt-4">
                              <v-col
                                v-for="(details, i) in datailVehicles"
                                :key="i"
                                cols="12"
                                md="6"
                              >
                                <v-row justify="start">
                                  <v-col cols="12" md="6">
                                    <v-row no-gutters>
                                      <v-img
                                        contain
                                        class="pt-4"
                                        max-width="30px"
                                        max-height="30px"
                                        :src="
                                          require(`@/assets/iconsdetailscars/${details.url}`)
                                        "
                                      >
                                      </v-img>
                                      <span
                                        style="color: black; font-size: 1em"
                                        class="font-weight-black px-2"
                                      >
                                        {{ details.name }}:
                                      </span>
                                    </v-row>
                                  </v-col>

                                  <v-col cols="12" md="6" aling="end">
                                    <span
                                      style="color: black; font-size: 1em"
                                      class="font-weight-black px-2"
                                    >
                                      {{ details.description }}
                                    </span>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>

                            <v-row justify="start" class="pt-4">
                              <span
                                style="color: black; font-size: 1.6em"
                                class="font-weight-bold px-2"
                              >
                                Accesorios
                              </span>
                            </v-row>
                            <v-row no-gutters>
                              <v-col
                                v-for="(
                                  Amenities, indice
                                ) of itemSelectedAmeneties"
                                :key="indice"
                                cols="12"
                                md="4"
                              >
                                <v-row>
                                  <v-list-item-group>
                                    <v-list-item>
                                      <v-list-item-icon>
                                        <v-icon color="green"
                                          >mdi-checkbox-marked-circle</v-icon
                                        >
                                        <v-list-item-title>
                                          {{ Amenities.name }}
                                        </v-list-item-title>
                                      </v-list-item-icon>
                                    </v-list-item>
                                  </v-list-item-group>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>

              <v-row no-gutters justify="center" class="mt-n5">
                <v-spacer></v-spacer>
                <v-btn @click="e1 = 10" outlined text> Atras </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  dark
                  color="black"
                  @click="postVehicles()"
                >
                  Actualizar
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ textSnackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-flex>
</template>
<script>
import { Container, Draggable } from "vue-dndrop";
import { uuid } from "vue-uuid";
import firebase from "firebase/compat/app";

import "firebase/compat/storage";
import axios from "axios";
import { UPDATE_VEHICLES } from "../gql/mutation";
import { GET_VEHICLE_ALL_DATA } from "../gql/queries";
import { suppressDeprecationWarnings } from "moment";
export default {
  data() {
    return {
      loadData: false,
      e1: 1,
      file: null,
      isSelecting: false,
      selectCurrencie: "",
      selectDeluxe: false,
      myImages: [],
      myNewImages: [],
      imagesUploaded: [],
      loading: false,
      searchBrands: "",
      snackbar: false,
      textSnackbar: "",
      itemsCurrencies: [],
      tipVehicles: [],
      brandsVehicles: [],
      newBrandsVehicles: [],
      modelVehicles: [],
      newModelVehicles: [],
      FuelTypeVehicles: [],
      tracionVehicles: [],
      colorVehicle: [],
      amenitiesVehicles: [],
      vehicleSeatings: [],
      modelVehicles: [],
      selectedTipVehicles: "",
      selectedBranVehicles: "",
      selectedModelVehicles: "",
      selectedFuelTypeVehicles: "",
      selectedTracionVehicles: "",
      selectedColorVehicles: "",
      selectedSeatingVehicles: "",
      selectedAmeneties: [],
      itemSelectedAmeneties: [],
      itemSelectedAmenetiesPost: [],
      selectedSliderAsiento: 4,
      selectedCurrency: "",
      selectedPrice: null,
      selectedYear: "",
      datailVehicles: [],
      items: [],
      items2: [],
      base64: "",
      error: "",
      a: 0,
    };
  },
  props: {
    item: {
      type: Object,
    },
  },
  watch: {
    item(val) {
      this.clearData();
      this.getData();
    },
  },
  components: {
    Container,
    Draggable,
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loadData = false;
      var vehicles = await this.$apollo.query({
        query: GET_VEHICLE_ALL_DATA,
        variables: { companyId: this.$companie_id },
      });
      this.tipVehicles = [];

      this.tipVehicles = vehicles.data.vehicleTypes.nodes;

      this.vehcileId = vehicles.data;
      this.brandsVehicles = vehicles.data.vehicleBrands.nodes;
      this.newBrandsVehicles = this.brandsVehicles;
      this.vehicleModels = vehicles.data.vehicleModels.nodes;

      this.FuelTypeVehicles = vehicles.data.vehicleFuelTypes.nodes;
      this.tracionVehicles = vehicles.data.tractionControlTypes.nodes;
      this.colorVehicle = vehicles.data.vehicleColors.nodes;
      this.amenitiesVehicles = vehicles.data.amenities.nodes;
      for (var i = 0; i < this.amenitiesVehicles.length; i++) {
        for (var item of this.item.vehicleAmenities.nodes) {
          if (item.amenity.rowId == this.amenitiesVehicles[i].rowId) {
            this.selectedAmeneties.push(i);
          }
        }
      }
      this.generateBase64(this.item.vehicleImages.nodes);
      this.selectedSeatingVehicles = this.item.vehicleSeating;
      this.vehicleSeatings = vehicles.data.vehicleSeatings.nodes;
      this.itemsCurrencies = vehicles.data.currencies.nodes;
      var types = [];
      for (var item of this.item.vehicleWithTypes.nodes) {
        types.push(item.vehicleType.rowId);
      }
      this.selectedTipVehicles = types;
      this.selectedBranVehicles = this.item.vehicleBrand;
      this.searchBrands = this.item.vehicleBrand.name.toLowerCase();
      this.selectedModelVehicles = this.item.vehicleModel;
      this.selectedFuelTypeVehicles = this.item.fuelType;
      this.selectedTracionVehicles = this.item.tractionControlType;
      this.selectedColorVehicles = this.item.vehicleColor;
      this.selectDeluxe = this.item.isDeluxe;
      this.selectCurrencie = this.item.currency.rowId;
      this.selectedYear = this.item.year;
      this.selectedPrice = this.item.basePrice.replace(",", ".");

      this.searching();
      this.loadData = true;
    },
    clearData() {
      this.items = [];
      this.selectedAmeneties = [];
      this.selectedSeatingVehicles = [];
      this.vehicleSeatings = [];
      this.itemsCurrencies = [];
      this.selectedTipVehicles = [];
      this.selectedBranVehicles = [];
      this.searchBrands = "";
      this.selectedModelVehicles = [];
      this.selectedFuelTypeVehicles = [];
      this.selectedTracionVehicles = [];
      this.selectedColorVehicles = [];
      this.selectCurrencie = "";
      this.selectDeluxe = false;
    },
    async getBase64(url) {
      return axios
        .get(url, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          return (
            "data:image/jpeg;base64," +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then((data) => {
          return data;
        });
    },
    async generateBase64(items) {
      for (var item of items) {
        var image = await this.getBase64(item.imageUrl);

        this.a++;
        this.items.push({ id: this.a, path: image });
        this.onDrop({ id: this.a, path: image });
      }
    },
    async selectFile(files) {
      for (var item of files) {
        const promise = new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(item);
        });

        promise.then((item) => {
          this.a++;
          this.items.push({ id: this.a, path: item });
          this.onDrop({ id: this.a, path: item });
        });
      }
    },
    deleteItem(item, index) {
      this.items.splice(index, 1);
    },

    onDrop(dropResult) {
      this.items = this.applyDrag(this.items, dropResult);
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
    },

    async postVehicles() {
      this.loading = true;
      this.myNewImages = [];

      for (var item of this.items) {
        var uid = uuid.v1();
        var name = uid.toString() + ".jpg";

        this.myNewImages.push({
          name: name,
          path: item.path,
        });
      }

      try {
        var images = "";
        for (var items of this.myNewImages) {
          images = await this.uploadImages(items);

          this.imagesUploaded.push(images);
        }

        this.data = await this.$apollo.mutate({
          mutation: UPDATE_VEHICLES,
          variables: {
            vehicleId: this.item.rowId,
            branchId: this.$branch_id,
            vehicleTypeIds: this.selectedTipVehicles,
            vehicleBrandId: this.selectedBranVehicles.rowId,
            vehicleModelId: this.selectedModelVehicles.rowId,
            year: this.selectedYear,
            fuelTypeId: this.selectedFuelTypeVehicles.rowId,
            personQuantity: this.selectedSliderAsiento,
            tractionControlTypeId: this.selectedTracionVehicles.rowId,
            vehicleSeatingId: this.selectedSeatingVehicles.rowId,
            vehicleColorId: this.selectedColorVehicles.rowId,
            basePrice: this.selectedPrice,
            currencyId: this.item.currency.rowId,
            depositPercent: 1,
            isDeluxe: this.selectDeluxe,
            active: true,

            vehicleAmenities: this.itemSelectedAmenetiesPost,

            vehicleImages: [...this.imagesUploaded],
          },
        });

        this.$router.push(
          "/vehicles/" + this.data.data.updateAVehicle.vehicle.rowId
        );
      } catch (err) {
        this.snackbar = true;

        this.textSnackbar = "A ocurrido un error " + err;
        await this.deleteImg();
      }
      this.loading = false;
    },
    uploadImageSuccess(formData, index, fileList) {
      this.myImages = fileList;
    },
    beforeRemove(index, done, fileList) {
      done();
    },
    editImage(formData, index, fileList) {},
    searching() {
      if (this.searchBrands.length > 0) {
        this.newBrandsVehicles = this.searchInJson(
          this.newBrandsVehicles,
          this.searchBrands
        );
        this.newBrandsVehicles.length == 0
          ? (this.sinData = true)
          : (this.sinData = false);
      } else {
        this.newBrandsVehicles = this.brandsVehicles;
      }
    },
    searchInJson(json, value) {
      //aqui
      let resultados = [];
      if (value.length > 0) {
        json.forEach((j) => {
          let palabra = j.name.toLowerCase();

          if (palabra.includes(value.toLowerCase())) {
            resultados.push({
              rowId: j.rowId,
              name: j.name,
            });
          }
        });
        return resultados;
      }
    },
    async nextImages() {
      if (this.items.length < 5) {
        this.snackbar = true;
        this.textSnackbar = "Debes elegir mimino 5 imagenes";
        return;
      } else {
        this.e1 = 10;
      }
      // for (var item of this.myImages) {
      //   var uid = uuid.v1();
      //   var name = uid.toString() + ".jpg";

      //   this.myNewImages.push({
      //     name: name,
      //     path: item.path,
      //   });
      // }

      // for (var items of this.myNewImages) {
      // await this.uploadImages(items)

      // }
    },

    async uploadImages(item) {
      var storageRef = firebase.auth().app.storage().ref();
      var mountainsRef = storageRef.child(`vehicle_images/${item.name}`);
      var snapshot = await mountainsRef.putString(
        item.path.split("data:image/jpeg;base64,")[1],
        "base64",
        {
          contentType: "image/jpeg",
        }
      );
      var downloadURL = await snapshot.ref.getDownloadURL();

      return downloadURL;
    },
    async deleteImg() {
      for (var item of this.imagesUploaded) {
        let storageRef = firebase.auth().app.storage().ref();
        let desertRef = storageRef
          .child("vehicle_images")
          .storage.refFromURL(item);
        await desertRef.delete();
      }
    },
    addTipVehicles(item) {
      const resultado = this.selectedTipVehicles.find(
        (element) => element === item.rowId
      );

      if (resultado === undefined) {
        this.selectedTipVehicles.push(item.rowId);
      } else {
        this.selectedTipVehicles.splice(
          this.selectedTipVehicles.indexOf(item.rowId),
          1
        );
      }
    },
    nextTipVehicles() {
      if (this.selectedTipVehicles == "") {
        this.snackbar = true;
        this.textSnackbar = "Debes elegir un tipo de vehiculo";
        return;
      } else {
        this.e1 = 2;
      }
    },
    addBrandVehicles(item) {
      if (this.selectedBranVehicles.rowId == item.rowId) {
        this.selectedBranVehicles = "";
      } else {
        this.selectedBranVehicles = item;
      }
    },
    nextBrandVehicles() {
      if (this.selectedBranVehicles == "") {
        this.snackbar = true;
        this.textSnackbar = "Debes elegir una marca de vehiculo";
        return;
      } else {
        this.searchItemModel();
        this.e1 = 3;
      }
    },
    addModelVehicles(item) {
      if (this.selectedModelVehicles.rowId == item.rowId) {
        this.selectedModelVehicles = "";
      } else {
        this.selectedModelVehicles = item;
      }
    },
    nextModelVehicles() {
      if (this.selectedModelVehicles == "") {
        this.snackbar = true;
        this.textSnackbar = "Debes elegir una marca de vehiculo";
        return;
      } else {
        this.searchItemModel();
        this.e1 = 4;
      }
    },

    addFuelTypeVehicles(item) {
      if (this.selectedFuelTypeVehicles.rowId == item.rowId) {
        this.selectedFuelTypeVehicles = "";
      } else {
        this.selectedFuelTypeVehicles = item;
      }
    },
    nextFuelTypeVehicles() {
      if (this.selectedFuelTypeVehicles == "") {
        this.snackbar = true;
        this.textSnackbar = "Debes elegir una marca de vehiculo";
        return;
      } else {
        this.e1 = 5;
      }
    },

    addTracionnVehicles(item) {
      if (this.selectedTracionVehicles.rowId == item.rowId) {
        this.selectedTracionVehicles = "";
      } else {
        this.selectedTracionVehicles = item;
      }
    },
    nextTracionVehicles() {
      if (this.selectedTracionVehicles == "") {
        this.snackbar = true;
        this.textSnackbar = "Debes elegir una marca de vehiculo";
        return;
      } else {
        this.e1 = 6;
      }
    },
    addSeatingVehicles(item) {
      if (this.selectedSeatingVehicles.rowId == item.rowId) {
        this.selectedSeatingVehicles = "";
      } else {
        this.selectedSeatingVehicles = item;
      }
    },
    nextSeatingVehicles() {
      if (this.selectedSeatingVehicles == "") {
        this.snackbar = true;
        this.textSnackbar = "Debes elegir una marca de vehiculo";
        return;
      } else {
        this.e1 = 9;
      }
    },
    addColorVehicles(item) {
      if (this.selectedColorVehicles.rowId == item.rowId) {
        this.selectedColorVehicles = "";
      } else {
        this.selectedColorVehicles = item;
      }
    },
    nextColorVehicles() {
      if (this.selectedColorVehicles == "") {
        this.snackbar = true;
        this.textSnackbar = "Debes elegir una marca de vehiculo";
        return;
      } else {
        this.e1 = 7;
      }
    },
    nextCurrenciesVehicles() {
      if (this.selectedPrice == "" || this.selectedPrice == null) {
        this.snackbar = true;
        this.textSnackbar = "Debes elegir un precio";
        return;
      } else if (this.selectedYear == "") {
        this.snackbar = true;
        this.textSnackbar = "Debes elegir un year";
        return;
      } else {
        this.selectedCurrency = this.selectCurrencie;
        // if (this.selectCurrencie == 1) {
        //   this.selectedCurrency = this.itemsCurrencies[0];
        // }

        // if (this.selectCurrencie == 0) {
        //   this.selectedCurrency = this.itemsCurrencies[1];
        // }

        this.datailVehicles = [
          {
            name: "tipo",
            description: this.selectedTipVehicles.name,
            url: "tipo.png",
          },
          { name: "año ", description: this.selectedYear, url: "ano.png" },
          {
            name: "marca",
            description: this.selectedBranVehicles.name,
            url: "marca.png",
          },
          {
            name: "traccion",
            description: this.selectedTracionVehicles.name,
            url: "traccion.png",
          },
          {
            name: "modelo",
            description: this.selectedModelVehicles.name,
            url: "modelo.png",
          },
          {
            name: "combustible",
            description: this.selectedFuelTypeVehicles.name,
            url: "combustible.png",
          },

          {
            name: "color",
            description: this.selectedColorVehicles.name,
            url: "exterior-color.png",
          },

          {
            name: "asientos",
            description: this.selectedSliderAsiento,
            url: "pasajeros.png",
          },
        ];
        this.e1 = 11;
      }
    },
    nextAmenetiesVehicles() {
      this.itemSelectedAmenetiesPost = [];
      this.itemSelectedAmeneties = [];

      for (var i = 0; i < this.amenitiesVehicles.length; i++) {
        for (var a = 0; a < this.selectedAmeneties.length; a++) {
          if (this.selectedAmeneties[a] == i) {
            this.itemSelectedAmenetiesPost.push(
              this.amenitiesVehicles[i].rowId
            );
            this.itemSelectedAmeneties.push(this.amenitiesVehicles[i]);
          }
        }
      }
      this.e1 = 8;
    },
    searchItemModel() {
      this.newModelVehicles = [];

      for (var items of this.vehicleModels) {
        if (items.vehicleBrand.rowId == this.selectedBranVehicles.rowId) {
          this.newModelVehicles.push(items);
        }
      }
    },
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 2000 },
        (value, index) => 2001 + index
      );
    },
  },
};
</script>
<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}
.controls .title {
  align-self: flex-start;
  margin: 0 1rem;
}
.controls .buttons {
  align-self: flex-end;
  margin: 1rem;
}

.controls .actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 1rem;
}

.controls > div {
  padding-top: 1em;
}

.buttons,
.column-actions {
  display: flex;
  gap: 1rem;
}

.column-actions {
  justify-content: space-evenly;
}

.buttons .button {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-left: 5px solid #c4ebaf;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: border-color 0.2s linear;
}

.buttons .button.remove {
  border-left: 5px solid #dc3545;
}

.buttons .button.remove:disabled {
  border-left: 5px solid #e0e0e0;
}

.buttons .button.add {
  border-left: 5px solid #c4ebaf;
}

label {
  display: block;
  line-height: 1.6em;
}

.columns {
  display: flex;
  gap: 0.5rem;
  justify-content: stretch;
}

.column {
  flex: 1;
  border-radius: 6px;
  /* border: 1px solid #e0e0e0; */
}

.column {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.column .dndrop-container.vertical {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  cursor: pointer;
}
</style>
