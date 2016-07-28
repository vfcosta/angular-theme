import { Component, Input, Inject, provide } from "ng-forward";
import { NotificationService } from "../../shared/services/notification.service";
import { TaskService } from "../../../lib/ng-noosfero-api/http/task.service";
import { TaskAcceptComponent } from "./task-accept.component";
import { Arrays } from "../../../lib/util/arrays";
import { EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";

@Component({
    selector: "task-list",
    templateUrl: "app/task/task-list/task-list.html",
    directives: [TaskAcceptComponent],
    providers: [
        provide('eventsHubService', { useClass: EventsHubService })
    ]
})
@Inject(NotificationService, "$scope", "$uibModal", TaskService, EventsHubService)
export class TaskListComponent {

    @Input() tasks: noosfero.Task[];

    private taskTemplates = ["AddFriend", "AddMember", "CreateCommunity", "SuggestArticle", "AbuseComplaint"];

    currentTask: noosfero.Task;
    confirmationTask: noosfero.Task;
    eventsNames: NoosferoKnownEvents;
    private modalInstance: any = null;

    constructor(private notificationService: NotificationService,
        private $scope: ng.IScope,
        private $uibModal: any,
        private taskService: TaskService,
        private eventsHubService: EventsHubService) {

        this.eventsNames = new NoosferoKnownEvents();
    }

    ngOnInit() {
        this.eventsHubService.subscribeToEvent(this.eventsNames.TASK_CLOSED, (task: noosfero.Task) => {
            Arrays.remove(this.tasks, task);
        });
    }

    getTaskTemplate(task: noosfero.Task) {
        if (this.taskTemplates.indexOf(task.type) >= 0) {
            let templateName = this.getTemplateName(task);
            return `app/task/types/${templateName}/${templateName}.html`;
        } else {
            return 'app/task/types/default.html';
        }
    }

    accept(task: noosfero.Task) {
        this.closeTask(task, task.accept_details, "app/task/task-list/accept.html", () => { this.callAccept(); });
    }

    reject(task: noosfero.Task) {
        this.closeTask(task, task.reject_details, "app/task/task-list/reject.html", () => { this.callReject(); });
    }

    private closeTask(task: noosfero.Task, hasDetails: boolean, templateUrl: string, confirmationFunction: Function) {
        this.currentTask = task;
        this.confirmationTask = <any>{ id: task.id };
        if (hasDetails) {
            this.modalInstance = this.$uibModal.open({
                templateUrl: templateUrl,
                controller: TaskListComponent,
                controllerAs: 'modal',
                bindToController: true,
                scope: this.$scope
            });
        } else {
            confirmationFunction();
        }
    }

    callAccept() {
        this.callCloseTask("finish", "tasks.actions.accept.title", "tasks.actions.accept.message");
    }

    callReject() {
        this.callCloseTask("cancel", "tasks.actions.reject.title", "tasks.actions.reject.message");
    }

    private callCloseTask(action: string, title: string, message: string) {
        this.taskService.closeTask(this.confirmationTask, action).then(() => {
            this.eventsHubService.emitEvent(this.eventsNames.TASK_CLOSED, this.currentTask);
            this.notificationService.success({ title: title, message: message });
        }).finally(() => {
            this.cancel();
        });
    }

    cancel() {
        if (this.modalInstance) {
            this.modalInstance.close();
            this.modalInstance = null;
        }
        this.currentTask = null;
        this.confirmationTask = null;
    }

    private getTemplateName(task: noosfero.Task) {
        return task.type.replace(/::/, '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

}
