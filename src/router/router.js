import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home";
import Vehicles from "../views/Vehicles";
import VehiclesDetails from "../views/VehiclesDetails";
import PostVehicles from "../views/PostVehicles";
import Accountsetting from "../views/Account-setting";
import PersonalInfo from "../components/account/Personal-info";
import Advertisements from "../views/Advertisements";
import Requerimiento from "../views/Requerimiento";
import MyRenta from "../views/MyRents";
import RequestRents from "../views/RequestRents";
import Contactos from "../views/Contactos.vue";
import Notifications from "../views/Notifications.vue";
import Perfil from "../views/Perfil.vue";
import Favorites from "../views/Favorites.vue";
import Maintenance from "../views/Maintenance.vue";
import Nosotros from "../views/Nosotros.vue";
import PaySupcriptinos from "../views/PaySupcriptinos.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
    meta: {
      libre: true,
    },
  },
  {
    path: "/nosotros",
    component: Nosotros,
    name: "Nosotros",
    meta: {
      libre: true,
    },
  },
  {
    path: "/vehicles",
    component: Vehicles,
    name: "Vehicles",
    meta: {
      libre: true,
    },
  },
  {
    path: "/vehicles/:id",
    component: VehiclesDetails,
    name: "VehiclesDetails",
    meta: {
      libre: true,
    },
  },
  {
    path: "/post-vehicle",
    component: PostVehicles,
    name: "PostVehicles",
    meta: {
      ADMIN: true,
    },
  },
  {
    path: "/contactos",
    component: Contactos,
    name: "Contactos",
    meta: {
      libre: true,
    },
  },
  {
    path: "/requerimiento",
    component: Requerimiento,
    name: "Requerimiento",
    meta: {
      libre: true,
    },
  },
  {
    path: "/my_rents",
    component: MyRenta,
    name: "MyRenta",
    meta: {
      libre: true,
    },
  },
  {
    path: "/request_rents",
    component: RequestRents,
    name: "RequestRents",
    meta: {
      ADMIN: true,
    },
  },

  {
    path: "/pay_supcriptinos",
    component: PaySupcriptinos,
    name: "PaySupcriptinos",
    meta: {
      ADMIN: true,
    },
  },

  {
    path: "/maintenance",
    component: Maintenance,
    name: "Maintenance",
    meta: {
      ADMIN: true,
    },
  },

  {
    path: "/notifications",
    component: Notifications,
    name: "Notifications",
    meta: {
      libre: true,
    },
  },

  {
    path: "/advertisements",
    component: Advertisements,
    name: "Advertisements",
    meta: {
      ADMIN: true,
    },
  },
  {
    path: "profile",
    name: "Perfil",
    component: Perfil,
    meta: {
      libre: true,
    },
  },
  {
    path: "favorites",
    name: "Favorites",
    component: Favorites,
    meta: {
      libre: true,
    },
  },

  {
    path: "/account-settings/",
    name: "Accountsetting",
    component: Accountsetting,
    meta: {
      libre: true,
    },

    children: [
      {
        path: "personal-info",
        name: "personal.info",
        component: PersonalInfo,
        meta: {
          libre: true,
        },
      },
    ],
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const admin = store.state.Auth.user.isAdmin;
  const loggedIn = store.state.Auth.authStatus;

  if (to.matched.some((record) => record.meta.libre)) {
    next();
  } else if (admin) {
    if (to.matched.some((record) => record.meta.ADMIN)) {
      next();
    }
  } else {
    next({
      name: "Home",
    });
  }
});
export default router;
