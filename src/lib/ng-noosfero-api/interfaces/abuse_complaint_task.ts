namespace noosfero {
    /**
     * @ngdoc interface
     * @name noosfero.AbuseComplaintTask
     * @description
     *  A representation of an AbuseComplaintTask in Noosfero.
     */
    export interface AbuseComplaintTask extends Task {
        //roles: number[];
        message: string;
    }
}
