import { roles } from "./roles";
export const permission = {
  ORG_CREATE_PERMISSION: [roles.keelaAdmin],
  ORG_REMOVE_PERMISSION: [roles.keelaAdmin],
  ORG_EDIT_PERMISSION: [roles.keelaAdmin],
  ORG_VIEW_PERMISSION: [roles.keelaAdmin],

  USER_CREATE_PERMISSION: [roles.admin, roles.keelaAdmin],
  USER_REMOVE_PERMISSION: [roles.admin],
  USER_EDIT_PERMISSION: [roles.admin],
  USER_VIEW_PERMISSION: [roles.admin, roles.keelaAdmin],

  TAG_CREATE_PERMISSION: [roles.admin, roles.coordinator],
  TAG_REMOVE_PERMISSION: [roles.admin, roles.coordinator],
  TAG_EDIT_PERMISSION: [roles.admin, roles.coordinator],
  TAG_VIEW_PERMISSION: [roles.admin, roles.coordinator],

  CONTACT_CREATE_PERMISSION: [roles.admin],
  CONTACT_REMOVE_PERMISSION: [roles.admin],
  CONTACT_EDIT_PERMISSION: [roles.admin],
  CONTACT_VIEW_PERMISSION: [roles.admin, roles.coordinator],
};
