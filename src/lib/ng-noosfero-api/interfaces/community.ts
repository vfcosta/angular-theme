namespace noosfero {
    /**
     * @ngdoc interface
     * @name noosfero.Community
     * @description
     *  A representation of a Community in Noosfero.
     */
    export interface Community extends Profile {

        /**
         * @ngdoc property
         * @name closed
         * @propertyOf noofero.Community
         * @returns {boolean} If the community is closed
         */
        closed: boolean;

        admins: any;
    }
}
