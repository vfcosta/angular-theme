namespace noosfero {
    /**
     * @ngdoc interface
     * @name noosfero.Person
     * @description
     *  A representation of a Person in Noosfero.
     */
    export interface Person extends Profile {
        friends_count: number;
    }
}
