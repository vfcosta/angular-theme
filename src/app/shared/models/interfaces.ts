export interface NoosferoRootScope extends ng.IScope {
    currentUser: noosfero.User;
}

export interface UserResponse {
    user: noosfero.User;
}

export interface INoosferoLocalStorage extends angular.storage.ILocalStorageService {
    currentUser: noosfero.User;
    settings: any;
}
