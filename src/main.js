import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/router";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import store from "./store";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";
import VueTyperPlugin from "vue-typer";
import { InMemoryCache } from "apollo-cache-inmemory";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import AxiosPlugin from "vue-axios-cors";
import i18n from "./i18n";

import AOS from "aos";
import "aos/dist/aos.css";
Vue.use(AxiosPlugin);
const options = {
  // You can set your default options here
};

Vue.use(Toast, options);
Vue.use(VueApollo);
//varaibles global
const cache = new InMemoryCache();
Vue.prototype.$companie_id = process.env.VUE_APP_COMPANIE_ID;
Vue.prototype.$branch_id = process.env.VUE_APP_BRANCH_ID;
Vue.prototype.$company_phone = process.env.VUE_APP_PHONE;
Vue.prototype.$email = process.env.VUE_APP_EMAIL;
Vue.prototype.$newapilinks = "";
Vue.prototype.$filters = [];
const apiToken = process.env.VUE_APP_API_TOKEN;
const client = new ApolloClient({
  cache,
  uri: "https://api.goldrentcar.com",
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: "Bearer " + apiToken,
      },
    });
  },
});
const apolloProvider = new VueApollo({
  defaultClient: client,
});
//Vue.prototype.$apollo = ApolloClient;
const firebaseConfig = {
  apiKey: "AIzaSyBQKITZJGMiTOiUvUwZYZqQRSJ67pkAW4o",
  authDomain: "goldrentcar-c4f68.firebaseapp.com",
  projectId: "goldrentcar-c4f68",
  storageBucket: "goldrentcar-c4f68.appspot.com",
  messagingSenderId: "451568729259",
  appId: "1:451568729259:web:c67ebc6d66c888f8728bee",
};

firebase.initializeApp(firebaseConfig);

var storageRef = firebase.storage();
Vue.prototype.$storage = storageRef;
Vue.config.productionTip = false;
Vue.use(VueTyperPlugin);

new Vue({
  vuetify,
  router,
  store,
  apolloProvider,
  i18n,
  created() {
    AOS.init();
  },
  render: (h) => h(App),
}).$mount("#app");
