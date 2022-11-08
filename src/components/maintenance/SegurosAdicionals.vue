<template>
  <v-flex>
    <v-col cols="12" md="10" offset="1">
      <v-data-table
        :headers="headers"
        :items="additionalCoverages"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Seguros adicionales</v-toolbar-title>
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
                  Nuevo seguro Adicional
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
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nombre del seguro adicional"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field
                          v-model="editedItem.nameUs"
                          label="Nombre del seguro adicional ingles"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field
                          v-model="editedItem.price"
                          type="number"
                          label="Monto del seguro adicional"
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
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Seguro que desea eliminar este seguro
                  adicional?</v-card-title
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
        <template v-slot:[`item.amount`]="{ item }">
          <span>{{ item }} </span>
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
  CREATE_ADITIONAL_INSURANCES,
  UPDATE_ADITIONAL_INSURANCES,
  DELETE_ADITIONAL_INSURANCES,
} from "../../gql/mutation";
export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: [],
      selectCurrencie: "",
      headers: [
        {
          align: "start",
          sortable: false,
          value: "node.name",
        },
        { text: "amount", value: "node.price" },
        { text: "Actions", value: "actions", width: "15%" },
      ],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nuevo seguro adicional"
        : "Editar Seguro adicional";
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
    additionalCoverages: {
      type: Array,
    },
  },
  created() {
    //  this.getItems();
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.additionalCoverages.indexOf(item);
      this.editedItem = Object.assign({}, item.node);

      this.selectCurrencie = this.editedItem.currency.rowId;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.additionalCoverages.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        this.data = await this.$apollo.mutate({
          mutation: DELETE_ADITIONAL_INSURANCES,
          variables: {
            additionalCoverageId: this.editedItem.node.rowId,
          },
        });
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
      }
      this.$emit("refresh-data");
      this.closeDelete();
    },

    close() {
      this.dialog = false;
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
    // $additionalCoverageId: UUID!
    // $name: String!
    // $nameUs: String!
    // $price: BigFloat!
    // $currencyId: UUID!
    async save() {
      if (this.editedIndex > -1) {
        var data = Object.assign(
          this.additionalCoverages[this.editedIndex],
          this.editedItem
        );

        try {
          this.data = await this.$apollo.mutate({
            mutation: UPDATE_ADITIONAL_INSURANCES,

            variables: {
              additionalCoverageId: data.rowId,
              companyId: this.$companie_id,
              name: data.name,
              price: data.price,
              nameUs: data.nameUs,

              currencyId: this.selectCurrencie,
            },
          });
        } catch (err) {
          this.$toast.error("A ocurrido un error " + err);
        }
      } else {
        try {
          this.data = await this.$apollo.mutate({
            mutation: CREATE_ADITIONAL_INSURANCES,
            variables: {
              companyId: this.$companie_id,
              name: this.editedItem.name,
              nameUs: this.editedItem.nameUs,
              price: this.editedItem.price,
              currencyId: this.selectCurrencie,
            },
          });
        } catch (err) {
          this.$toast.error("A ocurrido un error " + err);
        }
        //this.insurances.push(this.editedItem);
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
        :items="additionalCoverages"
        item-key="name"
        class="elevation-1"
      >
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
          value: "node.name",
        },
        { text: "amount", value: "node.price" },
        { text: "Actions", value: "actions", width: "15%" },
      ],
    };
  },
  props: {
    additionalCoverages: {
      type: Array,
    },
  },
  created() {
    //  this.getItems();
  },
};
</script>

<style></style> -->
