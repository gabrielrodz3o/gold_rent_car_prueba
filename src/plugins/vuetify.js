import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "material-design-icons-iconfont/dist/material-design-icons.css";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#ffcc00",

        secondary: "#1c1c1c",
        accent: "#7986CB",
        error: "#E53935",
        info: "#2196F3",
        success: "#00897B",
        warning: "#FFC107",
        colorbarra: "#008080",
        cyanText: "#1976D2",
      },
    },
  },
  icons: {
    iconfont: "md",
  },
});
