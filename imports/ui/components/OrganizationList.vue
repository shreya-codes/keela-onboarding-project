<template>
  <div v-if="!enableEdit">
    <div>
      <li>
        <span>{{ org.name }}</span>
        <div>
          Email:<span>{{ org.email }}</span>
        </div>
        <button class="edit" @click="editOrg">edit</button>
        <button class="delete" @click="deleteOrg">delete</button>
      </li>
    </div>
  </div>
  <div v-else>
    <form class="new-org" @submit.prevent="updateOrg">
      <div>
        <label for="name">Organization Name</label>
        <input
          id="name"
          name="organization name"
          type="text"
          placeholder="Organization Name"
          required
          v-model="orgName"
        />
      </div>
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          v-model="email"
        />
      </div>
      <button type="submit">save</button>
    </form>
  </div>
</template>

<script>
import { OrganizationsCollection } from "../../db/OrganizationsCollection";
export default {
  props: ["org"],
  data() {
    return {
      enableEdit: false,
      orgName: this.org.name,
      email: this.org.email,
    };
  },
  meteor: {
    $subscribe: {
      organizations: [],
    },
    organizations() {
      return OrganizationsCollection.find().fetch();
    },
  },
  methods: {
    editOrg() {
      this.enableEdit = !this.enableEdit;
    },
    deleteOrg() {
      Meteor.call("organizations.remove", this.org._id, (error, result) => {
        if (error) {
          console.error(error);
        }
      });
    },
    updateOrg(event) {
      this.enableEdit = !this.enableEdit;
      Meteor.call(
        "organizations.edit",
        {
          _id: this.org._id,
          name: this.orgName,
          email: this.email,
        },
        (error, result) => {
          if (error) {
            // Handle error
            console.error(error);
          }
        }
      );
    },
  },
};
</script>
