import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
//collection
import { OrganizationsCollection } from "../imports/db/OrganizationsCollection.js";
import { TagCollection } from "../imports/db/TagCollection.js";
import { UsersCollection } from "../imports/db/UsersCollection.js";
//methods
import tagMethods from "../imports/api/TagMethods.js";
import organizationMethods from "../imports/api/organizationMethods.js";
import userMethods from "../imports/api/userMethods.js";
import contactMethods from "../imports/api/contactMethods.js";
//publications
import "../imports/publications/organizationsPublication.js";
import "../imports/publications/contactsPublications.js";
import "../imports/publications/tagsPublication.js";
import "../imports/publications/usersPublications.js";
//constants
import { roles } from "../imports/constants/index.js";
const KEEELAADMINUSERNAME = "keelaAdmin";
const ADMINUSERNAME = "admin";
const CORDINATORUSERNAME = "cordinator";
const PASSWORD = "password";

const insertOrg = (orgName) => {
  OrganizationsCollection.insert({ name: orgName });
};
Meteor.startup(async () => {
  if (OrganizationsCollection.find().count() === 0) {
    ["keela", "nepal"].forEach(insertOrg);
  }
  if (!Accounts.findUserByUsername(KEEELAADMINUSERNAME)) {
    Accounts.createUser({
      username: KEEELAADMINUSERNAME,
      password: PASSWORD,
      profile: {
        role: roles.keelaAdmin,
      },
    });
  }

  if (!Accounts.findUserByUsername(ADMINUSERNAME)) {
    Accounts.createUser({
      username: ADMINUSERNAME,
      password: PASSWORD,
      profile: {
        role: roles.admin,
      },
    });
  }

  if (!Accounts.findUserByUsername(CORDINATORUSERNAME)) {
    Accounts.createUser({
      username: CORDINATORUSERNAME,
      password: PASSWORD,
      profile: {
        role: roles.coordinator,
      },
    });
  }
});
