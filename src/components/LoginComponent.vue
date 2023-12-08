<template>
    <SiteTopBar />

    <form @submit.prevent="submitForm" class="sign-in-form">
        <h1>SIGN IN FORM</h1>
        <div class="email">
            <v-icon name="si-maildotru" scale="1.5" class="email-icon" />
            <input
                placeholder="Email"
                type="email"
                id="email"
                class="email-input"
                v-model="userData.email"
                required
            />
        </div>
        <div class="password">
            <v-icon name="md-lockopen" scale="1.5" class="password-icon" />
            <input
                placeholder="Password"
                type="password"
                id="password"
                class="password-input"
                v-model="userData.password"
                required
            />
        </div>
        <div v-if="loginError" class="error-message">{{ loginError }}</div>
        <button class="sign-in" type="submit">SIGN IN</button>
        <span>Don't have an account? </span>
        <a @click="$router.push('/register')" class="register">Register</a>
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
            loginError: "",
        };
    },

    methods: {
        submitForm() {
            axios
                .post("http://localhost:3000/login", this.userData)
                .then((response) => {
                    if (response.status == 200) {
                        console.log("Login successful");
                        this.$router.push("/");
                    }
                })
                .catch((error) => {
                    this.loginError = "Invalid email or password";
                    console.log(error);
                });
        },
    },
};
</script>

<style scoped>
.sign-in-form {
    font-family: "Poppins", sans-serif;
    font-weight: var(--p);
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 400px;
    margin: 0 auto;
    margin-top: 100px;
    position: relative;
    padding: 13px 20px 13px;
    border: 1px solid black;
}

.sign-in-form:after {
    content: "";
    background-color: var(--primary);
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0px;
    transition: 0.2s;
}

.sign-in-form:after {
    top: 7px;
    left: 7px;
}

.sign-in-form input {
    width: 250px;
    margin: 5px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
}

.sign-in-form input:focus {
    width: 250px;
    margin: 5px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid var(--primary);
    border-radius: 5px;
    padding: 0.5rem;
    outline: none;
}
.email {
    padding: 10px;
    display: flex;
    justify-content: center;
}

.password {
    padding: 10px;
    display: flex;
    justify-content: center;
}

.email .email-icon {
    margin: 5px;
}

.password .password-icon {
    margin: 5px;
}

.sign-in {
    font-family: "Poppins", sans-serif;
    font-weight: var(--p);
    margin-top: 20px;
    padding: 10px;
    width: 100px;
    background-color: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    margin: 20px;
}
.register {
    color: var(--primary);
    cursor: pointer;
    text-decoration: underline;
}
.error-message {
    color: red;
    font-size: 12px;
}
</style>
