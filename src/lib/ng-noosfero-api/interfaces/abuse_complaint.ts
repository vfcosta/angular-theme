namespace noosfero {
    /**
     * @ngdoc interface
     * @name noosfero.AbuseComplaint
     * @description
     *  A representation of a AbuseComplaint in Noosfero.
     */
    export interface AbuseComplaint extends Task {
        abuse_reports: AbuseReport[];
    }
}
