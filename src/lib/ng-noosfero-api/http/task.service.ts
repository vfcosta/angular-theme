import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";

@Injectable()
@Inject("Restangular", "$q", "$log")
export class TaskService extends RestangularService<noosfero.Task> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService) {
        super(Restangular, $q, $log);
    }

    getResourcePath() {
        return "tasks";
    }

    getDataKeys() {
        return {
            singular: 'task',
            plural: 'tasks'
        };
    }

    getAllPending(params: any) {
        return this.list(null, { all_pending: true });
    }
}
