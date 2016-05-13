
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
         * @name created_at
         * @propertyOf noofero.Profile
         * @returns {string} The timestamp this object was created
         */        
        created_at: string;

        /**
         * @ngdoc property
         * @name type
         * @propertyOf noofero.Profile
         * @returns {string} The Profile type (e.g.: "Person", etc.)
         */
        type: string;

        /**
         * @ngdoc property
         * @name name
         * @propertyOf noofero.Profile
         * @returns {string} The name of Profile (e.g.: "Mr. Janson", etc.)
         */
        name: string;

        /**
         * @ngdoc property
         * @name additional_data
         * @propertyOf noofero.Profile
         * @returns {string} A key => value custom fields data of Profile (e.g.: "{'Address':'Street A, Number 102...'}")
         */
        additional_data?: any;
    }
}
