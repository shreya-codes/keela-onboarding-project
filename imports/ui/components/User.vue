<template>
  <div class="app">
    <div class="main">
      <template v-if="currentUser">
        <div class="loading" v-if="!$subReady.allUsers">Loading ......</div>
        <div v-if="createAccess">
          <div>
            <AddUsersForm />
          </div>
          <div>
            <UsersList
              v-if="viewAccess"
              v-for="user in allUsers"
              v-bind:key="user._id"
              v-bind:user="user"
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
import { LoginForm, AddUsersForm, UsersList } from "../components/index";
import { roles } from "../../constants/roles";
import { checkUserRole } from "../../middleware/checkUserRole";
import { permission } from "../../constants/permission";
export default {
  components: {
    UsersList,
    AddUsersForm,
    LoginForm,
  },
  data() {
    return {
      roles: roles,
      viewAccess: checkUserRole(permission.USER_VIEW_PERMISSION),
      createAccess: checkUserRole(permission.USER_CREATE_PERMISSION),
      currentUser: Meteor.user(),
    };
  },

  meteor: {
    $subscribe: {
      allUsers: [],
    },

    allUsers() {
      if (!Meteor.user()) {
        return [];
      }
      const allUsers = Meteor.users.find({}).fetch();
      return allUsers;
    },
  },
};
</script>
<style>
div {
  padding: 10px;
}
</style>
