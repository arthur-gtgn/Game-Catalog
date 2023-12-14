<script>
import SiteHeader from "@/components/TopBarComponents/SiteHeader.vue";
import SiteNavBar from "@/components/TopBarComponents/SiteNavBar.vue";

export default {
    name: "SiteTopBar",
    components: {
        SiteHeader,
        SiteNavBar,
    },
};
</script>

<template>
    <div class="top-bar">
        <SiteHeader class="header" title="GAME CATALOG" />
        <SiteNavBar />
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
    background: #f4f1de;
    position: absolute;
    top: 150px;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 0;
    animation: expands 2s forwards;
}

@keyframes expands {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}
</style>
