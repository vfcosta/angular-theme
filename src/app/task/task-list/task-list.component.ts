import { AddFriendTaskComponent } from './../types/add-friend/add-friend-task.component';
import { TaskModule } from './../task.module';
import { NgModuleFactory } from '@angular/core';
import { Compiler } from '@angular/core';
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
    tasksGroups: noosfero.Task[];
    showAcceptModal = false;
    showRejectModal = false;

    constructor(private notificationService: NotificationService,
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
        this.closeTask(task, task.accept_details, "showAcceptModal", () => { this.callAccept(); });
    }

    reject(task: noosfero.Task) {
        this.closeTask(task, task.reject_details, "showRejectModal", () => { this.callReject(); });
    }

    private closeTask(task: noosfero.Task, hasDetails: boolean, attribute: string, confirmationFunction: Function) {
        this.currentTask = task;
        this.confirmationTask = <any>{ id: task.id };
        if (hasDetails) {
            this[attribute] = true;
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
            this.cancel();
        }).catch(() => {
            this.cancel();
        });
    }

    cancel() {
        this.showAcceptModal = false;
        this.showRejectModal = false;
        this.currentTask = null;
        this.confirmationTask = null;
    }

}
