<template>
    <div class="card">
        <h2 class="author">{{ author }}</h2>
        <h3 class="grade">{{ grade }}</h3>
        <p class="review">{{ review }}</p>
        <div class="buttons" >
            <button @click="edit()">EDIT</button>
            <button @click="deleteReview()">DELETE</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "ReviewCard",
    props: {
        role: String,
        review: String,
        author: String,
        grade: Number,
        reviewID: Number,
    },
    methods: {
        edit() {
        this.$emit("edit-review", this.reviewID);
    },
        deleteReview() {
            const gameId = this.$route.params.id;
            axios
                .delete(
                    `http://localhost:3000/games/review/${gameId}/${this.reviewID}`
                )
                .then(() => {
                    console.log("Review deleted successfully");
                    this.$emit("review-deleted", this.reviewID);
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la suppression de la revue",
                        error
                    );
                });
        },
    },
};
</script>

<style scoped>
.card {
    background: white;
    position: relative;
    border: 2px solid black;
    border-radius: 0;
    padding: 15px;
    box-shadow: 0 0 0 5px var(--primary);
    max-width: 300px;
}

.author {
    text-align: center;
    font-size: 1.2em;
    margin: 0 0 10px 0;
    justify-content: center;
}

.grade {
    font-style: italic;
    text-align: center;
    justify-content: center;
    font-size: 1em;
    color: var(--accent);
    margin: 0 0 15px 0;
}

.review {
    text-align: center;
    justify-content: center;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 80%;
    font-size: 0.9em;
    margin: 0 0 15px 0;
}

.buttons {
    display: flex;
    justify-content: space-around;
}

button {
    cursor: pointer;
    background-color: black;
    color: white;
    outline: none;
    padding: 5px 10px;
    border: none;
}
</style>
