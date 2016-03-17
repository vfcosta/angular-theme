export interface NoosferoRootScope extends ng.IScope {
    currentUser: User;
}

export interface Event extends Article {
    id: number;
}

export interface Article {
    id: number;
}

/**
 * @ngdoc interface
 * @name models.Profile
 * @description
 *  A representation of a Noosfero Profile.
 */
export interface Profile {
    
    /**
     * @ngdoc property
     * @name id
     * @propertyOf models.Profile
     * @returns {number} The Profile id
     */
    id: number;
    
    /**
     * @ngdoc property
     * @name identifier
     * @propertyOf models.Profile
     * @returns {string} The unque identifier for the Profile
     */
    identifier: string;
    
    /**
     * @ngdoc property
     * @name type
     * @propertyOf models.Profile
     * @returns {string} The Profile type (e.g.: "Person", etc.)
     */    
    type: string;
}


/**
 * @ngdoc interface
 * @name models.Person
 * @description
 *  A representation of a Person in Noosfero.
 */
export interface Person extends Profile {
    /**
     * @ngdoc property
     * @name id
     * @propertyOf models.Person
     * @returns {number} The Person id
     */
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

/**
 * @ngdoc interface
 * @name models.Activity
 * @description
 *  A representation of a {@link models.Profile} activity in Noosfero.
 */
export interface Activity {
    /**
     * @ngdoc property
     * @name verb
     * @propertyOf models.Activity
     * @returns {string} The activity verb.
     */    
    verb: string;
}

export interface INoosferoLocalStorage extends angular.storage.ILocalStorageService {
    currentUser: User;
}
