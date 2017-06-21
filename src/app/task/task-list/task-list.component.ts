import { AddFriendTaskComponent } from './../types/add-friend/add-friend-task.component';
import { TaskModule } from './../task.module';
import { NgModuleFactory } from '@angular/core';
import { Compiler } from '@angular/core';
import { TaskModal } from './task-modal';
import { components } from './../../../../themes/index';
import { AppModule } from './../../app.module';
import { Component, Input, Inject } from '@angular/core';
import { NotificationService } from "../../shared/services/notification.service";
import { TaskService } from "../../../lib/ng-noosfero-api/http/task.service";
import { Arrays } from "../../../lib/util/arrays";
import { EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";

declare var _: any;

@Component({
    selector: "task-list",
    template: require("app/task/task-list/task-list.html")
})
export class TaskListComponent {

    @Input() tasks: noosfero.Task[];

    currentTask: noosfero.Task;
    confirmationTask: noosfero.Task;
    private modalInstance: any = null;

    tasksGroups: noosfero.Task[];

    constructor(private notificationService: NotificationService,
        @Inject("$scope") private $scope: ng.IScope,
        @Inject("$uibModal") private $uibModal: any,
        private taskService: TaskService,
        private eventsHubService: EventsHubService) {
    }

    ngOnInit() {
        this.eventsHubService.subscribeToEvent(this.eventsHubService.knownEvents.TASK_CLOSED, (task: noosfero.Task) => {
            Arrays.remove(this.tasks, task);
            this.tasksGroups = _.values(_.groupBy(this.tasks, 'target.name'));
        });
    }

    ngOnChanges() {
        this.tasks = _.sortBy(this.tasks, 'created_at').reverse();
        this.tasksGroups = _.values(_.groupBy(this.tasks, 'target.name'));
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
                controller: TaskModal,
                controllerAs: 'modal',
                bindToController: true,
                scope: this.$scope,
                resolve: {
                    currentTask: this.currentTask,
                    confirmationTask: this.confirmationTask,
                    taskList: this
                }

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
            this.eventsHubService.emitEvent(this.eventsHubService.knownEvents.TASK_CLOSED, this.currentTask);
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

}
