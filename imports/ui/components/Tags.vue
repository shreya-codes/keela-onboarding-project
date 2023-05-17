<template>
  <div class="app">
    <div class="main">
      <template v-if="currentUser">
        <div class="loading" v-if="!$subReady.tags">Loading ......</div>
        <div v-if="createAccess">
          <div><AddTagForm /></div>
          <div>
            <TagList
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
      viewAccess: checkUserRole(permission.TAG_VIEW_PERMISSION),
      createAccess: checkUserRole(permission.TAG_CREATE_PERMISSION),
      currentUser: Meteor.user(),
    };
  },
  meteor: {
    $subscribe: {
      tags: [],
    },
    tags() {
      if (!Meteor.user()) {
        return [];
      }

      const tags = TagCollection.find({}).fetch();
      return tags;
    },
  },
};
</script>
<style>
div {
  padding: 10px;
}
</style>
