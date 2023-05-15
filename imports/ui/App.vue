<template>
  <div>
    <div>
      <router-link to="/orgs"> Organization </router-link>
    </div>
    <div>
      <router-link to="/addOrg"> Add Organization </router-link>
    </div>
    <div>
      <router-link to="/addTag"> Add Tag </router-link>
    </div>
    <div>
      <router-link to="/addUser"> Add User </router-link>
    </div>
    <div>
      <router-link to="/addContact"> Add Organization </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import {
  LoginForm,
  AddOrgForm,
  AddTagForm,
  AddUsersForm,
  AddContactForm,
  ContactList,
  OrganizationList,
  TagList,
  UsersList,
} from "./components/index";

import { OrganizationsCollection } from "../db/OrganizationsCollection";
import { TagCollection } from "../db/TagCollection";
import { ContactsCollection } from "../db/ContactsCollection";
import { roles } from "../constants/roles";
export default {
  components: {
    LoginForm,
    OrganizationList,
    AddOrgForm,
    AddTagForm,
    AddUsersForm,
    TagList,
    ContactList,
    AddContactForm,
    UsersList,
  },
  data() {
    return {
      roles: roles,
    };
  },
  methods: {
    logout() {
      Meteor.logout();
    },
  },
  meteor: {
    $subscribe: {
      organizations: [],
      tags: [],
      contacts: [],
      allUsers: [],
      //   tasks: [],
    },
    currentUser() {
      return Meteor.user();
    },
  },
  computed: {
    organizations() {
      if (!this.currentUser) {
        return [];
      }
      const orgs = OrganizationsCollection.find({}).fetch();
      console.log(orgs, "======= orgs");
      return orgs;
    },
    allUsers() {
      if (!this.currentUser) {
        return [];
      }
      const allUsers = Meteor.users.find({}).fetch();
      console.log(allUsers, "============ all users ");
      return allUsers;
    },
    tags() {
      if (!this.currentUser) {
        return [];
      }

      const tags = TagCollection.find({}).fetch();
      return tags;
    },
    contacts() {
      if (!this.currentUser) {
        return [];
      }

      const contacts = ContactsCollection.find({}).fetch();
      return contacts;
    },
  },
};
</script>
