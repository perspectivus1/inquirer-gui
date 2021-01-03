import InquirerGUI from './InquirerGUI.vue';
import vuetify from "./plugins/vuetify";
import 'vuetify/dist/vuetify.min.css';

export default {
  install (Vue, options) {
    options.vuetify = vuetify;
    Vue.component('InquirerGUI', InquirerGUI);
  }
}
