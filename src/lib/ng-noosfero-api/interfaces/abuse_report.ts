namespace noosfero {
    /**
     * @ngdoc interface
     * @name noosfero.AbuseReport
     * @description
     *  A representation of a AbuseReport in Noosfero.
     */
    export interface AbuseReport {
        id: number;
        reporter: Person;
        reason: string;
        created_at: string;
    }
}
