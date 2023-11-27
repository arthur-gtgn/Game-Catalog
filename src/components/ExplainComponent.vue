<template>
    <SiteTopBar />
    <div class="aboutCatalog">
        <h1>What is game Catalog ?</h1>
        <p>
            Game Catalog is a website designed for video game enthusiasts
            looking to discover new games based on their preferences.
        </p>
        <div class="image-container">
      <img src="src/assets/persoJeux.jpg" alt="Image Description" />
    </div>
        <p>
            The primary goal of this project is to create an interactive and
            user-friendly website that displays a list of video games, allowing
            users to scroll through the games based on their characteristics
            such as price, category, rating, and more.
        </p>
    </div>
</template>

<script>
import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";

export default {
    name: "ExplainComponent",
    components: {
        SiteTopBar,
    },
};
</script>

<style scoped>
h1 {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    color: var(--text);
    max-width: 580px;
    margin: 20px auto;
    
    align-content: center;
    text-align: center;
}
p {
    color: var(--text);
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    text-align: center;
    padding: 40px 200px;
}
.image-container {
    display: flex;
    justify-content: center;
    margin-top: 20px; 
  }

  .image-container img {
    max-width: 80%;
    height: auto;
    border-radius: 20px;
  }
</style>
