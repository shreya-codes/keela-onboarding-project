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
        @input="validateField('name', $event.target.value)"
      />
      <div v-if="errors && errors.name" class="error">{{ errors.name }}</div>
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
        @input="validateField('password', $event.target.value)"
      />
      <div v-if="errors && errors.password" class="error">
        {{ errors.password }}
      </div>
    </div>
    <div>
      <select v-model="selectedRole">
        <option value="">Select a Role</option>
        <option v-for="role in roles" v-bind:value="role" v-bind:key="role">
          {{ role }}
        </option>
      </select>
    </div>

    <div v-if="currentUser.profile.role !== roles.admin">
      <select v-model="selectedOrg">
        <option value="">Select an Org</option>
        <option
          v-for="org in organizations"
          v-bind:value="org"
          v-bind:key="org._id"
        >
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
import { roles } from "../../constants/roles";
import { OrganizationsCollection } from "../../db/OrganizationsCollection";
import { validate } from "../../middleware/validation";

export default {
  name: "AddUsersForm",
  data() {
    return {
      selectedOrg: {},
      roles: roles,
      selectedRole: "",
      name: "",
      password: "",
      errors: {},
    };
  },
  meteor: {
    $subscribe: {
      organizations: [],
    },
    currentUser() {
      return Meteor.user();
    },
  },
  methods: {
    validateField(fieldName, field) {
      this.errors = {};
      this.errors = validate(fieldName, field);
    },
    addUser() {
      Meteor.call(
        "users.create",
        {
          name: this.name,
          password: this.password,
          role: this.selectedRole,
          orgId:
            this.currentUser.profile.role === roles.admin
              ? this.currentUser.profile.orgId
              : this.selectedOrg._id,
          orgName:
            this.currentUser.profile.role === roles.admin
              ? this.currentUser.profile.orgName
              : this.selectedOrg.name,
        },
        (error, result) => {
          if (error) {
            // Handle error
            console.error(error);
          } else {
            this.$emit("userUpdate", result); // Emit the event with the organization ID
          }
        }
      );
      this.name = "";
      this.password = "";
      this.selectedRole = "";
      this.selectedOrg = {};
    },
  },
  computed: {
    organizations() {
      if (!this.currentUser) {
        return [];
      }
      const orgs = OrganizationsCollection.find({}).fetch();
      return orgs;
    },
  },
};
</script>
;
