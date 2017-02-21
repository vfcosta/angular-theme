namespace noosfero {
    /**
     * @ngdoc interface
     * @name noofero.Activity
     * @description
     *  A representation of a {@link noosfero.Profile} activity in Noosfero.
     */
    export interface Activity {
        /**
         * @ngdoc property
         * @name verb
         * @propertyOf noofero.Activity
         * @returns {string} The activity verb.
         */
        verb: string;

        params: any[];
    }
}