import { Component, Inject, Input } from "ng-forward";
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

    @Input() taskTypes = ['AddMember', 'ApproveComment', 'ApproveArticle', 'AbuseComplaint', 'SuggestArticle', 'CreateCommunity'];

    tasks: noosfero.Task[] = [];
    total: number;
    perPage = 5;
    person: noosfero.Person;

    constructor(private taskService: TaskService,
        private session: SessionService,
        private authService: AuthService,
        private eventsHubService: EventsHubService) {
    }

    ngOnInit() {
        this.eventsHubService.subscribeToEvent(this.eventsHubService.knownEvents.TASK_CLOSED, (task: noosfero.Task) => {
            if (this.taskTypes.indexOf(task.type) !== -1) {
                this.total--;
            }
        });
        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            this.loadTasks();
        });
        this.loadTasks();
    }

    loadTasks() {
        if (!this.session.currentUser()) return;
        this.person = this.session.currentUser().person;

        this.taskService.getAllPending({ content_type: this.taskTypes.join(), per_page: this.perPage }).then((result: noosfero.RestResult<noosfero.Task[]>) => {
            this.total = result.headers('total');
            this.tasks = result.data;
        });
    }
}
