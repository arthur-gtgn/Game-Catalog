<template>
    <div class="home">
      <SiteTopBar />
  
      <div>
        <h2>Liste des jeux</h2>
        <ul>
          <li v-for="game in games" :key="game.game_id">
            {{ game.game_name }} - {{ game.category }} - {{ game.release_date }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";
  
  export default {
    name: "HomeComponent",
    components: {
      SiteTopBar,
    },
    data() {
      return {
        games: [],
      };
    },
    mounted() {
      // Appel à l'API backend pour récupérer la liste des jeux
      axios.get("http://localhost:3000/games/") 
        .then((response) => {
          this.games = response.data.games;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des jeux", error);
        });
    },
  };
  </script>
  
  <style scoped>
  h2{
    color: aliceblue;
  }
  li {
    color: rgb(255, 255, 255); 
  }
  </style>