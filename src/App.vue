<template>
  <SiteTopBar/>
</template>

<script setup>
import SiteTopBar from "@/components/SiteTopBar.vue";
import GameCard from "./components/SiteGameCard.vue";
</script>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
  backdrop-filter: blur(10px);
  background-image: url("assets/background.jpg");
  background-size: 100vw 100vh;
}
</style>
