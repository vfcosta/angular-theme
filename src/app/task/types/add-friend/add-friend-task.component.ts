import { TaskTypeComponent } from './../task-type.component';
import { Injector } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "add-friend-task",
    template: require("app/task/types/add-friend/add-friend.html")
})
export class AddFriendTaskComponent extends TaskTypeComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}
