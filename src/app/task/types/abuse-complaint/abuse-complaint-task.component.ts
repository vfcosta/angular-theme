import { TaskTypeComponent } from './../task-type.component';
import { Injector } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "create-community-task",
    template: require("app/task/types/abuse-complaint/abuse-complaint.html")
})
export class AbuseComplaintTaskComponent extends TaskTypeComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}
