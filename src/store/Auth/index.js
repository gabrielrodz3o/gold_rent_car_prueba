//import { AUTH_LOGIN } from "../../gql/queries";
import { REGISTER_USER, AUTH_USER } from "../../gql/mutation";
const state = {
  user: {},
  authStatus: false,
  token: localStorage.getItem("token") || null,
  loginForm: false,
  RegisterFrom: false,
  formCompletProfile: false,
};
const getters = {
  user: (state) => state.user,
  isAuth: (state) => !!state.token,
  authStatus: (state) => state.authStatus,
};
const actions = {
  async loginUser({ dispatch }, userData) {
    console.log(userData);
    let apollo = userData.apolloClient;
    try {
      this.data = await apollo.mutate({
        mutation: AUTH_USER,
        variables: {
          email: userData.email,
          companyId: userData.companyId,
        },
      });
      //console.log(this.data);
      var datos = this.data.data.signInByCompany.user;

      dispatch("setAuthUserData", datos);
    } catch (err) {
      console.log(err);
      //this.$toast.error("A ocurrido un error " + err);
      dispatch("logoutUser");
    }
  },
  async registerUser({ dispatch }, userData) {
    let apollo = userData.apolloClient;

    try {
      this.data = await apollo.mutate({
        mutation: REGISTER_USER,
        variables: {
          companyId: userData.companyId,
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          phoneNumber: userData.phone,
          chatPhoneNumber: userData.celular,
          driverLicense: userData.dni,
          birthday: userData.date,
          receivePromotion: userData.recivenotification,
        },
      });
      var datos = this.data.data.register.user;
      //   dispatch("setAuthUserData", datos);
    } catch (err) {
      console.log(err);
      this.$toast.error("A ocurrido un error " + err);
      dispatch("logoutUser");
    }
  },
  async setAuthUserData({ commit }, payload) {
    commit("LOGIN_USER", { user: payload });
    commit("SET_TOKEN", payload.encryptionKey);
  },
  logOut({ commit }) {
    commit("LOGOUT_USER");
  },
  FormStatus({ commit }, stateForm) {
    commit("SHOW_FORMS", stateForm);
  },
};
const mutations = {
  LOGIN_USER(state, payload) {
    localStorage.setItem("user", JSON.stringify(payload.user));
    state.user = payload.user;
    state.authStatus = true;
    location.reload();
  },
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  LOGOUT_USER(state) {
    (state.user = {}), (state.authStatus = false);
    state.token = null;
    location.reload();
  },
  SHOW_FORMS(state, action) {
    state.formCompletProfile = action;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
