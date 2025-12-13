import { createApp } from "vue";
import "vue-fullpage.js/dist/style.css";
import VueFullPage from "vue-fullpage.js";
import "./assets/scss/style.scss";
import App from "./App.vue";

// Load FontAwesome asynchronously with font-display: swap for better FCP
import("./assets/scss/fontawesome-swap.scss");

const app = createApp(App);
app.use(VueFullPage);
app.mount("#app");
