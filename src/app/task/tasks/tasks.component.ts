import { Component, Inject, Input, OnInit } from "@angular/core";
import { TaskService } from "../../../lib/ng-noosfero-api/http/task.service";

@Component({
    selector: "tasks",
    template: require("app/task/tasks/tasks.html")
})
export class TasksComponent implements OnInit {

    tasks: noosfero.Task[];
    total: number;
    currentPage = 1;
    perPage = 5;
    @Input() taskTypes: string;

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.loadPage({ page: 1 });
    }

    loadPage($event: any) {
        this.taskService.getAllPending({content_type: this.taskTypes, page: $event.page, per_page: this.perPage }).then((result: noosfero.RestResult<noosfero.Task[]>) => {
            this.total = result.headers.get('total');
            this.tasks = result.data;
        });
    }
}
