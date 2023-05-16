import { check } from "meteor/check";
import { OrganizationsCollection } from "../db/OrganizationsCollection";
import { permission } from "../constants/permission";
import { checkUserRole } from "../middleware/checkUserRole";
Meteor.methods({
  "organizations.create"(orgs) {
    const currentUser = Meteor.user();
    check(orgs, Object);
    if (!orgs) {
      throw new Meteor.Error("Organizations is undefined");
    }
    if (checkUserRole(permission.ORG_CREATE_PERMISSION)) {
      if (currentUser)
        OrganizationsCollection.insert({
          name: orgs.name,
          email: orgs.email,
          createdAt: new Date(),
          createdBy: currentUser._id,
        });
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
  "organizations.fetch"() {
    if (checkUserRole(permission.ORG_VIEW_PERMISSION)) {
      return OrganizationsCollection.find({}).fetch();
    }
    if (!orgs) {
      throw new Meteor.Error("Organizations is undefined");
    }
  },
  "organizations.remove"(orgId) {
    check(orgId, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    if (checkUserRole(permission.ORG_REMOVE_PERMISSION)) {
      OrganizationsCollection.remove(orgId);
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
  "organizations.edit"(org) {
    if (checkUserRole(permission.ORG_EDIT_PERMISSION)) {
      OrganizationsCollection.update(org._id, {
        $set: {
          name: org.name,
          email: org.email,
          modifiedBy: this.userId,
          modifiedAt: new Date(),
        },
      });
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
});
