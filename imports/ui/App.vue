<template>
	<div class="app">
		<header>
			<div class="app-bar">
				<div class="app-header">
					<h1>To Do List</h1>
				</div>
			</div>
		</header>
		<div class="main">
			<template v-if="currentUser">
				<TaskForm />
				<div class="filter">
					<button @click="toggleHideCompleted">
						{{ this.hideCompleted }}
						<span v-if="hideCompleted">Show All</span>
						<span v-else>Hide Completed Tasks</span>
					</button>
				</div>
				<ul class="tasks">
					<Task
						class="task"
						v-for="task in tasks"
						v-bind:key="task._id"
						v-bind:task="task"
					/>
				</ul>
			</template>
			<template v-else><LoginForm /></template>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import Task from './components/Task.vue';
import { TasksCollection } from '../api/TasksCollection';
import TaskForm from './components/TaskForm.vue';
import LoginForm from './components/LoginForm.vue';

export default {
	components: {
		Task,
		TaskForm,
		LoginForm,
	},
	data() {
		return {
			hideCompleted: false,
		};
	},
	methods: {
		toggleHideCompleted() {
			this.hideCompleted = !this.hideCompleted;
		},
	},

	computed: {
		tasks() {
			if(!this.currentUser){return []}
			const hideCompletedFilter = {isChecked:{$ne:true}}
			let filteredTasks = TasksCollection.find({}).fetch();

			console.log(filteredTasks);
			if (this.hideCompleted) {
				filteredTasks = filteredTasks.filter((task) => !task.checked);
			}

			return filteredTasks;
		},
		incompleteCount() {
			return TasksCollection.find({ checked: { $ne: true } }).count();
		},
		currentUser() {
			return Meteor.user();
		},
	},
};
</script>
