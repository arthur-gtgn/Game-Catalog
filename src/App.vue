<template>
  <SiteTopBar/>
</template>

<script>
import SiteTopBar from "@/components/SiteTopBar.vue";

export default {
  name: 'App',
  components: {
    SiteTopBar
  }
}
</script>

<style>
:root {
  backdrop-filter: blur(10px);
  background-image: url("assets/background.jpg");
  background-size: 100vw 100vh;
}
</style>
