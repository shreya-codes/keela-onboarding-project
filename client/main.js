import Vue from "vue";
import { VueMeteor } from "vue-meteor-tracker";

import Router from "vue-router";
import "../imports/ui/plugins";

import App from "../imports/ui/App.vue";
import router from "../client/router/index.js";

Vue.use(Router);
Meteor.startup(() => {
  Vue.use(VueMeteor);
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
});
