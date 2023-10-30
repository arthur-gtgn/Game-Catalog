<template>
  <router-view></router-view>
</template>

<script>
import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";

export default {
  name: "App",
  components: { SiteTopBar },
};
</script>

<style>
:root {
  backdrop-filter: blur(10px);
  background-image: url("assets/background.jpg");
  background-size: 100vw 100vh;
}
</style>
