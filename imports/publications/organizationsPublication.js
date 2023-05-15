import { Meteor } from "meteor/meteor";
import { OrganizationsCollection } from "../db/OrganizationsCollection";

Meteor.publish("organizations", function publishOrganizations() {
  const org = OrganizationsCollection.find({});
  console.log(org, "org in pub");
  return org;
});
