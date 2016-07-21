namespace noosfero {
    /**
     * @ngdoc interface
     * @name noosfero.Task
     * @description
     *  A representation of a Task in Noosfero.
     */
    export interface Task extends RestModel {
        type: string;
        accept_details: boolean;
        reject_details: boolean;
        target: noosfero.Profile | noosfero.Environment;
    }
}
