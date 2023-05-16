<template>
  <div class="app">
    <div class="main">
      <template v-if="currentUser">
        <div class="loading" v-if="!$subReady.contacts">Loading ......</div>
        <div v-if="createAccess">
          <div>
            <AddContactForm @contactUpdate="handleContactUpdate" />
          </div>
        </div>

        <div>
          <ContactList
            @contactUpdate="handleContactUpdate"
            v-if="viewAccess"
            v-for="contact in contacts"
            v-bind:key="contact._id"
            v-bind:contact="contact"
          />
        </div>
      </template>
      <template v-else><LoginForm /></template>
    </div>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { LoginForm, AddContactForm, ContactList } from "../components/index";

import { ContactsCollection } from "../../db/ContactsCollection";
import { roles } from "../../constants/roles";
import { checkUserRole } from "../../middleware/checkUserRole";
import { permission } from "../../constants/permission";
export default {
  components: {
    ContactList,
    AddContactForm,
    LoginForm,
  },
  data() {
    return {
      roles: roles,
      viewAccess: checkUserRole(permission.CONTACT_VIEW_PERMISSION),
      createAccess: checkUserRole(permission.CONTACT_CREATE_PERMISSION),
      contactList: [],
    };
  },
  meteor: {
    $subscribe: {
      tags: [],
      contacts: [],
    },
    currentUser() {
      return Meteor.user();
    },
  },
  methods: {
    handleContactUpdate() {
      const contact = ContactsCollection.find().fetch();
      if (contact) {
        this.contactList = contact;
      }
    },
  },
  meteor: {
    $subscribe: {
      contacts: [],
    },
    currentUser() {
      return Meteor.user();
    },
  },
  computed: {
    contacts() {
      if (!this.currentUser) {
        return [];
      }

      const contacts = ContactsCollection.find({}).fetch();
      this.contactList = contacts;
      return this.contactList;
    },
    tags() {
      if (!this.currentUser) {
        return [];
      }

      const tags = TagCollection.find({}).fetch();
      return tags;
    },
  },
};
</script>
<style>
div {
  padding: 10px;
}
</style>
