
<template>
    <div class="home">
      <SiteTopBar />
  
      <div class="list">
        <h2>LIST OF GAMES</h2>
        <router-link to="/addGame">
          <button>Ajouter un jeu</button>
        </router-link>
  
        <ul>
          <li v-for="game in games" :key="game.game_id">
            <GameCard
              :title="game.game_name"
              :category="game.category"
              :release_date="game.release_date.substring(0, 10)"
              :description="game.description"
              :rating="game.age_rating"
            />
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";
  import GameCard from "@/components/SingleItemComponents/GameCard.vue";
  
  export default {
    name: "HomeComponent",
    components: {
      SiteTopBar,
      GameCard,
    },
    data() {
      return {
        games: [],
      };
    },
    mounted() {
      this.recupGames();
    },
    methods: {
      recupGames() {
        axios
          .get("http://localhost:3000/games/")
          .then((response) => {
            this.games = response.data.games;
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des jeux", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .list {
    margin-top: 25px;
    margin-left: 20px;
    margin-right: 20px;
  }
  
  h2 {
    color: aliceblue;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  li {
    width: calc(33.333% - 20px);
  }
  </style>
  