<template>
    <ul>
        <li>
            <MenuButton title="HOME" route="" />
        </li>
        <li>
            <MenuButton title="ABOUT" route="explain" />
        </li>
        <li>
            <MenuButton title="DEVS" route="about" />
        </li>
        <li>
            <MenuButton :title="username ? username : 'LOGIN'" route="login" />
        </li>
    </ul>
</template>

<script>
import axios from "axios";
import MenuButton from "@/components/SingleItemComponents/MenuButton.vue";

export default {
    name: "TestNavBar",
    components: {
        MenuButton,
    },
    data() {
        return {
            username: null,
        };
    },
    created() {
        axios
            .get("http://localhost:3000/api/user", {
                /* headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, */
                withCredentials: true,
            })
            .then((response) => {
                console.log(response);
                this.username = response.data.data.username.toUpperCase();
            })
            .catch((error) => {
                console.log(error.message);
            });
    },
};
</script>

<style scoped>
ul {
    align-items: center;
    list-style: none;
    display: flex;
    color: var(--accent);
    margin-right: 5vw;
    margin-top: 0;
    margin-bottom: 0;
}

ul li {
    padding-left: 15px;
    padding-right: 15px;
}
</style>
