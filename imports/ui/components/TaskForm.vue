<template>
	<form className="new-task" @submit.prevent="handleSubmit">
		<input type="text" placeholder="Type to add new tasks" v-model="newTask" />
		<button type="submit">Add Task</button>
	</form>
</template>

<script>    
import { TasksCollection } from '../../api/TasksCollection'

export default {
	data() {
		return { newTask: 'dsfdsdf' };
	},
	methods: {
		handleSubmit(event) {
            console.log(this.newTask)
TasksCollection.insert({
    text:this.newTask,createdAt:new Date()
})
this.newTask=''
        },
	},
};
</script>
