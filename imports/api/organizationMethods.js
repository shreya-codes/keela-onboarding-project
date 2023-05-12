import { check } from "meteor/check";
import { OrganizationsCollection } from "../db/OrganizationsCollection";
Meteor.methods({
  "organizations.create"(orgs) {
    const currentUser = Meteor.user();
    check(orgs, Object);
    if (!orgs) {
      throw new Meteor.Error("Organizations is undefined");
    }
    if (currentUser)
      OrganizationsCollection.insert({
        name: orgs.name,
        email: orgs.email,
        createdAt: new Date(),
        createdBy: currentUser._id,
      });
  },
  "organizations.fetch"() {
    return OrganizationsCollection.find({}).fetch();
  },
  "organizations.remove"(orgId) {
    check(orgId, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    OrganizationsCollection.remove(orgId);
  },
  "organizations.edit"(org) {
    OrganizationsCollection.update(org._id, {
      $set: {
        name: org.name,
        email: org.email,
        modifiedBy: this.userId,
        modifiedAt: new Date(),
      },
    });
  },
});
