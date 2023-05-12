<template>
  <form class="contact-form" @submit.prevent="addContact">
    <div>
      {{ contactTags }}
      <label for="firstName">First Name</label>
      <input
        id="firstName"
        name="first name"
        type="text"
        placeholder="First Name"
        required
        v-model="firstName"
      />
    </div>
    <div>
      <label for="lastName">Last Name</label>
      <input
        id="lastName"
        name="Last Name"
        type="text"
        placeholder="Last Name"
        required
        v-model="lastName"
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
    <div>
      <label for="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        type="text"
        placeholder="phone"
        required
        v-model="phone"
      />
    </div>
    <div>
      <label>Select tags:</label>
      <MultiSelect
        v-model="selectedTags"
        :options="tags"
        :multiple="true"
        :close-on-select="false"
        placeholder="Select Tags"
      >
        {{ tags.name }}</MultiSelect
      >
    </div>
    <div>
      <button type="submit">Add Contact</button>
    </div>
  </form>
</template>

<script>
import { Meteor } from "meteor/meteor";
import MultiSelect from "vue-multiselect";
export default {
  name: "AddContactForm",
  props: ["tags"],
  components: {
    MultiSelect,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      selectedTags: [],
      contactTags: [],
    };
  },
  methods: {
    addContact(event) {
      console.log(this.selectedTags, "------------ selected tags");
      Meteor.call("contact.insert", {
        firstName: this.firstName || "",
        lastName: this.lastName || "",
        phone: this.phone || "",
        email: this.email || "",
        tags: this.selectedTags,
      });
      (this.firstName = ""),
        (this.lastName = ""),
        (this.phone = ""),
        (this.email = "");
    },
    addTag(event) {
      this.contactTags = this.contactTags.push(this.tag.name);
      console.log(this.contactTags);
    },
  },
};
</script>
