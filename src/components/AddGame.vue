<template>
    <SiteTopBar />
    <div>
        
        <form @submit.prevent="addGame" class ="form-game">
          <h2 class="edit-game-title">Add a new game</h2>
          <label for="game_name"></label>
            <input type="text" v-model="newGame.game_name" required placeholder="Name game" />

            <label for="category"></label>
            <input type="text" v-model="newGame.category" required placeholder="Category"/>

            <label for="release_date"></label>
            <input type="date" v-model="newGame.release_date" required placeholder="Release date"/>

            <label for="age_rating" ></label>
            <input type="number" v-model="newGame.age_rating" required placeholder="Age rating" />

            <label for="description"></label>
            <textarea v-model="newGame.description" required placeholder="Description"></textarea>

            <button type="submit" class="submit">Add Game</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";
export default {
    components: {
        SiteTopBar,
    },
    data() {
        return {
            newGame: {
                game_name: "",
                category: "",
                release_date: "",
                age_rating: "",
                description: "",
            },
        };
    },
    methods: {
        addGame() {
            axios
                .post("http://localhost:3000/games/addGame", this.newGame)
                .then((response) => {
                    if (
                        response.data &&
                        response.data.message === "Game created"
                    ) {
                        console.log("Jeu ajouté avec succès");
                        this.newGame = {
                            game_name: "",
                            category: "",
                            release_date: "",
                            age_rating: "",
                            description: "",
                        };
                        this.$router.push({ path: "/" });
                    } else {
                        console.error("Réponse inattendue du serveur");
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de l'ajout du jeu", error);
                });
        },
    },
};
</script>

<style scoped>
.form-game {
    font-family: "Poppins", sans-serif;
    font-weight: var(--p);
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width:400px;
    margin: auto;
    position: relative;
    border: 1px solid black;
}

  
.form-game:after {
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
.form-game label{
  margin-bottom: 20px;
}
.form-game input {
    width: 250px;
    margin: 5px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
}

.form-game textarea {
    font-family: "Arial", sans-serif;
    width: 250px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
}
.submit {
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
h2 {
    color: var(--text);
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    text-align: justify;
    padding: 20px;
}

.edit-game-title {
    color: black;
    font-family: "Poppins", sans-serif;
    padding: 0px;
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
.submit {
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
</style>
