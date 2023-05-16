import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import {
  LoginForm,
  Organization,
  Tags,
  User,
  Contact,
} from "../../imports/ui/components";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/orgs",
    name: "Orgs",
    component: Organization,
  },
  {
    path: "/tags",
    name: "Tags",
    component: Tags,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
