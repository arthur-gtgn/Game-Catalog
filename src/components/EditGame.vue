<template>
  <SiteTopBar />
    <div class="edit-game">
      <h2>Edit Game</h2>
      <form @submit.prevent="updateGame">
        <div>
        <label for="game_name">Game Name:</label>
        <input v-model="editedGame.game_name" type="text" id="game_name" required :readonly="!isEditing"/>
        </div>
    <div>
        <label for="category">Category:</label>
        <input v-model="editedGame.category" type="text" id="category" required :readonly="!isEditing"/>
    </div>
    <div>
        <label for="release_date">Release Date:</label>
        <input v-model="editedGame.release_date" type="date" id="release_date" required :readonly="!isEditing"/></div>
    <div>
        <label for="age_rating">Age Rating:</label>
        <input v-model="editedGame.age_rating" type="number" id="age_rating" required :readonly="!isEditing"/>
    </div>
    <div>
        <label for="description">Description:</label>
        <textarea v-model="editedGame.description" id="description" rows="4" required :readonly="!isEditing"></textarea>
    </div>
        <button type="submit">Update Game</button>
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
    name: "EditGame",
    data() {
      return {
        editedGame: {
          game_name: "",
          category: "",
          release_date: "",
          age_rating: 0,
          description: "",
        },
        existingGame:{},
        isEditing: false,
      };
    },
    mounted() {
      // Fetch the current game details using the game ID from the route params
      const gameId = this.$route.params.id;
      this.fetchGameDetails(gameId);
    },
    methods: {
      fetchGameDetails(gameId) {
        axios
          .get(`http://localhost:3000/games/${gameId}`)
          .then((response) => {
        
            // Copie les valeurs existantes pour la modification
            this.editedGame = { ...response.data.game };
            // Copie les valeurs existantes pour l'affichage
            this.existingGame = { ...response.data.game };
            this.editedGame.release_date = this.editedGame.release_date.substring(0, 10);
            this.isEditing = true;
          })
          .catch((error) => {
            console.error("Error fetching game details", error);
          });
      },
      updateGame() {
        const gameId = this.$route.params.id;
        
        axios
          .put(`http://localhost:3000/games/update/${gameId}`, this.editedGame)
          .then((response) => {
            console.log("Game updated successfully", response.data);
            this.isEditing = false;
            this.$router.push({ path: '/' });
            // Optionally, you can navigate back to the home page or perform other actions
          })
          .catch((error) => {
            console.error("Error updating game", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-game {
    margin: 20px;
  }
    form {
    position:absolute;
    padding : 20px;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: aliceblue;
    border-radius: 20px;
}

  
  label {
    padding: 10px;
    font-weight: bold;
  }
  
  input,
  textarea {
    width: 90%;
    padding: 10px;
  }
  
  button {
    background-color: #3498db;
    color: white;
    padding: 10px;
    cursor: pointer;
    border: none;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  