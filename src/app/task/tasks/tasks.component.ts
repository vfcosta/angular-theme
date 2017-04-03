import { Component, Inject, provide, Input } from "ng-forward";
import { TaskService } from "../../../lib/ng-noosfero-api/http/task.service";

@Component({
    selector: "tasks",
    templateUrl: "app/task/tasks/tasks.html"
})
@Inject(TaskService, '$stateParams')
export class TasksComponent {

    tasks: noosfero.Task[];
    total: number;
    currentPage = 1;
    perPage = 5;
    taskTypes: string;

    constructor(private TaskService: TaskService, private $stateParams: ng.ui.IStateParamsService) {
        this.taskTypes = $stateParams['taskTypes'];
        this.loadPage();
    }

    loadPage() {
        this.TaskService.getAllPending({content_type: this.taskTypes, page: this.currentPage, per_page: this.perPage }).then((result: noosfero.RestResult<noosfero.Task[]>) => {
            this.total = result.headers('total');
            this.tasks = result.data;
        });
    }

}
