import { Meteor } from "meteor/meteor";
import { TagCollection } from "../db/TagCollection";
Meteor.publish("tags", function publishOrganizations() {
  const currentUser = Meteor.user();
  if (currentUser && currentUser.profile && currentUser.profile.orgId) {
    return TagCollection.find({ orgId: currentUser.profile.orgId });
  }
  return TagCollection.find({});
});
