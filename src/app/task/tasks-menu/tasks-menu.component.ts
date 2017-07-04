import { ElementRef, ViewChild, HostListener, Component, Inject, Input } from "@angular/core";
import { TaskService } from "../../../lib/ng-noosfero-api/http/task.service";
import { AuthService, AuthEvents } from "./../../login";
import { EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";
import { SessionService } from '../../login/session.service';

@Component({
    selector: "tasks-menu",
    template: require("app/task/tasks-menu/tasks-menu.html")
})
export class TasksMenuComponent {

    @Input() taskTypes = ['AddMember', 'ApproveComment', 'ApproveArticle', 'AbuseComplaint', 'SuggestArticle', 'CreateCommunity'];
    @ViewChild("taskPanel") taskPanel: any;
    @ViewChild("menuButton") menuButton: any;

    open = false;
    tasks: noosfero.Task[] = [];
    total: number;
    perPage = 5;
    person: noosfero.Person;

    constructor(private taskService: TaskService,
        private session: SessionService, private authService: AuthService,
        private eventsHubService: EventsHubService, private elementRef: ElementRef) {
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
            this.total = result.headers.get('total');
            this.tasks = result.data;
        });
    }

    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (!this.menuButton) return;
        if (this.menuButton.nativeElement.contains($event.target)) {
            this.open = !this.open;
        } else if (this.open && !this.taskPanel.nativeElement.contains($event.target)) {
            this.open = false;
        }
    }
}
