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
          (user.profile && user.profile.orgName) ||
          (user.profile && user.profile.orgId)
        }}</span>
      </p>
      <button v-if="editAccess" class="edit" @click="editUser">edit</button>
      <button
        class="delete"
        v-if="removeAccess && currentUser._id !== user._id"
        @click="deleteUser"
      >
        delete
      </button>
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
        <button type="submit">Update User</button>
      </div>
    </form>
  </div>
</template>

<script>
import { roles } from "../../constants/roles";
import { checkUserRole } from "../../middleware/checkUserRole";
import { permission } from "../../constants/permission";
export default {
  props: ["user", "orgs"],
  data() {
    return {
      removeAccess: checkUserRole(permission.TAG_REMOVE_PERMISSION),
      editAccess: checkUserRole(permission.TAG_EDIT_PERMISSION),

      enableEdit: false,
      name: this.user.username,
      password: this.user.password,
      roles: roles,
      selectedRole: this.user.profile ? this.user.profile.role : "",
      currentUser: Meteor.user(),
    };
  },

  methods: {
    editUser() {
      this.enableEdit = !this.enableEdit;
    },
    deleteUser() {
      Meteor.call("users.remove", this.user._id, (error, result) => {
        if (error) {
          // Handle error
          console.error(error);
        }
      });
    },
    updateUser() {
      this.enableEdit = !this.enableEdit;
      let user = {
        _id: this.user._id,
        profile: {
          role: this.selectedRole,
        },
      };
      if (this.name !== this.user.username) {
        user.username = this.name;
      }
      Meteor.call("users.edit", user, (error, result) => {
        if (error) {
          // Handle error
          console.error(error);
        }
      });
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
