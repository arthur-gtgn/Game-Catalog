
<template>
    <SiteTopBar/>
    <div>
        
      <h2>Add a new game</h2>
      <form  @submit.prevent="addGame">

        <label for="game_name">Name of the game:</label>
        <input type="text" v-model="newGame.game_name" required>

        <label for="category">Category:</label>
        <input type="text" v-model="newGame.category" required>

        <label for="release_date">Release date</label>
        <input type="date" v-model="newGame.release_date" required>

        <label for="age_rating">Age classification:</label>
        <input type="number" v-model="newGame.age_rating" required>

        <label for="description">Description:</label>
        <textarea v-model="newGame.description" required></textarea>

        <button type="submit">Add Game</button>
       
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";
  export default {
    components:{
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
      .then(response => {
        if (response.data && response.data.message === "Game created") {
          console.log("Jeu ajouté avec succès");
          this.newGame = {
            game_name: "",
            category: "",
            release_date: "",
            age_rating: "",
            description: "",
          };
          this.$router.push({ path: '/' });
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
form {
    position:absolute;
    padding : 20px;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: aliceblue;
    border-radius: 20px;
}
  </style>
  