<template>
    <header>
        <v-icon name="la-codepen" scale="4" fill="#EF67D8" animation="pulse" />
        <!-- <img src="src/assets/troll.jpeg" alt="troll-image" class="logo-hover" /> -->
        <h2 class="title">{{ title }}</h2>
    </header>
</template>

<script setup></script>

<script>
export default {
    name: "SiteHeader",
    props: {
        title: String,
    },
};
</script>

<style scoped>
header {
    display: flex;
    align-items: center;
    padding: 10px;
}

header .title {
    font-size: var(--h2);
    color: var(--text);
    font-family: "Poppins", sans-serif;
    line-height: 1.3;
    letter-spacing: 0;
    margin-left: 15px;
}

/*
header .logo-hover {
  display: none;
  transition: transform 0.3s ease;
}

header:hover .logo {
  display: none;
}
*/

/*
header:hover {
  border-radius: 100px;
  display: inline;
  margin-right: 20px;
  height: 80px;
  width: 80px;
  animation: rotateAnimation 2s infinite linear;
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
*/
</style>
