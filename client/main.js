import Vue from 'vue';
import { VueMeteor } from 'vue-meteor-tracker';
import '../imports/ui/plugins';

import App from '../imports/ui/App.vue';
Vue.use(VueMeteor);
Meteor.startup(() => {
	new Vue({
		el: '#app',
		...App,
	});
});
