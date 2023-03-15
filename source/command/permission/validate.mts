import {Permission} from "../../enum/permission.mjs";

export function validatePermission(permission: string): permission is Permission {
    return permission in Permission;
}
