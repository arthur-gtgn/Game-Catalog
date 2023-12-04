<template>
    <div class="game-details">
      <SiteTopBar />
      
      <GameCard
        :title="game.game_name"
        :category="game.category"
        :release_date="game.release_date ? game.release_date.substring(0, 10) : ''"
        :description="game.description"
        :rating="game.age_rating"
        :gameId="game.game_id"
        @delete-game="deleteGame"
        @edit-game="editGame"
      />
  
      <h3>Reviews</h3>
      <ul>
        <li v-for="review in reviews" :key="review.review_id" class="review-item">
          <div class="review-content">
            <p>by {{ review.author }}<br>Grade: {{ review.grade }}<br>Review: {{ review.description }}</p>
          </div>
        </li>
      </ul>
  
      <div class="center"><h3 >Add Review</h3></div>
      <form @submit.prevent="submitReview">
        <label for="description">Description:</label>
        <textarea v-model="newReview.description" required></textarea>
  
        <label for="grade">Grade:</label>
        <input v-model="newReview.grade" type="number" min="0" max="100" required>
  
        <label for="author">Author:</label>
        <input v-model="newReview.author" type="text" required>
  
        
  
        <button type="submit">Submit Review</button>
      </form>
  
      <button @click="goBack">Back to Games</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
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
        axios.get(`http://localhost:3000/games/review/${gameId}`).then((response) => {
          this.game = response.data.game;
          this.reviews = response.data.reviews;
        });
      },
      submitReview() {
        const gameId = this.$route.params.id;
        axios.post(`http://localhost:3000/games/review/${this.game.game_id}`, this.newReview)

          .then((response) => {
            // Met à jour les avis après l'ajout d'une nouvelle critique
            this.reviews.push(response.data.review);
            // Réinitialisez le formulaire
            this.newReview = {
              description: "",
              grade: null,
              author: "",
              
            };
          })
          .catch((error) => {
            console.error("Erreur lors de la soumission de la critique", error);
          });
      },
      goBack() {
        this.$router.push({ path: '/' });
      },
    },
  };
  </script>
  
<style scoped>

p,h3 {
    color: var(--text);
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    text-align: justify;
    padding: 20px ;
    color: #fbfbfb;
}
.review-item {
  list-style: none;
  border: 1px solid #ddd; 
  border-radius: 10px;
  width: 30%;
  
  background-color: rgb(255, 251, 251)000; 
}

form {
    position:absolute;
    padding : 20px;
    margin: 20px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: aliceblue;
    border-radius: 20px;
}
  
  </style>
  