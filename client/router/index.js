import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import {
  LoginForm,
  AddContactForm,
  AddOrgForm,
  AddTagForm,
  AddUsersForm,
  ContactList,
  OrganizationList,
  TagList,
  UsersList,
  Organization,
} from "../../imports/ui/components";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/addOrg",
    name: "AddOrg",
    component: AddOrgForm,
  },
  {
    path: "/addTag",
    name: "AddTag",
    component: AddTagForm,
  },
  {
    path: "/addUser",
    name: "AddUser",
    component: AddUsersForm,
  },
  {
    path: "/addContact",
    name: "AddContact",
    component: AddContactForm,
  },
  {
    path: "/contacts",
    name: "ContactList",
    component: ContactList,
  },
  {
    path: "/organizations",
    name: "OrganizationList",
    component: OrganizationList,
  },
  {
    path: "/tags",
    name: "TagList",
    component: TagList,
  },
  {
    path: "/users",
    name: "UsersList",
    component: UsersList,
  },
  {
    path: "/orgs",
    name: "Orgs",
    component: Organization,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
