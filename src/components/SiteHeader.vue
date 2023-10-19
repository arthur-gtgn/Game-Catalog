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
  color: #F4F1DE;
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

</Style>