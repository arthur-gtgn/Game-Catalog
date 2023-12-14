<template>
    <div>
        <SiteTopBar />

        <div class="gamecard-container">
            <GameCard
                :role="role"
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

        <div class="details">
            <div class="reviews">
                <h2>Reviews</h2>
                <ul class="review-list">
                    <li
                        v-for="review in reviews"
                        :key="review.review_id"
                        class="card"
                    >
                        <ReviewCard
                            :role="role"
                            :review="review.description"
                            :author="review.author"
                            :grade="review.grade"
                            :reviewID="review.review_id"
                            class="review-card"
                            @edit-review="editReview"
                            @review-deleted="handleReviewDeleted"
                        />
                    </li>
                </ul>
            </div>

            <div class="center">
                <form @submit.prevent="submitReview" class="form-review">
                    <h2 class="add-review-title">ADD REVIEW</h2>
                    <div class="form-grade" v-if="role === 'ADMIN'">
                        <v-icon name="bi-person-circle" />
                        <input
                            v-model="newReview.author"
                            type="text"
                            required
                            placeholder="Author"
                        /><br />
                    </div>
                    <div class="form-grade">
                        <v-icon name="ri-numbers-fill" />
                        <input
                            v-model="newReview.grade"
                            type="number"
                            min="0"
                            max="100"
                            required
                            placeholder="Grade"
                        />
                    </div>
                    <br />
                    <div class="form-desc">
                        <v-icon name="bi-file-text-fill" />
                        <textarea
                            v-model="newReview.description"
                            required
                            placeholder="Description"
                        />
                    </div>
                    <button class="submit-review" type="submit">
                        Submit Review
                    </button>
                </form>
            </div>

            <div class="companies">
                <h2>Company</h2>
                <ul class="company-list">
                    <li v-for="comp in company" :key="comp.comp_id">
                        <CompanyCard
                            :role="role"
                            :id="comp.company_id"
                            :name="comp.company_name"
                            :ceo="comp.ceo"
                            :marketValue="comp.market_value"
                            :numEmployees="comp.nb_employees"
                            :reseller="comp.reseller"
                            :price="comp.price"
                            @company-deleted="handleCompanyDeleted"
                            class="company-card"
                        />
                    </li>
                </ul>
            </div>
        </div>

        <div class="buttons">
            <button
                class="add-button"
                @click="goToAddCompany"
                v-if="role === 'ADMIN'"
            >
                ADD COMPANY
            </button>

            <button class="back-button" @click="goBack">BACK TO GAMES</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";
import GameCard from "@/components/SingleItemComponents/GameCard.vue";
import ReviewCard from "./SingleItemComponents/ReviewCard.vue";
import CompanyCard from "./SingleItemComponents/CompanyCard.vue";
import HomeComponent from "@/components/HomeComponent.vue";
export default {
    components: {
        SiteTopBar,
        GameCard,
        ReviewCard,
        CompanyCard,
        HomeComponent,
    },
    data() {
        return {
            role: null,
            username: null,

            newCompany: {
                company_name: "",
                ceo: "",
                nb_employees: null,
                market_value: null,
                reseller: false,
                price: null,
            },

            companyId: null,

            game: {},

            company: {},

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
        this.getGameDetailsWithCompany();
    },
    created() {
        axios
            .get("http://localhost:3000/api/user", {
                withCredentials: true,
            })
            .then((response) => {
                console.log(response);
                this.role = response.data.data.role;
                if (this.role != "ADMIN") {
                    this.newReview.author = response.data.data.username;
                    this.username =
                        response.data.data.username.charAt(0).toUpperCase() +
                        response.data.data.username.slice(1);
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
        
    },
    methods: {
        submitCompany() {
            const gameId = this.$route.params.id;
            console.log("Game ID:", gameId);

            axios
                .post(
                    `http://localhost:3000/games/AddCompany/${gameId}`,
                    this.newCompany
                )
                .then((response) => {
                    if (
                        response.data &&
                        response.data.message ===
                            "Company added successfully to the game"
                    ) {
                        this.getGameDetailsWithCompany();
                        this.getGameDetails();
                        console.log("Entreprise ajoutée avec succès");
                        this.newCompany = {
                            company_name: "",
                            ceo: "",
                            nb_employees: "",
                            market_value: "",
                            reseller: false,
                            price: "",
                        };
                    } else {
                        console.error("Réponse inattendue du serveur");
                    }
                })
                .catch((error) => {
                    console.error("Error submitting company", error);
                });
        },
        getGameDetails() {
            const gameId = this.$route.params.id;
            axios
                .get(`http://localhost:3000/games/review/${gameId}`)
                .then((response) => {
                    this.game = response.data.game;
                    this.reviews = response.data.reviews;
                });
        },
        getGameDetailsWithCompany() {
            const gameId = this.$route.params.id;
            axios
                .get(`http://localhost:3000/games/company/${gameId}`)
                .then((response) => {
                    this.game = response.data.game;
                    this.company = response.data.company;
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
                    this.getGameDetailsWithCompany();

                    // Réinitialisez le formulaire de revue
                    this.newReview = {
                        description: "",
                        grade: null,
                        author:
                            this.username.charAt(0).toUpperCase() +
                            this.username.slice(1),
                    };
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la soumission de la revue",
                        error
                    );
                });
        },
        deleteGame(gameId) {
            axios
                .delete(`http://localhost:3000/games/delete/${gameId}`)
                .then(() => {
                    console.log("Jeu supprimé avec succès");
                    this.$router.push({ path: "/" });
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la suppression du jeu",
                        error
                    );
                });
        },
        editGame(gameId) {
            console.log(gameId);
            this.$router.push({ name: "EditGame", params: { id: gameId } });
        },
        editReview( reviewID){
            this.$router.push({name: "EditReview", params: { id: reviewID }})

        },

        goBack() {
            this.$router.push({ path: "/" });
        },
        goToAddCompany() {
            this.$router.push({ name: "AddCompany" });
        },

        handleReviewDeleted(reviewID) {
            this.reviews = this.reviews.filter(
                (review) => review.review_id !== reviewID
            );
        },
        handleCompanyDeleted(companyId) {
            this.company = this.company.filter(
                (company) => company.company_id !== companyId
            );
        },
    },
};
// test
</script>

<style scoped>
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

.add-review-title {
    color: black;
    font-family: "Poppins", sans-serif;
    padding: 0px;
}
.form-review {
    font-family: "Poppins", sans-serif;
    font-weight: var(--p);
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 400px;
    margin: auto;

    position: relative;
    border: 1px solid black;
}

.form-review:after {
    content: "";
    background-color: var(--primary);
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0px;
    transition: 0.2s;
    top: 7px;
    left: 7px;
}

.form-review input {
    width: 250px;
    margin: 5px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
}

.form-review textarea {
    font-family: "Arial", sans-serif;
    width: 250px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
}

.form-desc {
    display: flex;
    align-items: center;
}

.submit-review {
    font-family: "Poppins", sans-serif;
    font-weight: var(--p);
    margin-top: 10px;
    padding: 10px;
    width: 200px;
    background-color: var(--primary);
    color: rgb(225, 224, 224);
    border: none;
    cursor: pointer;
    margin: 10px;
}

.details {
    display: flex;
    flex-direction: row;
    align-items: first baseline;
    margin-top: 50px;
}

.reviews {
    width: 50%;
}

.companies {
    width: 50%;
}

.reviews h2 {
    text-align: center;
}

.review-list {
    align-items: center;
    justify-content: center;
    list-style: none;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.review-list li {
    margin: 10px;
}

.company-list {
    list-style: none;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
}

.company-list li {
    margin: 10px;
}

.companies h2 {
    text-align: center;
}

.buttons {
    justify-content: center;
    display: flex;
    margin: 20px;
}

button {
    margin: 20px;
    font-family: "Poppins", sans-serif;
    padding: 10px;
    cursor: pointer;
    background-color: black;
    color: white;
    outline: 2px solid white;
    border: none;
}

</style>
