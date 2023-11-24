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
    background-color: var(--background);
}

/*
:root {
    --text: #fde7e7;
    --background: #1c1b1b;
    --primary: #811287;
    --secondary: #ffffff;
    --accent: #6fda44;
}
*/
</style>
