namespace noosfero {
    /**
     * @ngdoc interface
     * @name noosfero.Role
     * @description
     *  A representation of a Role in Noosfero.
     */
    export interface Role extends RestModel {
        name: string;
        key: string;
    }
}
