<template>
  <v-dialog
    transition="dialog-bottom-transition"
    class="rounded-lg"
    v-model="showRegister"
    width="500px"
  >
    <v-card>
      <v-col cols="12" class="pb-8">
        <v-row justify="center" class="pb-3">
          <v-col cols="12" md="1">
            <v-icon @click.stop="showRegister = false"> mdi-close </v-icon>
          </v-col>
          <v-col cols="12" md="10">
            <p class="text-center my-application3">
              {{ $t("register.header") }}
            </p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="mt-n6">
          <v-col cols="12" class="pt-10">
            <p class="text-center my-application4">
              {{ $t("register.welcome") }}
            </p>
          </v-col>
        </v-row>
        <v-form ref="form" lazy-validation>
          <v-row justify="center" class="mt-n8">
            <v-col cols="12">
              <v-text-field
                :rules="emailRules"
                v-model="form.email"
                outlined
                :label="$t(`email`)"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center" class="">
            <v-col cols="12">
              <v-text-field
                v-model="form.password"
                :rules="passwordRules"
                type="password"
                class="mt-n6"
                outlined
                :label="$t(`password`)"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center" class="mt-n8">
            <v-col cols="12" md="12">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.firstname"
                    :rules="nameRules"
                    outlined
                    :label="$t(`firstname`)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.lastname"
                    :rules="nameRules"
                    outlined
                    :label="$t(`lastname`)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" class="mt-n8">
            <v-col cols="12" md="12">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.phone"
                    outlined
                    :rules="phoneRules"
                    :label="$t(`phone`)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.celular"
                    :rules="phoneRules"
                    outlined
                    :label="$t(`mobile`)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" class="mt-n8">
            <v-col cols="12" md="12">
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="form.dni"
                    :rules="dniRules"
                    outlined
                    :label="$t(`dni`)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row justify="center" class="mt-n8">
            <v-col cols="12" md="12">
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        :label="$t(`birthday`)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="center" class="mt-n8">
          <v-checkbox
            v-model="aceptcondition"
            :label="$t(`register.terminos`)"
          ></v-checkbox>
        </v-row>
        <v-row justify="center" class="mt-n8">
          <v-checkbox
            v-model="form.recivenotification"
            :label="$t(`register.notificaciones`)"
          ></v-checkbox>
        </v-row>
        <v-row class="mt-n6" justify="center">
          <v-col cols="12">
            <v-btn
              @click="Register()"
              style="text-transform: capitalize"
              large
              :disabled="form.aceptcondition == false"
              block
              color="primary"
            >
              {{ $t("register.btnLogin") }}
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-alert v-model="alert" color="red" outlined type="error">{{
            error
          }}</v-alert>
        </v-row>

        <!-- <v-row class="mt-n1" justify="center">
          <v-col cols="12">
            <v-btn
              :disabled="aceptcondition == false"
              @click="loginGoogle"
              style="text-transform: capitalize"
              large
              block
              outlined
            >
              <v-icon color="red"> mdi-google </v-icon>
              <v-spacer></v-spacer>
              Registrarse con Google
              <v-spacer></v-spacer>
            </v-btn>
          </v-col>
        </v-row> -->
      </v-col>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";
import firebase from "firebase/compat/app";
export default {
  name: "My-Register",
  props: {
    value: Boolean,
  },
  components: {
    //GoogleLogin
  },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      newdata: [],
      nameRules: [(v) => !!v || "Nombre es requerido"],

      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+/.test(v) || "E-mail Invalido",
      ],
      passwordRules: [
        (v) => !!v || "Password es requerido",
        (v) => (v && v.length >= 6) || "Minimo 6 Carateres",
      ],
      phoneRules: [
        (v) => !!v || "Telefono es requerido",
        (v) => (v && v.length >= 10) || "Completa el telefono",
      ],
      dniRules: [
        (v) => !!v || "Licencia es requerida",
        (v) => (v && v.length >= 10) || "Completa el campo",
      ],
      form: {
        apolloClient: this.$apollo,
        companyId: this.$companie_id,
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
        celular: "",
        dni: "",

        recivenotification: false,
      },
      aceptcondition: false,

      alert: false,

      error: "",
      errorCode: "",

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
    showRegister: {
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
      regiterUser: "Auth/registerUser",
    }),

    async Register() {
      this.alert = false;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          var newData = {
            apolloClient: this.$apollo,
            companyId: this.$companie_id,
            email: data.user.email,
            password: "",
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            phone: this.form.phone,
            celular: this.form.celular,
            dni: this.form.dni,
            date: this.date,
            recivenotification: this.form.recivenotification,
          };
          const user = firebase.auth().currentUser;

          // send the signed in user a verification email
          user.sendEmailVerification();
          this.regiterUser(newData);
          this.clearForm();
          this.showRegister = false;
        })
        .catch((error) => {
          const user = firebase.auth().currentUser;
          if (user.emailVerified == false) {
            user.sendEmailVerification();
          }

          this.errorCode = JSON.stringify(error);
          this.errorCode = JSON.parse(this.errorCode);
          this.alert = true;

          this.error = this.getMessageFromErrorCode();
          if (this.error == "Email already used. Go to login page.") {
            this.$toast.warning(
              "We have sent an activation link to your email!"
            );
          }
        });
    },
    clearForm() {
      this.form.email = "";
      this.form.password = "";
      this.form.firstname = "";
      this.form.lastname = "";
      this.form.phone = "";
      this.form.celular = "";
      this.form.dni = "";
      this.form.recivenotification = false;
      this.alert = false;
    },
    validate() {
      this.$refs.form.validate();
    },
    authRegistrer(data) {
      this.newdata = data;

      this.regiterUser(this.form);
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
