import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";

@Injectable()
@Inject("Restangular", "$q", "$log")
export class AbuseComplaintService extends RestangularService<noosfero.AbuseComplaint> {
    
    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(Restangular, $q, $log);
    }

    getResourcePath() {
        return "abuseComplaints";
    }

    getDataKeys() {
        return {
            singular: 'abuseComplaint',
            plural: 'abuseComplaints'
        };
    }

    getByAbuseComplaint(abuseComplaintId: number, params: any = {}) {
        params['all_pending'] = true;
        params['status'] = 1;
        params['content_type'] = 'AbuseComplaint';
        return this.list(null, params);
    }

}
