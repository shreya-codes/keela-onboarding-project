import { check } from "meteor/check";
import { checkUserRole } from "../middleware/checkUserRole";
import { permission } from "../constants/permission";

Meteor.methods({
  "users.create"(user) {
    if (user.role == "" || user.orgId == "" || !user.orgId || !user.role) {
      throw new Meteor.Error("All fields needs to be filled");
    }
    if (checkUserRole(permission.USER_CREATE_PERMISSION)) {
      Accounts.createUser({
        username: user.name,
        password: user.password,
        profile: {
          role: user.role,
          orgId: user.orgId,
          orgName: user.orgName,
        },
      });
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
  "users.remove"(userId) {
    check(userId, String);
    if (checkUserRole(permission.USER_REMOVE_PERMISSION)) {
      if (!this.userId) {
        throw new Meteor.Error("Not authorized.");
      }
      if (this.userId === userId) {
        throw new Meteor.Error("Users cannot delete Themself");
      }
      Meteor.users.remove(userId);
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
  "users.edit"(user) {
    if (checkUserRole(permission.USER_EDIT_PERMISSION)) {
      Meteor.users.update(user._id, {
        $set: {
          username: user.username,
          "profile.role": user.profile.role,
          "profile.org": user.profile.org,
        },
      });
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
});
