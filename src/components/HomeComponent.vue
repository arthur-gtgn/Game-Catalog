<template>
    <div class="home">
        <SiteTopBar />

        <div>
            <h2>LIST OF GAMES</h2>
            <ul>
                <li v-for="game in games" :key="game.game_id">
                    <GameCard
                        :title="game.game_name"
                        :category="game.category"
                        :release_date="game.release_date.substring(0, 10)"
                        :description="game.description"
                        :rating="game.age_rating"
                    />
                </li>
            </ul>
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
            games: [],
        };
    },
    mounted() {
        // Appel à l'API backend pour récupérer la liste des jeux
        axios
            .get("http://localhost:3000/games/")
            .then((response) => {
                this.games = response.data.games;
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des jeux", error);
            });
    },
};
</script>

<style scoped>
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
</style>
