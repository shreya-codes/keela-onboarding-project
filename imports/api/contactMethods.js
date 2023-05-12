import { check } from "meteor/check";
import { ContactsCollection } from "../db/ContactsCollection";
Meteor.methods({
  "contact.insert"(contact) {
    ContactsCollection.insert({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      email: contact.email,
      tags: contact.tags,
    });
  },
  "contact.remove"(contactId) {
    check(contactId, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    ContactsCollection.remove(contactId);
  },
  "contact.edit"(contact) {
    ContactsCollection.update(contact._id, {
      $set: { ...contact },
    });
  },
  "contactTag.remove"(contactId, filteredTag) {
    ContactsCollection.update(contactId, {
      $set: {
        tags: filteredTag,
      },
    });
  },
});
