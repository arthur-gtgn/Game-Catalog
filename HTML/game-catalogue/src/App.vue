<template>
    <div class="container">
        <TutoHeader title="Task Tracker" />
        <TutoTasks :tasks="tasks"></TutoTasks>
    </div>
</template>

<script>
import TutoHeader from './components/TutoHeader.vue'
import TutoTasks from './components/TutoTasks.vue'

export default {
    name: 'App',
    components: {
        TutoHeader,
        TutoTasks
    },
    data() {
        return {
            tasks: []
        }
    },
    created() {
        this.tasks = [
            {
                id: 1,
                text: 'Java Programming',
                day: 'October 1st at 9:00am',
                reminder: true
            },
            {
                id: 2,
                text: 'Networks',
                day: 'October 2nd at 9:00am',
                reminder: false
            },
            {
                id: 3,
                text: 'Advanced Web Programming',
                day: 'October 3rd at 9:00am',
                reminder: false
            },
            {
                id: 4,
                text: 'Operating Systems',
                day: 'October 4th at 2:00pm',
                reminder: true
            },
            {
                id: 5,
                text: 'Computer Architecture',
                day: 'October 5th at 2:00pm',
                reminder: false
            }
        ]
    }
}
</script>

<style scoped>
.container {
    align-items: center;
    justify-content: space-between;
    border: solid 3px black;
    border-radius: 8px;
    padding: 50px;
}
</style>
