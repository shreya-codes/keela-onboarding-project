<template>
  <div class="app">
    <div class="main">
      <template v-if="currentUser">
        <div class="loading" v-if="!$subReady.tags">Loading ......</div>
        <div v-if="createAccess">
          <div><AddTagForm @tagUpdate="handleTagUpdate" /></div>
          <div>
            <TagList
              @tagUpdate="handleTagUpdate"
              v-if="viewAccess"
              v-for="tag in tags"
              v-bind:key="tag._id"
              v-bind:tag="tag"
            />
          </div>
        </div>
      </template>
      <template v-else><LoginForm /></template>
    </div>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { LoginForm, AddTagForm, TagList } from "../components/index";

import { TagCollection } from "../../db/TagCollection";
import { roles } from "../../constants/roles";
import { checkUserRole } from "../../middleware/checkUserRole";
import { permission } from "../../constants/permission";
export default {
  components: {
    TagList,
    AddTagForm,
    LoginForm,
  },
  data() {
    return {
      roles: roles,
      tagList: [],
      viewAccess: checkUserRole(permission.TAG_VIEW_PERMISSION),
      createAccess: checkUserRole(permission.TAG_CREATE_PERMISSION),
    };
  },
  methods: {
    handleTagUpdate() {
      const tag = TagCollection.find().fetch();
      if (tag) {
        this.tagList = tag;
      }
    },
  },
  meteor: {
    $subscribe: {
      tags: [],
    },
    currentUser() {
      return Meteor.user();
    },
  },
  computed: {
    tags() {
      if (!this.currentUser) {
        return [];
      }

      const tags = TagCollection.find({}).fetch();
      this.tagList = tags;
      return this.tagList;
    },
  },
};
</script>
<style>
div {
  padding: 10px;
}
</style>
