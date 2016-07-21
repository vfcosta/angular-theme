import { Component, Inject } from "ng-forward";
import { TaskService } from "../../../lib/ng-noosfero-api/http/task.service";
import { AuthService, SessionService, AuthEvents } from "./../../login";

@Component({
    selector: "tasks-menu",
    templateUrl: "app/task/tasks-menu/tasks-menu.html"
})
@Inject(TaskService, SessionService, AuthService)
export class TasksMenuComponent {

    tasks: noosfero.Task[];
    total: number;
    perPage = 5;
    person: noosfero.Person;

    constructor(private taskService: TaskService, private session: SessionService, private authService: AuthService) { }

    ngOnInit() {
        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            this.loadTasks();
        });
        this.loadTasks();
    }

    loadTasks() {
        if (!this.session.currentUser()) return;
        this.person = this.session.currentUser().person;
        this.taskService.getAllPending({ per_page: this.perPage }).then((result: noosfero.RestResult<noosfero.Task[]>) => {
            this.total = result.headers('total');
            this.tasks = result.data;
        });
    }
}
