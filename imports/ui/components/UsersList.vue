<template>
  <div v-if="!enableEdit">
    <li>
      <span>{{ user.username }}</span>
      <p>
        Role: <span>{{ (user.profile && user.profile.role) || "" }}</span>
      </p>
      <p>
        Organization:
        <span>{{
          (user.profile && user.profile.org && user.profile.org.orgName) || ""
        }}</span>
      </p>
      <button class="edit" @click="editUser">edit</button>
      <button class="delete" @click="deleteUser">delete</button>
    </li>
  </div>
  <div v-else>
    <form class="user-form" @submit.prevent="updateUser">
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
        <select v-model="selectedRole">
          {{
            roles
          }}
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
        <button type="submit">Update User</button>
      </div>
    </form>
  </div>
</template>

<script>
import { roles } from "../../constants/roles";
export default {
  props: ["user", "orgs"],
  data() {
    return {
      enableEdit: false,
      name: this.user.username,
      password: this.user.password,
      selectedOrg: this.user.org ? this.user.org : {},
      roles: roles,
      selectedRole: this.user.profile ? this.user.profile.role : "",
    };
  },

  methods: {
    editUser() {
      this.enableEdit = !this.enableEdit;
    },
    deleteUser() {
      Meteor.call("users.remove", this.org._id);
    },
    updateUser(event) {
      console.log(this, "--- this ");
      this.enableEdit = !this.enableEdit;
      let user = {
        _id: this.user._id,
        profile: {
          role: this.selectedRole,
          org: {
            orgId: this.selectedOrg._id,
            orgName: this.selectedOrg.name,
          },
        },
      };
      if (this.name !== this.user.username) {
        user.username = this.name;
      }
      Meteor.call("users.edit", user);
    },
  },
};
</script>
