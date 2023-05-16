<template>
  <div v-if="!enableEdit && tag.length !== 0">
    <li>
      <span>{{ tag.tagName }}</span>
      <div v-if="isContactTag">
        <button v-if="removeTagAccess" class="delete" @click="removeContactTag">
          remove
        </button>
      </div>
      <div v-else-if="!isContactTag">
        <button v-if="editAccess" class="edit" @click="editTag">
          Edit Tag
        </button>
        <button v-if="removeAccess" class="delete" @click="deleteTag">
          Delete Tag
        </button>
      </div>
    </li>
  </div>
  <div v-else>
    <form class="tag-form" @submit.prevent="updateTag">
      <div>
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
import { checkUserRole } from "../../middleware/checkUserRole";
import { permission } from "../../constants/permission";
export default {
  props: ["tag", "isContactTag", "contact", "removeTagAccess"],
  data() {
    return {
      enableEdit: false,
      tagName: this.tag.tagName,
      removeAccess: checkUserRole(permission.TAG_REMOVE_PERMISSION),
      editAccess: checkUserRole(permission.TAG_EDIT_PERMISSION),
    };
  },
  methods: {
    editTag() {
      this.enableEdit = !this.enableEdit;
    },
    deleteTag() {
      Meteor.call("tag.remove", this.tag._id, (error, result) => {
        if (error) {
          // Handle error
          console.error(error);
        } else {
          this.$emit("tagUpdate", result); // Emit the event with the organization ID
        }
      });
    },
    updateTag() {
      this.enableEdit = !this.enableEdit;
      Meteor.call(
        "tag.edit",
        {
          _id: this.tag._id,
          tagName: this.tagName,
        },
        (error, result) => {
          if (error) {
            // Handle error
            console.error(error);
          } else {
            this.$emit("tagUpdate", result); // Emit the event with the organization ID
          }
        }
      );
    },
    removeContactTag() {
      const filteredTag = this.contact.tags.filter(
        (tag) => tag._id !== this.tag._id
      );
      Meteor.call(
        "contactTag.remove",
        this.contact._id,
        filteredTag,
        (error, result) => {
          if (error) {
            // Handle error
            console.error(error);
          } else {
            this.$emit("contactTagUpdate", result); // Emit the event with the organization ID
          }
        }
      );
    },
  },
};
</script>
