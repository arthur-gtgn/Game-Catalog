<template>
  <SiteTopBar />
    <div class="edit-game">
      
      <form @submit.prevent="updateGame" class="form-game">
        <h2 class = "edit-game-title">Edit Game</h2>
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
        <button type="submit" class ="submit">Update Game</button>
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
            
            this.editedGame = { ...response.data.game };
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
  .form-game {
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
.update-game {
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
  