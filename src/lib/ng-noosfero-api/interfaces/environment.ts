
namespace noosfero {
    /**
     * @ngdoc interface
     * @name noofero.Environment
     * @description
     *  A representation of a Noosfero Environment.
     */
    export interface Environment extends RestModel {
        /**
         * @ngdoc property
         * @name id
         * @propertyOf noofero.Environment
         * @returns {number} The Environment id
         */
        id: number;
        settings: any

        /**
         * @ngdoc property
         * @name layout_template
         * @propertyOf noofero.Environment
         * @returns {string} The Environment layout (e.g. default, rightbar)
         */
        layout_template: string;

        /**
         * @ngdoc property
         * @name signup_intro
         * @propertyOf noofero.Environment
         * @returns {string} The Environment signup introduction HTML (e.g. Welcome to Noosfero...!!)
         */
        signup_intro: string;

        /**
         * @ngdoc property
         * @name host
         * @propertyOf noofero.Environment
         * @returns {string} The Environment default domain address with 'http://' prefix (e.g. http://localhost)
         */
        host: string;


        /**
         * @ngdoc property
         * @name name
         * @propertyOf noofero.Environment
         * @returns {string} The Environment Name
         */
        name: string;
        type: string;

        /**
         * @ngdoc property
         * @name boxes
         * @propertyOf noofero.Environment
         * @returns noosfero.Box[] The Boxes of an environment
         */
        boxes: noosfero.Box[];

    }
}
