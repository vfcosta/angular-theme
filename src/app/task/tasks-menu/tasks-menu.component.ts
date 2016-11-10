import { Component, Inject } from "ng-forward";
import { TaskService } from "../../../lib/ng-noosfero-api/http/task.service";
import { AuthService, SessionService, AuthEvents } from "./../../login";
import { EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";

@Component({
    selector: "tasks-menu",
    templateUrl: "app/task/tasks-menu/tasks-menu.html"
})
@Inject(TaskService, SessionService, AuthService, EventsHubService)
export class TasksMenuComponent {

    tasks: noosfero.Task[];
    total: number;
    perPage = 5;
    person: noosfero.Person;
    eventsNames: NoosferoKnownEvents;

    constructor(private taskService: TaskService,
        private session: SessionService,
        private authService: AuthService,
        private eventsHubService: EventsHubService) {

        this.eventsNames = new NoosferoKnownEvents();
    }

    ngOnInit() {
        this.eventsHubService.subscribeToEvent(this.eventsNames.TASK_CLOSED, (task: noosfero.Task) => {
            this.total--;
        });
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
