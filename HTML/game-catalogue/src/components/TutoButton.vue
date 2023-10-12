<template>
    <button @click="onClick()" :class="btn - { btnClass }" :style="{ background: color }">
        {{ label }}
    </button>
</template>

<script>
export default {
    name: 'TutoButton',
    props: {
        label: {
            typeof: String,
            default: 'Button'
        },
        color: {
            typeof: String,
            default: 'Red'
        },
        btnClass: {
            typeof: String,
            default: ''
        }
    },
    methods: {
        onClick() {
            console.log('Button clicked')
        }
    }
}
</script>

<style scoped>
button {
    cursor: pointer;
    border-radius: 4px;
    border: none;
    padding: 10px;
    margin: 20px;
    box-shadow:
        0 8px 16px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: 0.4s;
}

button:hover {
    box-shadow:
        0 12px 16px 0 rgba(0, 0, 0, 0.24),
        0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
