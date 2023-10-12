<template>
    <header>
        <h1>{{ title }}</h1>
        <TutoButton class="addTask" color="green" label="Add Task" />
    </header>
</template>

<script>
import TutoButton from '@/components/TutoButton.vue'
export default {
    name: 'TutoHeader',
    props: {
        title: String
    },
    components: {
        TutoButton
    }
}
</script>

<style scoped>
header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 30px;
}
</style>
