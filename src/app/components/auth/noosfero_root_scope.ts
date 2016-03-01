import {User} from "./../../models/interfaces";

export interface NoosferoRootScope extends ng.IScope {
    currentUser: User;
}