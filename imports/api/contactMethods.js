import { check } from "meteor/check";
import { ContactsCollection } from "../db/ContactsCollection";
import { checkUserRole } from "../middleware/checkUserRole";
import { permission } from "../constants/permission";
Meteor.methods({
  "contact.create"(contact) {
    const currentUser = Meteor.user();
    if (checkUserRole(permission.CONTACT_CREATE_PERMISSION)) {
      ContactsCollection.insert({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        email: contact.email,
        tags: contact.tags,
        orgId: currentUser.profile.orgId,
      });
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
  "contact.remove"(contactId) {
    check(contactId, String);
    if (checkUserRole(permission.CONTACT_REMOVE_PERMISSION)) {
      if (!this.userId) {
        throw new Meteor.Error("Not authorized.");
      }
      ContactsCollection.remove(contactId);
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
  "contact.edit"(contact) {
    if (checkUserRole(permission.CONTACT_EDIT_PERMISSION)) {
      ContactsCollection.update(contact._id, {
        $set: { ...contact },
      });
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
  "contactTag.remove"(contactId, filteredTag) {
    if (checkUserRole(permission.CONTACT_REMOVE_PERMISSION)) {
      ContactsCollection.update(contactId, {
        $set: {
          tags: filteredTag,
        },
      });
    } else {
      throw new Meteor.Error("Not authorized.");
    }
  },
});
