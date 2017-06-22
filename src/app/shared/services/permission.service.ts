import {Injectable} from "@angular/core";

@Injectable()
export class PermissionService {
    isAllowed(target: noosfero.ModelWithPermissions, permission: string) {
        return (target.permissions || []).indexOf(permission) >= 0;
    }

}
