import { TaskTypeComponent } from './../task-type.component';
import { Injector } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "add-friend-task",
    templateUrl: './add-friend.html',
    styleUrls: ['./add-friend.scss']
})
export class AddFriendTaskComponent extends TaskTypeComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}
