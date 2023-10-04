export const checkUserRoles = (roles: number[], userInfo: any) => {
    if (userInfo.UserRoles) {
        let checkRole = [];
        // ADMIN OR ADMINSTRATIVE
        if (roles.includes(1) || roles.includes(2)) {
            checkRole = userInfo.UserRoles.filter((role: any) => role.RoleId === 1 || role.RoleId === 2);
        }
        // APPROVER
        else if (roles.includes(3)) {
            checkRole = userInfo.UserRoles.filter((role: any) => role.RoleId === 3);
        }
        if (checkRole.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    else {
        return false;
    }
}