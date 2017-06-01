import { TaskModule } from './../task.module';
import { TaskService } from './../../../lib/ng-noosfero-api/http/task.service';
import { Component, Input, Inject, Compiler, NgModuleFactory } from "@angular/core";
import * as types from '../types';

@Component({
    selector: 'task-accept',
    template: `<ng-container *ngIf="myModule && taskComponent">
                 <ng-container *ngComponentOutlet="taskComponent; ngModuleFactory: myModule;"></ng-container>
               </ng-container>`
})
export class TaskAcceptComponent {

    @Input() task: noosfero.Task;
    @Input() confirmationTask: noosfero.Task;
    myModule: NgModuleFactory<any>;
    taskComponent: any;

    constructor(private compiler: Compiler) {
        compiler.compileModuleAsync(TaskModule).then(value => {
            this.myModule = value;
        });
    }

    ngOnInit() {
        let taskType = `${this.task.type}TaskAcceptComponent`;
        if (types[taskType]) {
            this.taskComponent = types[taskType];
        }
    }
}