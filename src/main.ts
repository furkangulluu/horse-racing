import { createApp } from "vue";
import App from "./App.vue";
import Store from "./stores/Store"; // Store'u import ediyoruz
import i18n from "./i18n";
import "./style.css";

const app = createApp(App);

app.use(Store);
app.use(i18n);
app.mount("#app");
