<template>
	<form className="new-task" @submit.prevent="handleSubmit">
		<input type="text" placeholder="Type to add new tasks" v-model="newTask" />
		<button type="submit">Add Task</button>
	</form>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { TasksCollection } from '../../api/TasksCollection'

export default {
	data() {
		return { newTask: 'newtask' };
	},
	methods: {
		handleSubmit(event) {
			if(this.newTask.length === 0 ){return;}
			const user = Meteor.user()
			TasksCollection.insert({
				text:this.newTask,
				createdAt:new Date(),
				userId:user._id
			})
			this.newTask=''
        },
	},
};
</script>
