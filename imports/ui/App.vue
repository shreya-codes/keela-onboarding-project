<template>
  <div>
    <template v-if="currentUser">
      <div class="user" v-on:click="logout">
        {{ currentUser.username }}
      </div>
      <div>
        <div v-if="orgCreateAccess || orgViewAccess">
          <router-link to="/orgs"> Organization </router-link>
        </div>
        <div v-if="userCreateAccess || userViewAccess">
          <router-link to="/user"> Users </router-link>
        </div>
        <div v-if="contactCreateAccess || contactViewAccess">
          <router-link to="/contact"> Contacts </router-link>
        </div>
        <div v-if="tagCreateAccess || tagViewAccess">
          <router-link to="/tags">Tags</router-link>
        </div>
        <router-view></router-view>
      </div>
    </template>
    <template v-else>
      <LoginForm />
    </template>
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

import { checkUserRole } from "../middleware/checkUserRole";
import { permission } from "../constants/permission";

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
    orgCreateAccess() {
      return (
        this.currentUser &&
        checkUserRole(permission.ORG_CREATE_PERMISSION, this.currentUser)
      );
    },
    orgViewAccess() {
      return (
        this.currentUser &&
        checkUserRole(permission.ORG_VIEW_PERMISSION, this.currentUser)
      );
    },
    tagCreateAccess() {
      return (
        this.currentUser &&
        checkUserRole(permission.TAG_CREATE_PERMISSION, this.currentUser)
      );
    },
    tagViewAccess() {
      return (
        this.currentUser &&
        checkUserRole(permission.TAG_VIEW_PERMISSION, this.currentUser)
      );
    },
    contactCreateAccess() {
      return (
        this.currentUser &&
        checkUserRole(permission.CONTACT_CREATE_PERMISSION, this.currentUser)
      );
    },
    contactViewAccess() {
      return (
        this.currentUser &&
        checkUserRole(permission.CONTACT_VIEW_PERMISSION, this.currentUser)
      );
    },
    userCreateAccess() {
      return (
        this.currentUser &&
        checkUserRole(permission.USER_CREATE_PERMISSION, this.currentUser)
      );
    },
    userViewAccess() {
      return (
        this.currentUser &&
        checkUserRole(permission.USER_VIEW_PERMISSION, this.currentUser)
      );
    },
    organizations() {
      if (!this.currentUser) {
        return [];
      }
      const orgs = OrganizationsCollection.find({}).fetch();
      return orgs;
    },
    allUsers() {
      if (!this.currentUser) {
        return [];
      }
      const allUsers = Meteor.users.find({}).fetch();
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
