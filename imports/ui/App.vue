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
import { Meteor } from "meteor/meteor";
import Task from './components/Task.vue';
import { TasksCollection } from '../api/TasksCollection';
import TaskForm from './components/TaskForm.vue';
import LoginForm from './components/LoginForm.vue';

export default{
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
meteor:{
	currentUser() {
		console.log(Meteor.user())
			return Meteor.user();
		},
},
	computed: {
		tasks() {
			console.log('-----')
			if(!this.currentUser){
				return [];

			}
			const hideCompletedFilter={isChecked:{$ne:true}};
			const userFilter = this.currentUser ? {userId: this.currentUser._id}:{};
			const pendingOnlyFilter = {...hideCompletedFilter,...userFilter};
			const task= TasksCollection.find(
				this.hideCompleted ? pendingOnlyFilter : userFilter,{
					sort:{createdAt:-1},
				}
			).fetch();
			console.log(task)
			return task

		},
		incompleteCount() {
			return TasksCollection.find({ isChecked: { $ne: true } ,userId:this.currentUser._id});
		},
		
	},
};
</script>
