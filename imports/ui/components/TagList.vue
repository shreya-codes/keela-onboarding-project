<template>
  --------------{{ tag }}
  <div v-if="!enableEdit">
    <li>
      <span>{{ tag.tagName }}</span>
      <button class="edit" @click="editTag">edit</button>
      <button class="delete" @click="deleteTag">delete</button>
    </li>
  </div>
  <div v-else>
    <form class="tag-form" @submit.prevent="updateTag">
      <div>
        {{ this.tag.tagName }}
        <label for="tag">Tag Name</label>
        <input
          id="tag"
          name="tag"
          type="text"
          placeholder="Tag Name"
          required
          v-model="tagName"
        />
      </div>

      <div>
        <button type="submit">Update Tag</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
export default {
  props: ["tag"],
  data() {
    return { enableEdit: false, tagName: this.tag.tagName };
  },
  methods: {
    editTag() {
      this.enableEdit = !this.enableEdit;
    },
    deleteTag() {
      Meteor.call("tag.remove", this.tag._id);
    },
    updateTag() {
      this.enableEdit = !this.enableEdit;
      Meteor.call("tag.edit", {
        _id: this.tag._id,
        tagName: this.tagName,
      });
    },
  },
};
</script>
