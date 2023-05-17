import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "../db/ContactsCollection";

Meteor.publish("contacts", function publishContacts() {
  const currentUser = Meteor.user();
  if (currentUser && currentUser.profile && currentUser.profile.orgId) {
    return ContactsCollection.find({
      orgId: currentUser.profile.orgId,
    });
  }
  return;
});
