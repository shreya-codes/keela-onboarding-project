<template>
  <form class="user-form" @submit.prevent="addUser">
    <div>
      <label for="name">user name</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="User Name "
        required
        v-model="name"
      />
    </div>
    <div>
      <label for="password">user password</label>
      <input
        id="password"
        name="password"
        type="text"
        placeholder="User password "
        required
        v-model="password"
      />
    </div>
    <div>
      <select v-model="selectedRole">
        <option value="">Select a Role</option>
        <option v-for="role in roles" v-bind:value="role" v-bind:key="role">
          {{ role }}
        </option>
      </select>
    </div>

    <div>
      <select v-model="selectedOrg">
        <option value="">Select an Org</option>
        <option v-for="org in orgs" v-bind:value="org" v-bind:key="org._id">
          {{ org.name }}
        </option>
      </select>
    </div>
    <div>
      <button type="submit">Add User</button>
    </div>
  </form>
</template>
;

<script>
import { Meteor } from "meteor/meteor";
import { roles } from "../../constants/index";
export default {
  name: "AddForm",
  props: ["orgs"],
  data() {
    return {
      selectedOrg: {},
      roles: roles,
      selectedRole: "",
      name: "",
      password: "",
    };
  },
  methods: {
    addUser() {
      Meteor.call("users.insert", {
        name: this.name,
        password: this.password,
        role: this.selectedRole,
      });
    },
  },
};
</script>
;
