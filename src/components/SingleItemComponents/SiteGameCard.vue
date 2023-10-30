<template>
  <div class="card">
    <h1>{{ title }}</h1>
    <span>{{ category }}</span>
    <div class="misc">
      {{ releaseDate }}
      {{ ageRating }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    title: String,
    category: String,
    releaseDate: String,
    ageRating: Number
  }
}
</script>

<style scoped>
.card {
  display: flex;
}

</style>