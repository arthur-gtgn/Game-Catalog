<template>
    <div :key="task.id" v-for="task in tasks">
        <TutoTask :task="task" />
    </div>
</template>

<script>
import TutoTask from './TutoTask.vue'
export default {
    name: 'TutoTasks',
    props: {
        tasks: Array
    },
    components: {
        TutoTask
    }
}
</script>

<style scoped></style>
