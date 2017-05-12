import { TaskComponent } from './../task.component';
import { Injector, OnInit } from '@angular/core';
import { Component } from '@angular/core';

export class TaskTypeComponent implements OnInit {

    parent: TaskComponent;
    task: noosfero.Task;

    constructor(injector: Injector) {
        this.parent = injector.get(TaskComponent);
    }

    ngOnInit() {
        this.task = this.parent.task;
    }
}
