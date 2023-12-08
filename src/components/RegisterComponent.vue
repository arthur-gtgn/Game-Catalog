<template>
    <SiteTopBar />
    <h1>REGISTER</h1>
    <form @submit.prevent="registerUser" class="register-form">
        <h1>REGISTER FORM</h1>
        <div class="email">
            <v-icon name="si-maildotru" scale="1.5" class="icon" />
            <input
                placeholder="Email"
                type="email"
                id="email"
                v-model="userData.email"
                required
            />
        </div>
        <div class="username">
            <v-icon name="fa-user-edit" scale="1.5" class="icon" />
            <input
                placeholder="Username"
                type="text"
                id="username"
                v-model="userData.username"
                required
            />
        </div>
        <div class="password">
            <v-icon name="md-lockopen" scale="1.5" class="icon" />
            <input
                placeholder="Password"
                type="password"
                id="password"
                v-model="userData.password"
                required
            />
        </div>
        <button class="register" type="submit">REGISTER</button>
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
                role: "USER",
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

/*
<style scoped>
.register-form {
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

.register-form:after {
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

.register-form:after {
    top: 7px;
    left: 7px;
}

.register-form input {
    width: 250px;
    margin: 5px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
}

.register-form input:focus {
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

.icon {
    margin: 5px;
}
.register {
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
.sign-in {
    color: var(--primary);
    cursor: pointer;
    text-decoration: underline;
}
.error-message {
    color: red;
    font-size: 12px;
}
</style>
