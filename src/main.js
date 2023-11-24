import "./assets/main.css";
import "./assets/sass/style.scss";

import HomeComponent from "@/components/HomeComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { LaCodepen } from "oh-vue-icons/icons";

import App from "./App.vue";
import ExplainComponent from "@/components/ExplainComponent.vue";
import login from "@/components/login.vue";

addIcons(LaCodepen);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: HomeComponent },
        { path: "/about", component: AboutComponent },
        { path: "/explain", component: ExplainComponent },
        { path: "/login", component: login },
    ],
});

const app = createApp(App);

app.use(router);

app.component("v-icon", OhVueIcon);

app.mount("#app");
