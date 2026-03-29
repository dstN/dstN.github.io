import { createApp } from "vue";
import "vue-fullpage.js/dist/style.css";
import VueFullPage from "vue-fullpage.js";
import "./assets/scss/style.scss";
import App from "./App.vue";

// FontAwesome Vue setup
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

library.add(faGithub, faTwitter);

const app = createApp(App);
app.use(VueFullPage);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
