<template>
    <div class="admin-panel" v-if="role === 'ADMIN'">
        <h1>Users list</h1>
        <ul class="user-list">
            <li v-for="user in users" :key="user.id" class="user">
                <div class="user-info">
                    <h3>{{ user.id }} - {{ user.username }}</h3>
                    <p>{{ user.email }}</p>
                </div>
            </li>
        </ul>
    </div>
    <div class="user-" v-else>
        <h1>UNAUTHORIZED ACCESS</h1>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "AdminPage",
    data() {
        return {
            role: null,
            users: [],
        };
    },
    created() {
        axios
            .get("http://localhost:3000/api/user", {
                withCredentials: true,
            })
            .then((response) => {
                console.log(response);
                this.role = response.data.data.role;
            })
            .catch((error) => {
                console.log(error.message);
            });
    },
    mounted() {
        this.getAllusers();
    },
    methods: {
        getAllusers() {
            axios
                .get("http://localhost:3000/users", {
                    withCredentials: true,
                })
                .then((response) => {
                    this.users = response.data.users;
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
    },
};
</script>

<style scoped></style>
