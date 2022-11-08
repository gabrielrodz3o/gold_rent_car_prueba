<template>
  <v-dialog
    transition="dialog-bottom-transition"
    class="rounded-lg"
    v-model="show"
    width="500px"
  >
    <v-card>
      <v-col cols="12" class="pb-8">
        <v-row justify="center" class="pb-3">
          <v-col cols="12" md="1">
            <v-icon @click.stop="show = false">close </v-icon>
          </v-col>
          <v-col cols="12" md="10">
            <p class="text-center my-application3">{{ $t("login.header") }}</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="pt-10">
            <p class="text-center my-application4">{{ $t("login.welcome") }}</p>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12">
            <v-text-field
              :rules="emailRules"
              v-model="form.email"
              outlined
              label="Correo electrónico"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12">
            <v-text-field
              v-model="form.password"
              :rules="passwordRules"
              type="password"
              v-on:keyup.enter="Login()"
              class="mt-n6"
              outlined
              label="Password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" cl>
          <v-alert v-model="alert" color="red" outlined type="error">{{
            error
          }}</v-alert>
        </v-row>
        <v-row class="mt-n2" justify="center">
          <v-col cols="12">
            <v-btn
              :loading="loading"
              @click="Login()"
              style="text-transform: capitalize"
              large
              block
              color="primary"
            >
              {{ $t("login.btnLogin") }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- <v-row class="pt-4" justify="center">
          <v-col cols="12">
            <v-btn
              @click="loginFacebook"
              style="text-transform: capitalize"
              large
              block
              outlined
            >
              <v-icon color="blue darken-3">mdi-facebook </v-icon>
              <v-spacer></v-spacer>
              Continúa con Facebook
              <v-spacer></v-spacer>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-n1" justify="center">
          <v-col cols="12">
            <v-btn
              @click="loginGoogle"
              style="text-transform: capitalize"
              large
              block
              outlined
            >
              <v-icon color="red"> mdi-google </v-icon>
              <v-spacer></v-spacer>
              Continúa con Google
              <v-spacer></v-spacer>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-n1" justify="center">
          <v-col cols="12">
            <v-btn style="text-transform: capitalize" large block outlined>
              <v-icon dark> mdi-apple </v-icon>
              <v-spacer></v-spacer>
              Continúa con Apple
              <v-spacer></v-spacer>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-n1" justify="center">
          <v-col cols="12">
            <v-btn style="text-transform: capitalize" large block outlined>
              <v-icon> mail </v-icon>
              <v-spacer></v-spacer>
              Continúa con Correo Electrónico
              <v-spacer></v-spacer>
            </v-btn>
          </v-col>
        </v-row> -->
      </v-col>
    </v-card>
  </v-dialog>
</template>
<script>
// import * as firebase from "firebase/app";
// import "firebase/auth";
import { mapActions } from "vuex";
import firebase from "firebase/compat/app";
export default {
  props: {
    value: Boolean,
  },
  components: {
    //GoogleLogin
  },
  data() {
    return {
      errorCode: "",
      error: "",
      loading: false,
      alert: false,
      form: {
        apolloClient: this.$apollo,
        companyId: this.$companie_id,
        email: "",
        password: "",
      },
      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+/.test(v) || "E-mail Invalido",
      ],
      passwordRules: [
        (v) => !!v || "Password es requerido",
        (v) => (v && v.length >= 6) || "Minimo 6 Carateres",
      ],

      email: "",
      password: "",
      showModal: false,
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id: "xxxxxx",
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  computed: {
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
    }),
    Login() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          if (data.user.emailVerified == false) {
            this.error = "Unverified Email";
            this.alert = true;

            return;
          }
          var newDAta = {
            apolloClient: this.$apollo,
            companyId: this.$companie_id,
            email: data.user.email,
          };
          this.show = false;
          this.clear();
          this.loginUser(newDAta);
        })
        .catch((error) => {
          this.$toast.error("A ocurrido un error " + error);
          this.clear();
          this.errorCode = JSON.stringify(error);
          this.errorCode = JSON.parse(this.errorCode);
          this.alert = true;
          this.error = this.getMessageFromErrorCode();
        });
      this.loading = false;
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
    async loginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {})

        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },

    async loginFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {})
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },
    onSuccess(googleUser) {},
  },
};
</script>
