import {Role} from "../../enum/role.mjs"

export function validateRole(role: string): role is Role {
    return role in Role
}
