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
    <button type="submit">Register</button>
  </form>
</template>

<script>
import { Meteor } from "meteor/meteor";

export default {
  name: "LoginForm",
  data() {
    return { orgName: "", email: "" };
  },
  methods: {
    addOrg(event) {
      Meteor.call("organizations.create", {
        name: this.orgName,
        email: this.email,
      });
      this.orgName = "";
      this.email = "";
    },
  },
};
</script>
