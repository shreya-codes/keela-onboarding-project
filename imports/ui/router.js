import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import { LoginForm } from "./components/LoginForm.vue";
import {
  AddOrgForm,
  AddTagForm,
  AddUsersForm,
  AddContactForm,
  ContactList,
  OrganizationList,
  TagList,
  UsersList,
} from "./components/index.js";

export const routes = [
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
];
