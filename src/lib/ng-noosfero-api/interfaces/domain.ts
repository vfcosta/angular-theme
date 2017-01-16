namespace noosfero {
    /**
     * @ngdoc interface
     * @name noosfero.Domains
     * @description
     *  A representation of the registered Domains in Noosfero.
     */
    export interface Domain extends RestModel {
        id: number;
        name: string;
        is_default: boolean;
        owner: Profile | Environment;
    }
}
