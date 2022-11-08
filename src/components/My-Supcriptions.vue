<template>
  <v-row justify="center">
    <v-slide-group v-model="model" class="pa-2" center-active show-arrows>
      <v-slide-item v-for="(item, i) of newSupcriptions" :key="i">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 16 : 2"
            :color="i % 2 == 0 ? 'white' : ` primary`"
            class="ma-2"
            width="400px"
            height="500px"
            @click="(editeItem = item), (dialog = true)"
          >
            <v-row class="pt-4" justify="center">
              <v-card-title
                :class="hover ? 'black--text' : `primary--white`"
                class="mt-2"
              >
                <template v-if="$i18n.locale == `es`">
                  {{ item.name }}
                </template>
                <template v-if="$i18n.locale == `en`">
                  {{ item.nameEn }}
                </template>
              </v-card-title>
            </v-row>
            <v-row justify="center">
              <span
                :class="hover ? 'black--text' : `primary--white`"
                style="font-size: 30px"
                class="my-application2"
                >${{ item.price }} </span
              ><span
                :class="hover ? 'black--text' : `primary--white`"
                style="font-size: 14px"
                class="mt-4 my-application"
                >{{ item.currency.code }} /year</span
              >
            </v-row>

            <v-divider class="mt-5"></v-divider>

            <v-card-text>
              <div :class="hover ? 'black--text' : `primary--white`">
                {{ item.description }}
              </div>
            </v-card-text>

            <v-card-actions class="mt-4">
              <v-row justify="center">
                <v-btn
                  class="my-application2"
                  outlined
                  rounded
                  :color="hover ? ' black' : `black`"
                  text
                >
                  Suscríbete
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-slide-item>
    </v-slide-group>
    <v-dialog fullscreen v-model="dialog" transition="dialog-bottom-transition">
      <v-card color="">
        <v-toolbar elevation="0" color="white">
          <v-btn icon @click.native="dialog = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-center">{{
            editeItem.name
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>

        <v-row class="pt-4" justify="center" no-gutters>
          <span style="font-size: 20px" class="my-application3">
            Seleciona el tipo de pago
          </span>
        </v-row>
        <v-row no-gutters class="pt-4" justify="center">
          <v-col cols="12" md="6">
            <v-autocomplete
              outlined
              v-model="selectedPayment"
              :items="typePayments"
              prepend-inner-icon="payments"
              filled
              return-object
              background-color="grey lighten-5"
              label="Tipo de pago"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="12" md="6">
            <v-row justify="center">
              <v-btn color="primary" class="btn btn-info" @click="onPickFile">
                Seleciona la foto
              </v-btn>

              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="selectFile"
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row
          class="mt-10"
          v-if="viewImage == true"
          no-gutters
          justify="center"
        >
          <v-col cols="12" md="6">
            <v-row justify="center">
              <v-img
                v-for="(item, i) of itemsImages"
                :key="i"
                contain
                class="rounded-lg"
                :src="item.path"
                width="350px"
                max-height="500px"
              >
              </v-img>
            </v-row>
          </v-col>
        </v-row>

        <v-row
          v-if="itemsImages.length > 0"
          class="mt-8"
          justify="center"
          no-gutters
        >
          <v-col cols="12" md="6">
            <v-row justify="center">
              <v-btn :loading="loading" @click="sendPayment()" color="primary">
                <v-icon> send </v-icon>
                Enviar
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <!-- <Reserva :airport="airport" :airlines="airlines" /> -->
    </v-dialog>
  </v-row>
</template>

<script>
import { GET_PAYMENT_TYPES } from "../gql/queries";
import { MAKE_SUPCRIPTION_PAYMENTS } from "../gql/mutation";
import { uuid } from "vue-uuid";
import firebase from "firebase/compat/app";
import moment from "moment";
import "firebase/compat/storage";
export default {
  data() {
    return {
      loading: false,
      model: "",
      typePayments: [],
      itemsImages: [],
      myNewImages: [],
      newSupcriptions: [],
      payments: [],
      imagesUploaded: "",
      selectedPayment: "",
      editeItem: [],
      viewImage: false,
      dialog: false,
    };
  },
  computed: {},

  props: {
    supcriptions: {
      type: Array,
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    selectFile(files) {
      this.itemsImages = [];
      this.viewImage = false;
      for (var item of files.target.files) {
        const promise = new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(item);
        });

        promise.then((item) => {
          this.itemsImages.push({ path: item });
        });
      }
      this.viewImage = true;
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    async sendPayment() {
      if (this.itemsImages.length == 0) {
        return;
      }

      if (this.selectedPayment == "") {
        return;
      }
      this.loading = true;
      this.myNewImages = [];
      for (var item of this.itemsImages) {
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

          this.imagesUploaded = images;
        }

        var data = await this.$apollo.mutate({
          mutation: MAKE_SUPCRIPTION_PAYMENTS,
          variables: {
            userId: this.$store.state.Auth.user.rowId,
            subscriptionId: this.editeItem.rowId,
            rentalPaymentTypeId: this.selectedPayment.value,
            paymentPhotoUrl: this.imagesUploaded,
          },
        });

        this.clear();
        this.$toast.success(this.$t("succesSupcriptions"));
      } catch (err) {
        this.$toast.error("A ocurrido un error " + err);
        await this.deleteImg();
        this.clear();
      } finally {
        this.$emit("refresh-rent");
      }
      this.loading = false;
    },

    async getItems() {
      for (var item of this.supcriptions) {
        if (item.active == true) {
          this.newSupcriptions.push(item);
        }
      }
      var dataPayments = await this.$apollo.query({
        query: GET_PAYMENT_TYPES,
        variables: {
          companyId: this.$companie_id,
        },
      });

      for (var item of dataPayments.data.rentalPaymentTypes.nodes) {
        this.typePayments.push({ text: item.name, value: item.rowId });
      }
    },
    clear() {
      this.editeItem = [];
      this.selectedPayment = "";
      this.itemsImages = [];
      this.myNewImages = [];
      this.payments = [];
      this.imagesUploaded = "";
      this.dialog = false;
    },
    async uploadImages(item) {
      var storageRef = firebase.auth().app.storage().ref();
      var mountainsRef = storageRef.child(`deposit_photos/${item.name}`);
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
      let storageRef = firebase.auth().app.storage().ref();
      let desertRef = storageRef
        .child("vehicle_images")
        .storage.refFromURL(this.imagesUploaded);
      await desertRef.delete();
    },
  },
};
</script>

<style></style>
