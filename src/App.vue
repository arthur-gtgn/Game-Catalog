<template>
  <div>
    <SiteHeader />
    <GameCard title="Game1" category="action" age-rating=18 release-date="12/02/2014"/>
  </div>
</template>
<script setup>
import SiteHeader from './components/SiteHeader.vue'
import GameCard from "@/components/SiteGameCard.vue";
</script>

<style scoped></style>
