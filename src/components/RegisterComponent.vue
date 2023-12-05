<template>
    <SiteTopBar />
    <h1>REGISTER</h1>
    <form @submit.prevent="registerUser">
        <div class="email">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="userData.email" required />
        </div>
        <div class="username">
            <label for="username">Username:</label>
            <input
                type="text"
                id="username"
                v-model="userData.username"
                required
            />
        </div>
        <div class="role">
            <label for="role">Role:</label>
            <input type="text" id="role" v-model="userData.role" required />
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
    name: "Register",
    components: {
        SiteTopBar,
    },
    data() {
        return {
            userData: {
                username: "",
                email: "",
                role: "",
                password: "",
            },
        };
    },
    methods: {
        registerUser() {
            axios
                .post("http://localhost:3000/register", this.userData)
                .then((response) => {
                    if (response.status == 201) {
                        console.log("Registration successful");
                        this.$router.push("/login");
                    } else {
                        console.log("Registration failed");
                    }
                });
        },
    },
};
</script>

<style scoped>
.email {
    color: white;
}
.username {
    color: white;
}
.role {
    color: white;
}
.password {
    color: white;
}
</style>
