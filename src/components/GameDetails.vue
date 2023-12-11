<template>
    <div class="game-details">
        <SiteTopBar />
        <div class="gamecard-container">
            <GameCard
                :title="game.game_name"
                :category="game.category"
                :release_date="
                    game.release_date ? game.release_date.substring(0, 10) : ' '
                "
                :description="game.description"
                :rating="game.age_rating"
                :gameId="game.game_id"
                @delete-game="deleteGame"
                @edit-game="editGame"
                class="gamecard"
            />
        </div>

        <h2>Reviews</h2>
        <ul>
            <li
                v-for="review in reviews"
                :key="review.review_id"
                class="review-item"
            >
                <div class="review-content">
                    <p>
                        by {{ review.author }}<br />Grade:
                        {{ review.grade }} /100<br />Review:
                        {{ review.description }}
                    </p>
                    <button @click="deleteReview(review.review_id)">
                        Delete Review
                    </button>
                </div>
            </li>
        </ul>
        <div class="center">
            <h3>Add Review</h3>
            <form @submit.prevent="submitReview">
                <div class="form-group">
                    <label for="author">Author:</label>
                    <input
                        v-model="newReview.author"
                        type="text"
                        required
                    /><br />
                </div>
                <div class="form-group">
                    <label for="grade">Grade:</label>
                    <input
                        v-model="newReview.grade"
                        type="number"
                        min="0"
                        max="100"
                        required
                    />
                </div>
                <br />
                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea
                        v-model="newReview.description"
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
        <button @click="goBack">Back to Games</button>
    </div>
</template>

<script>
import axios from "axios";
import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";
import GameCard from "@/components/SingleItemComponents/GameCard.vue";

export default {
    components: {
        SiteTopBar,
        GameCard,
    },
    data() {
        return {
            game: {},
            reviews: [],
            newReview: {
                description: "",
                grade: null,
                author: "",
            },
        };
    },
    mounted() {
        this.getGameDetails();
    },
    methods: {
        getGameDetails() {
            const gameId = this.$route.params.id;
            axios
                .get(`http://localhost:3000/games/review/${gameId}`)
                .then((response) => {
                    this.game = response.data.game;
                    this.reviews = response.data.reviews;
                });
        },
        submitReview() {
            const gameId = this.$route.params.id;
            axios
                .post(
                    `http://localhost:3000/games/review/${gameId}`,
                    this.newReview
                )
                .then(() => {
                    // Rechargez les détails du jeu, y compris les avis
                    this.getGameDetails();

                    // Réinitialisez le formulaire de revue
                    this.newReview = {
                        description: "",
                        grade: null,
                        author: "",
                    };
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la soumission de la revue",
                        error
                    );
                });
        },
        deleteReview(reviewId) {
            const gameId = this.$route.params.id;
            axios
                .delete(
                    `http://localhost:3000/games/review/${gameId}/${reviewId}`
                )
                .then(() => {
                    this.getGameDetails();
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la suppression de la revue",
                        error
                    );
                });
        },
        goBack() {
            this.$router.push({ path: "/" });
        },
    },
};
</script>

<style scoped>
p,
h3,
.gamecard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.gamecard {
    max-width: 500px;
}
h2 {
    color: var(--text);
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    text-align: justify;
    padding: 20px;
}
.review-item {
    list-style: none;
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 30%;
    margin-bottom: 15px;
    background-color: rgb(255, 251, 251) 000;
}

form {
    position: absolute;
    padding: 20px;
    margin: 40px;
    left: 40%;

    background-color: aliceblue;
    border-radius: 20px;
}
h2,
h3 {
    text-align: center;
    font-size: 2em;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}
</style>
