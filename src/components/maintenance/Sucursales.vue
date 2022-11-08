<template>
  <v-flex>
    <v-col cols="12" md="10" offset="1">
      <v-data-table
        :headers="headers"
        :items="branches"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Sucursales</v-toolbar-title>
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
                  Nueva sucursal
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nombre de la sucursal"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="12" sm="6" md="8">
                        <v-textarea
                          v-model="editedItem.addressAdditionalDescription"
                          label="Descripcion de la sucursal"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="12" md="10">
                        <MapModalVue
                          style="height: 200px"
                          :coordinates="{
                            lat: editedItem.addressLatitude,
                            long: editedItem.addressLongitude,
                          }"
                        />
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
                  >Seguro que desea eliminar esta sucursal?</v-card-title
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
import MapModalVue from "@/components/MapModal.vue";
import {
  CREATE_BRANCH,
  UPDATE_BRANCH,
  DELETE_BRANCH,
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
          value: "name",
          text: "name",
        },
        { text: "locations", value: "addressAdditionalDescription" },
        { text: "Actions", value: "actions", width: "15%" },
      ],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo sucursal" : "Editar sucursal";
    },
  },
  components: { MapModalVue },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  props: {
    branches: {
      type: Array,
    },
  },
  created() {
    //  this.getItems();
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.branches.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.branches.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        this.data = await this.$apollo.mutate({
          mutation: DELETE_BRANCH,
          variables: {
            branchId: this.editedItem.rowId,
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

    async save() {
      if (this.editedIndex > -1) {
        var data = Object.assign(
          this.branches[this.editedIndex],
          this.editedItem
        );

        try {
          this.data = await this.$apollo.mutate({
            mutation: UPDATE_BRANCH,
            variables: {
              branchId: data.rowId,
              addressLongitude:
                data.addressLongitude == "" ? 0 : data.addressLongitude,
              addressLatitude:
                data.addressLatitude == "" ? 0 : data.addressLatitude,
              companyId: this.$companie_id,
              name: data.name,
              addressAdditionalDescription: data.addressAdditionalDescription,
            },
          });
        } catch (err) {
          this.$toast.error("A ocurrido un error " + err);
        }
      } else {
        try {
          //           $addressLongitude: BigFloat!
          // $addressLatitude: BigFloat!
          // $companyId: UUID!
          // $name: String!
          // $addressAdditionalDescription: String!

          this.data = await this.$apollo.mutate({
            mutation: CREATE_BRANCH,
            variables: {
              addressLongitude:
                this.editedItem.addressLongitude == ""
                  ? this.editedItem.addressLongitude
                  : 0,
              addressLatitude:
                this.editedItem.addressLatitude == ""
                  ? this.editedItem.addressLatitude
                  : 0,
              companyId: this.$companie_id,
              name: this.editedItem.name,
              addressAdditionalDescription:
                this.editedItem.addressAdditionalDescription,
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
        :items="branches"
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
          value: "name",
        },
        { text: "locations", value: "addressAdditionalDescription" },
        { text: "Actions", value: "actions", width: "15%" },
      ],
    };
  },
  props: {
    branches: {
      type: Array,
    },
  },
  created() {
    //  this.getItems();
  },
};
</script>

<style></style> -->
