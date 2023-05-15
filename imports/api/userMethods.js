import { check } from "meteor/check";

Meteor.methods({
  "users.insert"(user) {
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
    if (this.userId === userId) {
      throw new Meteor.Error("Users cannot delete Themself");
    }
    usersCollection.remove(usersId);
  },
  "users.edit"(user) {
    Meteor.users.update(user._id, {
      $set: {
        username: user.username,
        "profile.role": user.profile.role,
        "profile.org": user.profile.org,
      },
    });
  },
});
