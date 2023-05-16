import { check } from "meteor/check";
import { TagCollection } from "../db/TagCollection";
import { checkUserRole } from "../middleware/checkUserRole";
import { permission } from "../constants/permission";
Meteor.methods({
  "tag.create"(tag) {
    const currentUser = Meteor.user();
    check(tag, String);
    if (checkUserRole(permission.TAG_CREATE_PERMISSION)) {
      TagCollection.insert({
        tagName: tag,
        createdAt: new Date(),
        createdBy: this.userId,
        orgId: currentUser.profile.orgId,
      });
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
  "tag.remove"(tagId) {
    check(tagId, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    if (checkUserRole(permission.TAG_REMOVE_PERMISSION)) {
      TagCollection.remove(tagId);
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
  "tag.edit"(tag) {
    if (checkUserRole(permission.TAG_EDIT_PERMISSION)) {
      TagCollection.update(tag._id, {
        $set: { ...tag },
      });
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
});
