<template>
  <div class="app">
    <div class="main">
      <template v-if="currentUser">
        <div class="user" v-on:click="logout">
          {{ currentUser.username }} 🚪
        </div>
        <div class="loading" v-if="!$subReady.organizations">
          Loading ......
        </div>
        <div v-if="currentUser.profile.role === roles.keelaAdmin">
          <div>
            <AddOrgForm />
          </div>
          <div>
            <OrganizationList
              v-for="org in organizations"
              v-bind:key="org._id"
              v-bind:org="org"
            />
          </div>
        </div>

        <div>
          <AddTagForm />
        </div>

        <div>
          <TagList v-for="tag in tags" v-bind:key="tag._id" v-bind:tag="tag" />
        </div>
        <div><AddUsersForm v-bind:orgs="organizations" /></div>
        <div>
          <UsersList
            v-for="user in allUsers"
            v-bind:key="user._id"
            v-bind:user="user"
            v-bind:orgs="organizations"
          />
        </div>
        <div>
          <AddContactForm v-bind:tags="tags" />
        </div>
        <div>
          <ContactList
            v-for="contact in contacts"
            v-bind:key="contact._id"
            v-bind:contact="contact"
            v-bind:tags="tags"
          />
        </div>
      </template>
      <template v-else><LoginForm /></template>
    </div>
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
} from "./components";

import { OrganizationsCollection } from "../db/OrganizationsCollection";
import { TagCollection } from "../db/TagCollection";
import { ContactsCollection } from "../db/ContactsCollection";
import { roles } from "../constants";
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
<style>
div {
  padding: 10px;
}
</style>
