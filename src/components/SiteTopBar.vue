<script setup>
import SiteHeader from "@/components/SiteHeader.vue";
import SiteNavBar from "@/components/SiteNavBar.vue";
</script>

<script>
export default {
  name: "SiteTopBar"
}
</script>

<template>
  <div class="top-bar">
    <SiteHeader class="header" title="GAME CATALOGUE"/>
    <SiteNavBar/>
  </div>
</template>

<style scoped>
.top-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.top-bar:after {
  content: "";
  background: #F4F1DE;
  position: absolute;
  top: 8vw;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 20%;
}
</style>