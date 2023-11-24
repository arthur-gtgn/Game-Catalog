<template>
    <ul>
        <li>
            <MenuButton title="HOME" route="" />
        </li>
        <li>
            <MenuButton title="WHAT IS THIS?" route="explain" />
        </li>
        <li>
            <MenuButton title="TEAM" route="about" />
        </li>
        <li>
            <MenuButton title="LOGIN" route="login" />
        </li>
    </ul>
</template>

<script>
import MenuButton from "../SingleItemComponents/MenuButton.vue";

export default {
    name: "TestNavBar",
    components: {
        MenuButton,
    },
};
</script>

<style scoped>
ul {
    align-items: center;
    list-style: none;
    display: flex;
    color: var(--accent);
    margin-right: 5vw;
    margin-top: 0;
    margin-bottom: 0;
}

ul li {
    padding-left: 15px;
    padding-right: 15px;
}
</style>
