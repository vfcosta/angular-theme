import { TaskTypeComponent } from './../task-type.component';
import { Injector } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "create-community-task",
    templateUrl: './abuse-complaint.html',
    styleUrls: ['./abuse-complaint.scss']
})
export class AbuseComplaintTaskComponent extends TaskTypeComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}
