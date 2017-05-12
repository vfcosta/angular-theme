import { TaskTypeComponent } from './../task-type.component';
import { Injector } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "add-friend-task",
    template: require("app/task/types/add-member/add-member.html")
})
export class AddMemberTaskComponent extends TaskTypeComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}
