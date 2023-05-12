import { check } from "meteor/check";
import { TagCollection } from "../db/TagCollection";

Meteor.methods({
  "tag.insert"(tag) {
    check(tag, String);
    TagCollection.insert({
      tagName: tag,
      createdAt: new Date(),
      createdBy: this.userId,
    });
  },
  "tag.remove"(tagId) {
    check(tagId, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    TagCollection.remove(tagId);
  },
  "tag.edit"(tag) {
    TagCollection.update(tag._id, {
      $set: { ...tag },
    });
  },
});
