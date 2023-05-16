<template>
  <div>
    <div class="error" v-if="error">
      {{ error.message }}
    </div>
    <form class="tag-form" @submit.prevent="addTag">
      <div>
        <label for="tag">Tag Name</label>
        <input
          id="tag"
          name="tag"
          type="text"
          placeholder="Tag Name"
          required
          v-model="tag"
        />
      </div>

      <div>
        <button type="submit">Add Tag</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
export default {
  name: "AddTagForm",
  data() {
    return {
      tag: "",
      error: null,
    };
  },
  methods: {
    addTag() {
      Meteor.call("tag.create", this.tag, (error, result) => {
        if (error) {
          // Handle error
          console.error(error);
          this.error = error;
        } else {
          this.$emit("tagUpdate", result); // Emit the event with the organization ID
        }
      });
      this.tag = "";
    },
  },
};
</script>
