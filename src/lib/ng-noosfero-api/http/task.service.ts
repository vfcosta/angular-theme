import { Injectable, Inject } from "ng-forward";
import { RestangularService } from "./restangular_service";

@Injectable()
@Inject("Restangular", "$q", "$log")
export class TaskService extends RestangularService<noosfero.Task> {

    public static TASK_TYPES = ["AddMember", "ApproveComment", "ApproveArticle",
        "AbuseComplaint", "SuggestArticle", "CreateCommunity"];

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

    getAllPending(params: any = {}) {
        params['all_pending'] = true;
        params['status'] = 1;
        params['content_type'] = TaskService.TASK_TYPES.map(t => t).join(',');
        return this.list(null, params);
    }

    finishTask(task: noosfero.Task) {
        return this.closeTask(task, "finish");
    }

    cancelTask(task: noosfero.Task) {
        return this.closeTask(task, "cancel");
    }

    closeTask(task: noosfero.Task, action: string) {
        let element = this.getElement(task.id);
        delete task.id;
        let put = element.customPUT({ task: task }, action);
        let deferred = this.$q.defer<noosfero.RestResult<noosfero.Task>>();
        put.then(this.getHandleSuccessFunction<noosfero.RestResult<noosfero.Task>>(deferred));
        put.catch(this.getHandleErrorFunction<noosfero.RestResult<noosfero.Task>>(deferred));
        return deferred.promise;
    }
}
