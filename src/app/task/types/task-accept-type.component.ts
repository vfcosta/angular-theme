import { TaskAcceptComponent } from './../task-list/task-accept.component';
import { Injector, OnInit } from '@angular/core';
import { Component } from '@angular/core';

export class TaskAcceptTypeComponent implements OnInit {

    parent: TaskAcceptComponent;
    task: noosfero.Task;
    confirmationTask: noosfero.Task;

    constructor(injector: Injector) {
        this.parent = injector.get(TaskAcceptComponent);
    }

    ngOnInit() {
        this.task = this.parent.task;
        this.confirmationTask = this.parent.confirmationTask;
    }
}
