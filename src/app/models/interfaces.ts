export interface NoosferoRootScope extends ng.IScope {
    currentUser: User;
}

export interface Event extends Article {
    id: number;
}

export interface Article {
    id: number;
}

export interface Profile {
    id: number;
    identifier: string;
}

export interface Person extends Profile {
    id: number;
}

export interface TynyMceArticle extends Article {
    id: number;
}

export interface Blog extends Article {
    id: number;
}

export interface Credentials {
    username: string;
    password: string;
}

export interface User {
    id: number;
    login: string;
    email: string;
    person: Person;
    private_token: string;
    userRole: string;
}

export interface UserResponse {
    user: User;
}


export interface Box {
    id: number;
    position: number;
}

export interface INoosferoLocalStorage extends angular.storage.ILocalStorageService {
    currentUser: User;
}