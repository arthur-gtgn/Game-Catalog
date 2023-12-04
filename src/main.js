import "./assets/main.css";

import HomeComponent from "@/components/HomeComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import App from "./App.vue";
import ExplainComponent from "@/components/ExplainComponent.vue";
import login from "@/components/login.vue";
import addGame from "@/components/AddGame.vue";
import EditGame from "@/components/EditGame.vue";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { LaCodepen } from "oh-vue-icons/icons";

addIcons(LaCodepen);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: HomeComponent },
        { path: "/about", component: AboutComponent },
        { path: "/explain", component: ExplainComponent },
        { path: "/login", component: login },
        { path: "/addGame", component: addGame },
        {
            path: '/editGame/:id',
            name: 'EditGame',
            component: EditGame,
          },
    ],
});

const app = createApp(App);

app.use(router);

app.component("v-icon", OhVueIcon);

app.mount("#app");
