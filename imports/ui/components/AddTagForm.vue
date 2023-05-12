<template>
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
</template>

<script>
import { Meteor } from "meteor/meteor";
export default {
  name: "AddTagForm",
  data() {
    return {
      tag: "",
    };
  },
  methods: {
    addTag() {
      Meteor.call("tag.insert", this.tag);
      this.tag = "";
    },
  },
};
</script>
