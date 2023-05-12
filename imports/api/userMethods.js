import { check } from "meteor/check";
import { UserCollection } from "../db/UsersCollection";
import { roles } from "../constants";

Meteor.methods({
  "users.insert"(user) {
    console.log(user, "------");
    Accounts.createUser({
      username: user.name,
      password: user.password,
      profile: {
        role: user.role,
        orgId: user.org,
      },
    });
  },
  "users.remove"(usersId) {
    check(usersId, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    usersCollection.remove(usersId);

    console.log("removed users");
  },
  "users.edit"(user) {
    console.log(user);
    Meteor.users.update(user._id, {
      $set: {
        username: user.username,
        "profile.role": user.profile.role,
        "profile.org": user.profile.org,
      },
    });
  },
});
