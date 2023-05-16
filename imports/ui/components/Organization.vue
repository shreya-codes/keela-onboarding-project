<template>
  <div class="app">
    <div class="main">
      <template v-if="currentUser">
        <div class="loading" v-if="!$subReady.organizations">
          Loading ......
        </div>
        <div v-if="createAccess">
          <div>
            <AddOrgForm @orgUpdate="handleOrgUpdate" />
          </div>
          <div v-if="viewAccess">
            <OrganizationList
              @orgUpdate="handleOrgUpdate"
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
import { checkUserRole } from "../../middleware/checkUserRole";
import { permission } from "../../constants/permission";
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
      viewAccess: checkUserRole(permission.ORG_VIEW_PERMISSION),
      createAccess: checkUserRole(permission.ORG_CREATE_PERMISSION),
    };
  },
  methods: {
    logout() {
      Meteor.logout();
    },
    handleOrgUpdate() {
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
