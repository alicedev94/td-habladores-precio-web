import "vuetify/styles";
import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify

import { createVuetify } from "vuetify"; 
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// import { aliases, md } from 'vuetify/iconsets/md';

const vuetify = createVuetify({
  components,
  directives,
  // theme: {
  //   defaultTheme: 'dark',
  // }
});

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount("#app");
