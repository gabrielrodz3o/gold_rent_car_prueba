import Vue from "vue";
import Vuex from "vuex";
import Auth from "./Auth";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLanguage:
      localStorage.getItem("appLanguage") ||
      process.env.VUE_APP_I18N_LOCALE ||
      "es",
  },
  getters: { getAppLanguage: (state) => state.appLanguage },
  mutations: {
    setAppLanguage(state, language) {
      state.appLanguage = language;
      localStorage.setItem("appLanguage", language); // Whenever we change the appLanguage we save it to the localStorage
    },
  },
  actions: {},
  modules: {
    Auth,
  },
  plugins: [createPersistedState()],
});
