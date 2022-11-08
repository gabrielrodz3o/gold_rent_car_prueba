<template>
  <v-dialog
    transition="dialog-bottom-transition"
    class="rounded-lg"
    v-model="show"
    fullscreen
  >
    <v-card>
      <v-col cols="12" class="pb-8">
        <v-row no-gutters justify="center" class="pb-3">
          <v-col cols="12">
            <v-icon class="text-center" size="30px" @click.stop="notShow()">
              close
            </v-icon>
            <v-sapcer> </v-sapcer>

            <p class="text-center my-application3">Completa tu perfil</p>
            <v-sapcer> </v-sapcer>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="pt-6">
            <p class="text-center my-application4">Foto Licencia</p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <v-file-input
              label="Foto"
              filled
              @change="selectFile"
              prepend-icon="photo_camera"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" md="4" class="pt-2">
            <v-img v-if="image != ''" contain :src="image" aspect-ratio="1">
            </v-img>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" md="10">
            <v-row justify="center" cl>
              <v-alert v-model="alert" color="red" outlined type="error">{{
                error
              }}</v-alert>
            </v-row>
            <v-row class="mt-n2" justify="center">
              <v-col cols="12" md="4">
                <v-btn
                  @click="sendImage()"
                  style="text-transform: capitalize"
                  large
                  block
                  color="secondary"
                >
                  Enviar
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-dialog>
</template>
<script>
import { COMPLETE_USER } from "../../gql/mutation";

import { mapActions } from "vuex";
import { uuid } from "vue-uuid";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
export default {
  props: {
    value: Boolean,
  },
  components: {
    //GoogleLogin
  },
  data() {
    return {
      image: [],
      error: "",
      alert: false,
      getUrl: "",
    };
  },
  computed: {
    Authentication() {
      return this.$store.state;
    },
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    ...mapActions({
      loginUser: "Auth/loginUser",
      FormStatus: "Auth/FormStatus",
    }),
    notShow() {
      this.FormStatus(false);
      //this.show = false
    },
    async selectFile(files) {
      this.image = [];
      var item = files;

      const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(item);
      });

      promise.then((item) => {
        this.image = item;
      });
    },
    async uploadImagesFirebase(item) {
      var storageRef = firebase.auth().app.storage().ref();
      var mountainsRef = storageRef.child(`license_photos/${item.name}`);
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
    async sendImage() {
      if (this.image.length == 0) {
        return;
      }
      var uid = uuid.v1();
      var name = uid.toString() + ".jpg";
      var item = { name: name, path: this.image };

      try {
        this.getUrl = await this.uploadImagesFirebase(item);

        const promise = new Promise((resolve) => {
          resolve(this.getUrl);
        });

        promise.then((item) => {
          this.getUrl = item;

          this.image = null;
          this.show = false;
        });

        try {
          this.data = await this.$apollo.mutate({
            mutation: COMPLETE_USER,
            variables: {
              userId: JSON.parse(localStorage.getItem("user")).rowId,
              urlPhoto: this.getUrl,
            },
          });

          var newDAta = {
            apolloClient: this.$apollo,
            companyId: this.$companie_id,
            email: this.Authentication.Auth.user.email,
          };

          this.loginUser(newDAta);
          this.notShow();
        } catch (er) {
          this.$toast.error("A ocurrido un error " + err);
        }
      } catch (error) {
        this.notShow();
        this.$toast.error("A ocurrido un error " + err);
      }
    },
    getMessageFromErrorCode() {
      switch (this.errorCode.code) {
        case "ERROR_EMAIL_ALREADY_IN_USE":
        case "account-exists-with-different-credential":
        case "auth/email-already-in-use":
          return "Email already used. Go to login page.";
          break;
        case "ERROR_WRONG_PASSWORD":
        case "auth/weak-password":
          return "Complete password";
          break;
        case "ERROR_USER_NOT_FOUND":
        case "user-not-found":
          return "No user found with this email.";
          break;
        case "ERROR_USER_DISABLED":
        case "user-disabled":
          return "User disabled.";
          break;
        case "ERROR_TOO_MANY_REQUESTS":
        case "operation-not-allowed":
          return "Too many requests to log into this account.";
          break;
        case "ERROR_OPERATION_NOT_ALLOWED":
        case "operation-not-allowed":
          return "Server error, please try again later.";
          break;
        case "ERROR_INVALID_EMAIL":
        case "invalid-email":
          return "Email address is invalid.";
          break;
        default:
          return "Login failed. Please try again.";
          break;
      }
    },
    clear() {
      this.form.email = "";
      this.form.password = "";
    },
  },
};
</script>
