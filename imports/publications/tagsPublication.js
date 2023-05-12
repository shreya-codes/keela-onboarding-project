import { Meteor } from "meteor/meteor";
import { TagCollection } from "../db/TagCollection";
Meteor.publish("tags", function publishOrganizations() {
  return TagCollection.find({});
});
