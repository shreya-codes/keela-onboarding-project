<template>
  <div class="app">
    <div class="main">
      <template v-if="currentUser">
        <div class="user" v-on:click="logout">
          {{ currentUser.username }} 🚪
        </div>
        {{ orgList }}
        <div class="loading" v-if="!$subReady.organizations">
          Loading ......
        </div>
        <div v-if="currentUser.profile.role === roles.keelaAdmin">
          <div>
            <AddOrgForm @orgUpdate="handleOrgAdded" />
          </div>
          <div>
            <OrganizationList
              v-for="org in organizations"
              v-bind:key="org._id"
              v-bind:org="org"
            />
          </div>
        </div>
      </template>
      <template v-else><LoginForm /></template>
    </div>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { LoginForm, AddOrgForm, OrganizationList } from "../components/index";

import { OrganizationsCollection } from "../../db/OrganizationsCollection";
import { roles } from "../../constants/roles";
export default {
  components: {
    OrganizationList,
    AddOrgForm,
    LoginForm,
  },
  data() {
    return {
      roles: roles,
      orgList: [],
    };
  },
  methods: {
    logout() {
      Meteor.logout();
    },
    handleOrgAdded(orgId) {
      console.log("here");
      const org = OrganizationsCollection.find().fetch();
      if (org) {
        this.orgList = org;
      }
    },
  },
  meteor: {
    $subscribe: {
      organizations: [],
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
      const orgs = OrganizationsCollection.find().fetch();
      this.orgList = orgs;
      return this.orgList;
    },
  },
};
</script>
<style>
div {
  padding: 10px;
}
</style>
