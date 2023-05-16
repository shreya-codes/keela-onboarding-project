<template>
  <form className="new-org" @submit.prevent="addOrg">
    <div>
      <label for="Name">Organization Name</label>
      <input
        id="name"
        name="organization name"
        type="text"
        placeholder="Organization Name"
        required
        v-model="orgName"
        @input="validateField('name', $event.target.value)"
      />
      <div v-if="errors && errors.name" class="error">{{ errors.name }}</div>
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
        @input="validateField('email', $event.target.value)"
      />
      <div v-if="errors && errors.email" class="error">{{ errors.email }}</div>
    </div>
    <button type="submit">Add Organization</button>
  </form>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { validate } from "../../middleware/validation";

export default {
  name: "AddOrgForm",
  data() {
    return { orgName: "", email: "", errors: {} };
  },
  methods: {
    validateField(fieldName, field) {
      this.errors = {};
      this.errors = validate(fieldName, field);
    },
    addOrg(event) {
      Meteor.call(
        "organizations.create",
        {
          name: this.orgName,
          email: this.email,
        },
        (error, result) => {
          if (error) {
            // Handle error
            console.error(error);
          } else {
            this.$emit("orgUpdate", result); // Emit the event with the organization ID
          }
        }
      );
      this.orgName = "";
      this.email = "";
    },
  },
};
</script>
