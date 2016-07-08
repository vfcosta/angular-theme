
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
    }
}

