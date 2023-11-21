<template>
  <SiteTopBar />
  <div class = "aboutCatalog">
    <h1>What is game Catalog ?</h1>
    <p>Game Catalog is a website designed for video game enthusiasts looking to discover new
games based on their preferences.</p> 
<p>The primary goal of this project is to create an interactive
and user-friendly website that displays a list of video games, allowing users to scroll through
the games based on their characteristics such as price, category, rating, and more.</p>
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
h1{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  max-width: 580px;
  margin: 20px auto;
  padding: 20px;
  border: 5px solid #f4f1de;
  align-content: center;
  text-align: center;
}
p{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
}
</style>
