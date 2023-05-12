<template>
  <div v-if="!enableEdit">
    <li>
      <span>{{ this.contact.firstName }} {{ this.contact.lastName }}</span>
      <p>
        Email: <span>{{ contact.email }}</span>
      </p>
      <p>
        Phone:<span>{{ contact.phone }}</span>
      </p>
      <p>
        tags:<span v-for="tag in contact.tags"> </span>
        <TagList
          v-for="tag in contact.tags"
          v-bind:key="tag._id"
          v-bind:tag="tag"
        />
      </p>
      <button class="edit" @click="editContact">edit</button>
      <button class="delete" @click="deleteContact">delete</button>
    </li>
  </div>
  <div v-else>
    <form class="contact-form" @submit.prevent="updateContact">
      <div>
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
        <button type="submit">Update Contact</button>
      </div>
    </form>
  </div>
</template>

<script>
import TagList from "./TagList.vue";
export default {
  props: ["contact"],
  components: { TagList },
  data() {
    return {
      enableEdit: false,
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      phone: this.contact.phone,
      email: this.contact.email,
    };
  },
  methods: {
    editContact() {
      this.enableEdit = !this.enableEdit;
    },
    deleteContact() {
      Meteor.call("contact.remove", this.contact._id);
    },
    updateContact() {
      this.enableEdit = !this.enableEdit;

      Meteor.call("contact.edit", {
        _id: this.contact._id,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        email: this.email,
      });
    },
  },
};
</script>
