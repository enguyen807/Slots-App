import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify, {
  options: {
    customProperties: true,
  },
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.orange.darken1,
        secondary: colors.orange.lighten4,
        accent: colors.lightGreen.lighten2,
        background: colors.grey.lighten3,
      },
    },
  },
});
