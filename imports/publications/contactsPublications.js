import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "../db/ContactsCollection";

Meteor.publish("contacts", function publishContacts() {
  const currentUser = Meteor.user();
  return ContactsCollection.find({
    orgId: currentUser.profile.orgId,
  });
});
