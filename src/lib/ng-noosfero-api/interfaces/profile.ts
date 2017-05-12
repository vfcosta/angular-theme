
namespace noosfero {
    /**
 * @ngdoc interface
 * @name noofero.Profile
 * @description
 *  A representation of a Noosfero Profile.
 */
    export interface Profile extends RestModel, ModelWithPermissions {
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

        /**
         * @ngdoc property
         * @name homepage
         * @propertyOf noofero.Profile
         * @returns {string} The Profile homepage
         */
        homepage: string;

        /**
         * @ngdoc property
         * @name custom_header
         * @propertyOf noofero.Profile
         * @returns {string} The Profile header
         */
        custom_header: string;

        /**
         * @ngdoc property
         * @name custom_footer
         * @propertyOf noofero.Profile
         * @returns {string} The Profile footer
         */
        custom_footer: string;

        /**
         * @ngdoc property
         * @name layout_template
         * @propertyOf noofero.Profile
         * @returns {string} The Profile layout template (e.g.: "rightbar", "default")
         */
        layout_template: string;

        /**
         * @ngdoc property
         * @name top_image
         * @propertyOf noofero.Profile
         * @returns {any} The Profile top image
         */
        top_image: any;

        /**
         * @ngdoc property
         * @name image
         * @propertyOf noofero.Profile
         * @returns {any} The Profile image
         */
        image: any;

        /**
         * @ngdoc property
         * @name boxes
         * @propertyOf noofero.Profile
         * @returns noosfero.Box[] The Boxes of a profile
         */
        boxes: noosfero.Box[];

        /**
         * @ngdoc property
         * @name theme
         * @propertyOf noofero.Profile
         * @returns string The profile theme
         */
        theme: string;
    }
}
