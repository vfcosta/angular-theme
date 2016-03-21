
namespace noosfero {
    /**
 * @ngdoc interface
 * @name noofero.Profile
 * @description
 *  A representation of a Noosfero Profile.
 */
    export interface Profile extends RestModel {
        /**
         * @ngdoc property
         * @name id
         * @propertyOf noofero.Profile
         * @returns {number} The Profile id
         */
        id: number;

        /**
         * @ngdoc property
         * @name identifier
         * @propertyOf noofero.Profile
         * @returns {string} The unque identifier for the Profile
         */
        identifier: string;

        /**
         * @ngdoc property
         * @name type
         * @propertyOf noofero.Profile
         * @returns {string} The Profile type (e.g.: "Person", etc.)
         */
        type: string;

        name: string;
    }
}