import { TaskService } from './../../lib/ng-noosfero-api/http/task.service';
import { AddFriendTaskComponent } from './types/add-friend/add-friend-task.component';
import { NgModuleFactory } from '@angular/core';
import { TaskModule } from './task.module';
import { Compiler } from '@angular/core';
import { Injector, OnInit } from '@angular/core';
import { Component, Input, Inject } from '@angular/core';
import * as types from './types';

@Component({
    selector: "task",
    template: `<ng-container *ngIf="myModule">
                   <ng-container *ngComponentOutlet="taskComponent; ngModuleFactory: myModule;"></ng-container>
               </ng-container>`
})
export class TaskComponent implements OnInit {

    @Input() task: noosfero.Task;

    myModule: NgModuleFactory<any>;
    taskComponent: any;

    constructor(compiler: Compiler) {
        compiler.compileModuleAsync(TaskModule).then(value => {
            this.myModule = value;
        });
    }

    ngOnInit() {
        if (TaskService.TASK_TYPES.indexOf(this.task.type) >= 0) {
            this.taskComponent = types[`${this.task.type}TaskComponent`];
        }
    }

}
