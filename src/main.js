import "./assets/main.css";
import "./assets/sass/style.scss";

import HomeComponent from "@/components/HomeComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import ExplainComponent from "@/components/ExplainComponent.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeComponent },
    { path: "/about", component: AboutComponent },
    { path: "/explain", component: ExplainComponent },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
