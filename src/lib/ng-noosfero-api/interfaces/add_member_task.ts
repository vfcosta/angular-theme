namespace noosfero {
    /**
     * @ngdoc interface
     * @name noosfero.AddMemberTask
     * @description
     *  A representation of an AddMemberTask in Noosfero.
     */
    export interface AddMemberTask extends Task {
        roles: number[];
    }
}
