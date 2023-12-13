<template>
    <div class="card">
        <h2 class="author">{{ author }}</h2>
        <h3 class="grade">{{ grade }}</h3>
        <p class="review">{{ review }}</p>
        <div class="buttons">
            <button @click="edit">EDIT</button>
            <button @click="deleteReview(reviewID)">DELETE</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReviewCard",
    props: {
        review: String,
        author: String,
        grade: Number,
        reviewID: Number,
    },
    deleteReview(reviewId) {
        const gameId = this.$route.params.id;
        axios
            .delete(`http://localhost:3000/games/review/${gameId}/${reviewId}`)
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
};
</script>

<style scoped>
.card {
    cursor: pointer;
    background: var(--primary);
    position: relative;
    border: 2px solid black;
    border-radius: 0;
    padding: 15px;
    box-shadow: 0 0 0 5px white;
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
    color: white;
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
    background-color: black;
    color: white;
    outline: none;
    border: 3px solid white;
}
</style>
