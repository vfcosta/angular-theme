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
        this.currentTask = task;
        this.confirmationTask = <any>{ id: task.id };
        if (task.accept_details) {
            this.modalInstance = this.$uibModal.open({
                templateUrl: "app/task/task-list/accept.html",
                controller: TaskListComponent,
                controllerAs: 'modal',
                bindToController: true,
                scope: this.$scope
            });
        } else {
            this.callAccept();
        }
    }

    reject(task: noosfero.Task) {
        this.currentTask = task;
        this.confirmationTask = <any>{ id: task.id };
        if (task.reject_details) {
            this.modalInstance = this.$uibModal.open({
                templateUrl: "app/task/task-list/reject.html",
                controller: TaskListComponent,
                controllerAs: 'modal',
                bindToController: true,
                scope: this.$scope
            });
        } else {
            this.callReject();
        }
    }

    callAccept() {
        this.taskService.finishTask(this.confirmationTask).then(() => {
            this.eventsHubService.emitEvent(this.eventsNames.TASK_CLOSED, this.currentTask);
            this.notificationService.success({ title: "tasks.actions.accept.title", message: "tasks.actions.accept.message" });
        }).finally(() => {
            this.cancel();
        });
    }

    callReject() {
        this.taskService.cancelTask(this.confirmationTask).then(() => {
            this.eventsHubService.emitEvent(this.eventsNames.TASK_CLOSED, this.currentTask);
            this.notificationService.success({ title: "tasks.actions.reject.title", message: "tasks.actions.reject.message" });
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
