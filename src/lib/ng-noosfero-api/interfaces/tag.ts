namespace noosfero {
    /**
     * @ngdoc interface
     * @name noosfero.Tags
     * @description
     *  A representation of a Tags in Noosfero.
     */
    export interface Tag extends RestModel {
        text: string;
        link: string;
        weight: number;
    }
}
