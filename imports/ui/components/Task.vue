<template>
	<li v-bind:class="taskClassName">
		<input
			type="checkbox"
			readonly
			v-bind:checked="!!this.task.checked"
			@click="toggleChecked"
		/>
		<span class="text"> {{ this.task.text }}</span>
		<button class="delete" @click="deleteThisTask">X</button>
	</li>
</template>

<script>
// import { VueMeteor } from 'vue-meteor-tracker';
import { TasksCollection } from '../../db/TasksCollection';
export default {
	props: ['task'],
	data() {
		return {};
	},
	computed: {
		taskClassName: function () {
			return this.task.checked ? 'checked' : '';
		},
	},
	methods: {
		toggleChecked() {
			Meteor.call('tasks.setIsChecked',this.task._id,!this.task.isChecked)
			// TasksCollection.update(this.task._id, {
			// 	$set: { checked: !this.task.checked },
			// });
		},
		deleteThisTask() {
			
			Meteor.call('tasks.remove',this.task._id)
			// TasksCollection.remove(this.task._id);
		},
	},
};
</script>
