<template>
    <SiteTopBar />
    <head>
        <link
            rel="stylesheet"
            href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
        />
    </head>
    <div class="form_cont">
        <h2>{{ mode === "login" ? "Login" : "Register" }}</h2>

        <form @submit.prevent="submitForm">
            <div v-if="mode === 'register'" class="box">
                <label for="username">Username</label>
                <input
                    type="text"
                    id="username"
                    v-model="userData.username"
                    required
                />
            </div>
            <div class="box">
                <label for="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    v-model="userData.email"
                    required
                />
                <i class="uil uil-envelope-alt email"></i>
            </div>
            <div class="box">
                <label for="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    v-model="userData.password"
                    required
                />
                <i class="uil uil-lock password"></i>
            </div>
            <button class="button" type="submit">
                {{ mode === "login" ? "Login" : "Register" }}
            </button>
        </form>

        <p>
            {{
                mode === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "
            }}
            <a href="#" @click="toggleMode">{{
                mode === "login" ? "Register" : "Login"
            }}</a>
        </p>
    </div>
</template>

<script>
import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";

export default {
    name: "login",
    components: {
        SiteTopBar,
    },
    data() {
        return {
            mode: "login",
            userData: {
                firstName: "",
                username: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
        toggleMode() {
            this.mode = this.mode === "login" ? "register" : "login";
            this.userData = {
                firstName: "",
                username: "",
                email: "",
                password: "",
            };
        },
        submitForm() {
            console.log("Form submitted:", this.userData);
        },
    },
};
</script>
<style scoped>
.form_cont {
    position: absolute;
    padding: 20px;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: aliceblue;
    border-radius: 20px;
}
.box {
    display: flex;
    flex-direction: column;

    margin: 9%;
}
h2 {
    text-align: center;
}
.box input {
    border: none;
    outline: none;
    border-bottom: 1px solid rgb(153, 149, 149);
    box-sizing: border-box;
    margin-top: 5px;
    width: 100%;
}
.form_cont .button {
    background-color: blueviolet;
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    border-radius: 10px;
    color: aliceblue;
}
</style>
