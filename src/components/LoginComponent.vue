<template>
    <SiteTopBar />
    <h1>LOGIN</h1>
    <form @submit.prevent="submitForm">
        <div class="email">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="userData.email" required />
        </div>
        <div class="password">
            <label for="password">Password:</label>
            <input
                type="password"
                id="password"
                v-model="userData.password"
                required
            />
        </div>
        <button class="button" type="submit">Submit</button>
    </form>
</template>

<script>
import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";
import axios from "axios";

export default {
    name: "LoginComponent",
    components: {
        SiteTopBar,
    },
    data() {
        return {
            userData: {
                email: "",
                password: "",
            },
        };
    },

    methods: {
        submitForm() {
            axios
                .post("http://localhost:3000/login", this.userData)
                .then((response) => {
                    if (response.status == 200) {
                        console.log("Login successful");
                        this.$router.push("/games");
                    } else {
                        console.log("Login failed");
                    }
                });
        },
    },
};
</script>

<style scoped>
.loginTest {
    background-color: white;
}

.email {
    color: white;
}

.password {
    color: white;
}
</style>
