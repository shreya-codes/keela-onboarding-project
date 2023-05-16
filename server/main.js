import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

//collection
import { OrganizationsCollection } from "../imports/db/OrganizationsCollection.js";
import { UsersCollection } from "../imports/db/UsersCollection.js";
import { TagCollection } from "../imports/db/TagCollection.js";
import { ContactsCollection } from "../imports/db/ContactsCollection.js";

//methods
import {
  contactMethods,
  organizationMethods,
  TagsMethodtas,
  userMethods,
} from "../imports/api/index.js";

//publications
import "../imports/publications/organizationsPublication.js";
import "../imports/publications/contactsPublications.js";
import "../imports/publications/tagsPublication.js";
import "../imports/publications/usersPublications.js";

//constants
import { roles } from "../imports/constants/roles.js";
const KEEELAADMINUSERNAME = "keelaAdmin";
const ADMINUSERNAME = "admin";
const CORDINATORUSERNAME = "cordinator";
const PASSWORD = "password";

const insertOrg = (org) => {
  OrganizationsCollection.insert({ ...org });
};
Meteor.startup(async () => {
  if (OrganizationsCollection.find().count() === 0) {
    [
      { name: "keela", email: "support@keela.com" },
      { name: "nepal", email: "support@nepal.com" },
    ].forEach(insertOrg);
  }
  const keelaOrgId = OrganizationsCollection.findOne({ name: "keela" });
  if (!Accounts.findUserByUsername(KEEELAADMINUSERNAME)) {
    Accounts.createUser({
      username: KEEELAADMINUSERNAME,
      password: PASSWORD,
      profile: {
        role: roles.keelaAdmin,
        orgId: keelaOrgId._id,
        orgName: "keela",
      },
    });
  }

  if (!Accounts.findUserByUsername(ADMINUSERNAME)) {
    Accounts.createUser({
      username: ADMINUSERNAME,
      password: PASSWORD,
      profile: {
        role: roles.admin,
        orgId: keelaOrgId._id,
        orgName: "keela",
      },
    });
  }

  if (!Accounts.findUserByUsername(CORDINATORUSERNAME)) {
    Accounts.createUser({
      username: CORDINATORUSERNAME,
      password: PASSWORD,
      profile: {
        role: roles.coordinator,
        orgId: keelaOrgId._id,
        orgName: "keela",
      },
    });
  }
});
