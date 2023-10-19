<template>
  <header>
    <SiteIcon class="logo"/>
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<script setup>
import SiteIcon from "@/components/icons/SiteIcon.vue";
</script>

<script>
export default {
  name: 'SiteHeader',
  props: {
    title: String
  }
}
</script>

<style scoped>
header {
  font-family: "Baloo Bhaina 2", serif;
  color: white;
  display: flex;
  align-content: center;
  padding: 2.5vw;
}

header .logo {
  margin-right: 20px;
}

header .title {
  margin-left: 20px;
}
</Style>