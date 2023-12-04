<template>
    <div class="card">
        <h2 class="title">{{ title }}</h2>
        <h3 class="category">{{ category }}</h3>
        <p class="description">{{ description }}</p>
        <div class="footer">
            <span class="release-date">{{ release_date }}</span>
            <span class="rating">PEGI {{ rating }}</span>
            <br />
            <button @click.prevent="deleteGame" class="delete-button">Delete</button>
            <button @click.prevent="editGame" class="edit-button">Modify</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "GameCard",
    props: {
        title: String,
        category: String,
        release_date: String,
        description: String,
        rating: Number,
        gameId: Number,
    },
    methods: {
        deleteGame() {
            const gameId = this.gameId;
            this.$emit("delete-game", gameId);
        },
        editGame() {
            const gameId = this.gameId;
            this.$emit("edit-game", gameId);
        },
    },
};
</script>



<style scoped>
.card {
    cursor: pointer;
    background: #f9f9f9;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card:after {
    content: "";
    border-radius: 8px;
    background-color: var(--accent);
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    transition: 0.2s;
}

.card:hover:after {
    top: 10px;
    left: 10px;
}

.title {
    text-align: center;
    font-size: 1.2em;
    margin: 0 0 10px 0;
    justify-content: center;
}

.category {
    text-align: center;
    justify-content: center;
    font-size: 1em;
    color: #666;
    margin: 0 0 15px 0;
}

.description {
    font-size: 0.9em;
    margin: 0 0 15px 0;
}

.footer {
    font-size: 0.8em;
    display: flex;
    justify-content: space-between;
}

.release-date {
    font-weight: bold;
    color: #333;
}

.rating {
    font-weight: bold;
    color: var(--primary);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card {
        padding: 13px 50px 13px;
        width: calc(50% - 20px); /* 2 cards per row on smaller screens */
    }
}

@media (max-width: 480px) {
    .card {
        padding: 13px 50px 13px;
        width: 100%; /* 1 card per row on very small screens */
    }
}
</style>
