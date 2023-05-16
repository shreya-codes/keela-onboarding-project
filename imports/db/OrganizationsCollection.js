import { Mongo } from "meteor/mongo";

const OrganizationsCollection = new Mongo.Collection("organizations");
export { OrganizationsCollection };
