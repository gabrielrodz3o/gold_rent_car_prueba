<template>
  <v-flex>
    <v-col cols="12" md="10" offset="1">
      <v-data-table
        :headers="headers"
        :items="provincies"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Provincias</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nueva Provincia
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
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
                    <v-row justify="center">
                      <v-col cols="12" sm="6" md="6">
                        <v-autocomplete
                          v-model="selectedProvincies"
                          :items="allProvincies"
                          color="cyanText"
                          return-object
                          label="Provinvias"
                          prepend-inner-icon="flight"
                          outlined
                          required
                        ></v-autocomplete>
                      </v-col>
                    </v-row>

                    <v-row justify="center">
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field
                          v-model="editedItem.amount"
                          type="number"
                          label="Monto de la provincia"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h5"
                  >Seguro que desea eliminar esta provincia?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.price`]="{ item }">
          <span>{{ item.amount }} {{ item.currency.code }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
      <!-- <v-data-table
        dense
        :headers="headers"
        :items="insurances"
        item-key="name"
        class="elevation-1 mt-4"
      >
        <template v-slot:[`item.price`]="{ item }">
          <span>{{ item.amount }} {{ item.currency.code }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" large color="blue" v-bind="attrs" v-on="on"
                >edit</v-icon
              >
            </template>
            <span>Editar</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" large color="red" v-bind="attrs" v-on="on"
                >delete</v-icon
              >
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </template>
      </v-data-table> -->
    </v-col>
  </v-flex>
</template>

<script>
import {
  CREATE_PROVINCIES,
  UPDATE_PROVINCIES,
  DELETE_PROVINCIES,
} from "../../gql/mutation";
import { GET_PROVINCIES } from "../../gql/queries";

export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: [],
      selectCurrencie: "",
      selectedProvincies: "",
      allProvincies: [],
      headers: [
        {
          align: "start",
          sortable: false,
          value: "province.name",
        },
        { text: "Amount", value: "price" },
        { text: "Actions", value: "actions", width: "15%" },
      ],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Provincia" : "Editar Provincia";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  props: {
    provincies: {
      type: Array,
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      this.allProvincies = [];
      var provincies = await this.$apollo.query({
        query: GET_PROVINCIES,
      });

      for (var item of provincies.data.provinces.nodes) {
        this.allProvincies.push({ text: item.name, value: item.rowId });
      }
    },
    editItem(item) {
      this.editedIndex = this.provincies.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.selectedProvincies = this.editedItem.province.rowId;
      this.selectCurrencie = this.editedItem.currency.rowId;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.provincies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        this.data = await this.$apollo.mutate({
          mutation: DELETE_PROVINCIES,
          variables: {
            companyId: this.$companie_id,
            provinceId: this.editedItem.provinceId,
          },
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      }
      this.$emit("refresh-data");
      this.selectedProvincies = "";
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.selectedProvincies = "";
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        var data = Object.assign(
          this.provincies[this.editedIndex],
          this.editedItem
        );

        try {
          this.data = await this.$apollo.mutate({
            mutation: UPDATE_PROVINCIES,
            variables: {
              companyId: this.$companie_id,
              provinceId: data.provinceId,
              amount: data.amount,

              currencyId: this.selectCurrencie,
            },
          });
        } catch (err) {
          this.$toast.error("A ocurrido un error " + err);
        }
      } else {
        try {
          this.data = await this.$apollo.mutate({
            mutation: CREATE_PROVINCIES,
            variables: {
              companyId: this.$companie_id,
              provinceId: this.selectedProvincies.value,
              amount: this.editedItem.amount,

              currencyId: this.selectCurrencie,
            },
          });
        } catch (err) {
          this.$toast.error("A ocurrido un error " + err);
        }
      }
      this.close();
      this.$emit("refresh-data");
    },
  },
};
</script>

<style></style>

<!-- <template>
  <v-flex>
    <v-col cols="12">
      <v-data-table
        dense
        :headers="headers"
        :items="provincies"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:[`item.price`]="{ item }">
          <span>{{ item.amount }} {{ item.currency.code }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" large color="blue" v-bind="attrs" v-on="on"
                >edit</v-icon
              >
            </template>
            <span>Editar</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="mr-2" large color="red" v-bind="attrs" v-on="on"
                >delete</v-icon
              >
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-col>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          align: "start",
          sortable: false,
          value: "province.name",
        },
        { text: "Amount", value: "price" },
        { text: "Actions", value: "actions", width: "15%" },
      ],
    };
  },
  props: {
    provincies: {
      type: Array,
    },
  },
  created() {
    //  this.getItems();
  },
};
</script>

<style></style> -->
