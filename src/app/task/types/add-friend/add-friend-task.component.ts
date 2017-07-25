import { TaskTypeComponent } from './../task-type.component';
import { Injector, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "add-friend-task",
    templateUrl: './add-friend.html',
    styleUrls: ['./add-friend.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddFriendTaskComponent extends TaskTypeComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}
