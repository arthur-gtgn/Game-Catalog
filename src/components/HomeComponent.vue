<template>
    <div class="home">
        <SiteTopBar />
        <div class="list">
            <ul>
                <li v-for="game in games" :key="game.game_id">
                    <router-link
                        :to="{
                            name: 'GameDetails',
                            params: { id: game.game_id },
                        }"
                        class="game-link"
                    >
                        <GameCard
                            :role="role"
                            :title="game.game_name"
                            :category="game.category"
                            :release_date="game.release_date.substring(0, 10)"
                            :description="game.description"
                            :rating="game.age_rating"
                            :gameId="game.game_id"
                            @delete-game="deleteGame"
                            @edit-game="editGame"
                            @game-deleted="handleGameDeleted"
                        />
                    </router-link>
                </li>
            </ul>
            <router-link to="/addGame">
                <button class="add-button" v-if="role === 'ADMIN'">
                    ADD GAME
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";
import GameCard from "@/components/SingleItemComponents/GameCard.vue";

export default {
    name: "HomeComponent",
    components: {
        SiteTopBar,
        GameCard,
    },
    data() {
        return {
            role: null,
            games: [],
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
        this.recupGames();
    },
    methods: {
        recupGames() {
            axios
                .get("http://localhost:3000/games", { withCredentials: true })
                .then((response) => {
                    this.games = response.data.games;
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la récupération des jeux",
                        error
                    );
                });
        },
        editGame(gameId) {
            console.log(gameId);
            this.$router.push({ name: "EditGame", params: { id: gameId } });
        },
        handleGameDeleted(gameId) {
            this.games = this.games.filter((game) => game.game_id !== gameId);
        },
    },
};
</script>

<style scoped>
.list {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h2 {
    color: aliceblue;
}

ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

li {
    width: calc(33.333% - 20px);
}
.game-link {
    text-decoration: none;
    color: inherit;
}

.add-button {
    background-color: white;
    font: "Poppins", sans-serif;
    border: 1px solid black;
    box-shadow: 0 0 0 5px var(--primary);
    font-weight: bold;
    color: black;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
}
</style>
