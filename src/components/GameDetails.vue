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
  
      <h2>Reviews</h2>
      <ul>
        <li v-for="review in reviews" :key="review.review_id" class="review-item">
          <div class="review-content">
            <p>by {{ review.author }}<br>Grade: {{ review.grade }} /100<br>Review: {{ review.description }}</p>
            <button @click="deleteReview(review.review_id)">Delete Review</button>
          </div>
        </li>
      </ul>
      <div class="center">
      <h3 >Add Review</h3>
      <form @submit.prevent="submitReview" class="form-review">
        <div class="form-group">
        <label for="author">Author:</label>
        <input v-model="newReview.author" type="text" required><br>
      </div>
        <div class="form-group">
        <label for="grade">Grade:</label>
        <input v-model="newReview.grade" type="number" min="0" max="100" required>
        
      </div><br>
        <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="newReview.description" required></textarea>
      </div>
        <button class ="submit-review" type="submit">Submit Review</button>
      </form>
    </div>
    <div class="company-info">
      
      <h2>Company Details</h2>
      <li v-for="comp in company" :key="comp.comp_id" class="comp-item">
      <p>Company Name: {{ comp.company_name }}</p>
      <p>CEO: {{ comp.ceo }}</p>
      <p>Number of Employees: {{ comp.nb_employees }}</p>
      <p>Market Value: {{ comp.market_value }}</p>
      <p>Reseller: {{ comp.reseller ? 'Yes' : 'No' }}</p>
      <p>Price: {{ comp.price }}</p>
      <button @click="deleteCompany(comp.company_id)">Delete Company</button>
      <button @click="redirectCompEdit(comp.company_id)">Modify</button>
    </li>
    </div>
    <div>
    <button @click="goToAddCompany">Add Company</button>
  </div>
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
      this.getGameDetailswithCompany();
    },
    methods: {
      submitCompany() {
      const gameId = this.$route.params.id;
      console.log("Game ID:", gameId);

      axios.post(`http://localhost:3000/games/AddCompany/${gameId}`, this.newCompany)
      .then((response) => {
            if (
              response.data &&
              response.data.message === "Company added successfully to the game"
            ) {
              this.getGameDetailswithCompany();
              this.getGameDetails();
              console.log("Entreprise ajoutée avec succès");
              this.newCompany = {
                company_name: "",
                ceo: "",
                nb_employees: "",
                market_value: "",
                reseller: false,
                price:"",
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
        axios.get(`http://localhost:3000/games/review/${gameId}`).then((response) => {
          this.game = response.data.game;
          this.reviews = response.data.reviews;
        });},
        getGameDetailswithCompany() {
        const gameId = this.$route.params.id;
        axios.get(`http://localhost:3000/games/company/${gameId}`).then((response) => {
          this.game = response.data.game;
          this.company = response.data.company;
          
        });
      },
      submitReview() {
            const gameId = this.$route.params.id;
            axios.post(`http://localhost:3000/games/review/${gameId}`, this.newReview)
                .then(() => {
                    // Rechargez les détails du jeu, y compris les avis
                    this.getGameDetails();
                    this.getGameDetailswithCompany();

                    // Réinitialisez le formulaire de revue
                    this.newReview = {
                        description: "",
                        grade: null,
                        author: "",
                    };
                })
                .catch((error) => {
                    console.error("Erreur lors de la soumission de la revue", error);
                });
        },
      deleteReview(reviewId) {
        const gameId = this.$route.params.id;
        axios.delete(`http://localhost:3000/games/review/${gameId}/${reviewId}`)
            .then(() => {
              this.getGameDetails();
              
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de la revue", error);
            });
      },
      deleteCompany(companyId) {
      const gameId = this.$route.params.id;

      axios.delete(`http://localhost:3000/games/company/${gameId}/${companyId}`)
        .then(() => {
          this.getGameDetailswithCompany();
          console.log("Entreprise supprimée avec succès");
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'entreprise", error);
        });
    },
 

      goBack() {
        this.$router.push({ path: '/' });
      },
      goToAddCompany() {
      this.$router.push({ name: 'AddCompany' });
    },
    redirectCompEdit(companyId){
      this.$router.push({ name: 'EditCompany' , params: { companyId }});
    }

    },
  };
  </script>
  
<style scoped>

p,h3,h2 {
    color: var(--text);
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    text-align: justify;
    padding: 20px ;
    
}
.review-item{
  list-style: none;
  border: 1px solid #ddd; 
  border-radius: 10px;
  width: 30%;
  margin-bottom: 15px;
  background-color: rgb(255, 251, 251)000; 
}
.comp-item{
  list-style: none;
  border: 1px solid #ddd; 
  border-radius: 10px;
  
  margin-bottom: 15px;
  background-color: rgb(255, 251, 251)000; 
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
    margin: 0 auto;
    
    position: relative;
    padding: 13px 20px 13px;
    border: 1px solid black;
    
}

.form-review:after{
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
h2,h3{
  text-align: center;
  font-size: 2em;
}
.submit-review{
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
  