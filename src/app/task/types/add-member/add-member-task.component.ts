import { TaskTypeComponent } from './../task-type.component';
import { Injector, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "add-friend-task",
    templateUrl: './add-member.html',
    styleUrls: ['./add-member.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddMemberTaskComponent extends TaskTypeComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}
