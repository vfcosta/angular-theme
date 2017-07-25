import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from '@angular/core';
import { RestangularService } from './restangular_service';

@Injectable()
export class TaskService extends RestangularService<noosfero.Task> {

    public static TASK_TYPES = ["AddMember", "ApproveComment", "ApproveArticle",
        "AbuseComplaint", "SuggestArticle", "CreateCommunity", "AddFriend"];

    constructor(protected restangular: Restangular) {
        super(restangular);
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
        if (!params['content_type']) {
            params['content_type'] = TaskService.TASK_TYPES.map(t => t).join(',');
        }
        params['status'] = 1;
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
        return put.toPromise().then(this.getHandleSuccessFunction<noosfero.RestResult<noosfero.Task>>());
    }
}
