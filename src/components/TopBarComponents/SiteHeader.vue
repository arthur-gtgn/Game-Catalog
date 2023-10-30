<template>
  <header>
    <SiteIcon class="logo" />
    <!-- <img src="src/assets/troll.jpeg" alt="troll-image" class="logo-hover" /> -->
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<script setup>
import SiteIcon from "@/components/icons/SiteIcon.vue";
</script>

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
  font-family: "Baloo Bhaina 2", serif;
  color: #f4f1de;
  display: flex;
  align-content: center;
  padding-top: 10px;
  padding-left: 50px;
  padding-bottom: 10px;
}

header .logo {
  margin-right: 20px;
}

header .title {
  margin-left: 20px;
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
</style>
