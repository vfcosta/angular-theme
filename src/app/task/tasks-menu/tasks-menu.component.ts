import { Component, Inject } from "ng-forward";
import { TaskService } from "../../../lib/ng-noosfero-api/http/task.service";
import { SessionService } from "./../../login";

@Component({
    selector: "tasks-menu",
    templateUrl: "app/task/tasks-menu/tasks-menu.html"
})
@Inject(TaskService, SessionService)
export class TasksMenuComponent {

    tasks: noosfero.Task[];
    total: number;
    perPage: 5;
    person: noosfero.Person;

    constructor(private taskService: TaskService, private session: SessionService) { }

    ngOnInit() {
        this.person = this.session.currentUser() ? this.session.currentUser().person : null;
        this.taskService.getAllPending({ per_page: this.perPage }).then((result: noosfero.RestResult) => {
            this.total = result.headers('total');
            this.tasks = result.data;
        });
    }

}
