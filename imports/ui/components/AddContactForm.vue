<template>
  <form class="contact-form" @submit.prevent="addContact">
    <div>
      <label for="firstName">First Name</label>
      <input
        id="firstName"
        name="first name"
        type="text"
        placeholder="First Name"
        required
        v-model="firstName"
        @input="validateField('name', $event.target.value)"
      />
      <div v-if="errors && errors.name" class="error">{{ errors.name }}</div>
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
    <div>
      <label for="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        type="text"
        placeholder="phone"
        required
        v-model="phone"
        @input="validateField('phone', $event.target.value)"
      />
      <div v-if="errors && errors.phone" class="error">{{ errors.phone }}</div>
    </div>
    <div>
      <label>Select tags:</label>
      <MultiSelect
        v-model="selectedTags"
        label="tagName"
        track-by="tagName"
        :taggable="true"
        :options="tags"
        :multiple="true"
        :close-on-select="false"
        placeholder="Select Tags"
      >
        <template v-slot:option="{ option }">
          {{ option.tagName }}
        </template>
      </MultiSelect>
    </div>
    <div>
      <button type="submit">Add Contact</button>
    </div>
  </form>
</template>

<script>
import { Meteor } from "meteor/meteor";
import MultiSelect from "vue-multiselect";
import { TagCollection } from "../../db/TagCollection";
import { validate } from "../../middleware/validation";

export default {
  name: "AddContactForm",
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
      currentUser: Meteor.user(),
      errors: {},
    };
  },
  meteor: {
    $subscribe: {
      tags: [],
    },
  },
  methods: {
    validateField(fieldName, field) {
      this.errors = {};
      this.errors = validate(fieldName, field);
    },
    onTagSelect(tag) {
      this.selectedTags.push(tag);
    },
    addContact() {
      Meteor.call(
        "contact.create",
        {
          firstName: this.firstName || "",
          lastName: this.lastName || "",
          phone: this.phone || "",
          email: this.email || "",
          tags: this.selectedTags,
          orgId: this.currentUser.profile.orgId,
        },
        (error, result) => {
          if (error) {
            // Handle error
            console.error(error);
          } else {
            this.$emit("contactUpdate", result); // Emit the event with the organization ID
          }
        }
      );
      (this.firstName = ""),
        (this.lastName = ""),
        (this.phone = ""),
        (this.email = "");
    },
  },
  computed: {
    tags() {
      if (!this.currentUser) {
        return [];
      }

      const tags = TagCollection.find({}).fetch();
      return tags;
    },
  },
};
</script>
