<template>
    <div>
        <h2>
            <button @click="redirect" class="button-52" role="button">
                {{ title }}
            </button>
        </h2>
    </div>
</template>

<script>
export default {
    name: "MenuButton",
    methods: {
        redirect() {
            this.$router.push(`/${this.route}`);
        },
    },
    props: {
        title: String,
        route: String,
    },
};
</script>

<style scoped>
.button-52 {
    font-family: "Baloo Bhaina 2", serif;
    font-size: 16px;
    font-weight: 200;
    letter-spacing: 1px;
    padding: 13px 20px 13px;
    outline: 0;
    border: 1px solid black;
    cursor: pointer;
    position: relative;
    background-color: var(--primary);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.button-52:after {
    content: "";
    background-color: #ffffff;
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 100%;
    top: 7px;
    left: 7px;
    transition: 0.2s;
}

.button-52:hover:after {
    top: 0;
    left: 0;
}

@media (min-width: 768px) {
    .button-52 {
        padding: 13px 50px 13px;
    }
}
</style>
