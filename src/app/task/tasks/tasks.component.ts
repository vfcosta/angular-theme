import { Component, Inject, provide } from "ng-forward";
import { TaskService } from "../../../lib/ng-noosfero-api/http/task.service";

@Component({
    selector: "tasks",
    templateUrl: "app/task/tasks/tasks.html"
})
@Inject(TaskService)
export class TasksComponent {

    tasks: noosfero.Task[];
    total: number;
    currentPage = 1;
    perPage = 5;

    constructor(private TaskService: TaskService) {
        this.loadPage();
    }

    loadPage() {
        this.TaskService.getAllPending({ page: this.currentPage, per_page: this.perPage }).then((result: noosfero.RestResult<noosfero.Task[]>) => {
            this.total = result.headers('total');
            this.tasks = result.data;
        });
    }

}
