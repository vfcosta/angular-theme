import { Component, Inject } from "ng-forward";
import { TaskService } from "../../../lib/ng-noosfero-api/http/task.service";

@Component({
    selector: "tasks-menu",
    templateUrl: "app/task/tasks-menu/tasks-menu.html"
})
@Inject(TaskService)
export class TasksMenuComponent {

    tasks: noosfero.Task[];
    total: number;
    perPage: 5;

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.taskService.getAllPending({ per_page: this.perPage }).then((result: noosfero.RestResult) => {
            this.total = result.headers('total');
            this.tasks = result.data;
        });
    }

}
