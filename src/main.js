import "./assets/main.css";

import HomeComponent from "@/components/HomeComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import App from "./App.vue";
import ExplainComponent from "@/components/ExplainComponent.vue";
import addGame from "@/components/AddGame.vue";
import EditGame from "@/components/EditGame.vue";
import GameDetails from "@/components/GameDetails.vue";
import Login from "@/components/LoginComponent.vue";
import Register from "@/components/RegisterComponent.vue";
import AddCompany from "@/components/AddCompany.vue";
import EditCompany from "@/components/EditCompany.vue";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
    LaCodepen,
    SiMaildotru,
    MdLockopen,
    FaUserEdit,
} from "oh-vue-icons/icons";


addIcons(LaCodepen, SiMaildotru, MdLockopen, FaUserEdit);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: HomeComponent },
        { path: "/about", component: AboutComponent },
        { path: "/explain", component: ExplainComponent },
        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: "/addGame", component: addGame },
        {
            path: "/editGame/:id",
            name: "EditGame",
            component: EditGame,
        },
        {
            path: "/game/:id",
            name: "GameDetails",
            component: GameDetails,
        },
        {
            path: "/AddCompany/:id",
            name: "AddCompany",
            component: AddCompany,
        },
        {
            path: "/EditCompany/:id/:companyId",
            name: "EditCompany",
            component: EditCompany,
        },
        
    ],
});

const app = createApp(App);

app.use(router);

app.component("v-icon", OhVueIcon);

app.mount("#app");
