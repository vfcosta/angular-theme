import { Component, Inject, provide } from "ng-forward";
import { TaskService } from "../../../lib/ng-noosfero-api/http/task.service";

@Component({
    selector: "tasks-component",
    templateUrl: "app/task/tasks/tasks.html",
    providers: [
        provide('taskService', { useClass: TaskService })
    ]
})
@Inject(TaskService)
export class TasksComponent {

    tasks: noosfero.Task[];
    total: number;
    currentPage: number;
    perPage: 5;

    constructor(private taskService: TaskService) {
        this.loadPage();
    }

    loadPage() {
        this.taskService.getAllPending({ page: this.currentPage, per_page: this.perPage }).then((result: noosfero.RestResult) => {
            this.total = result.headers('total');
            this.tasks = result.data;
        });
    }

}
