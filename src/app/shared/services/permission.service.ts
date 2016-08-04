import {Injectable, Inject} from "ng-forward";

type WithPermissions = noosfero.Profile | noosfero.Comment | noosfero.Article;

@Injectable()
export class PermissionService {
    isAllowed(target: WithPermissions, permission: string) {
        return (target.permissions || []).indexOf(permission) >= 0;
    }

}
