import { TaskAcceptTypeComponent } from './../task-accept-type.component';
import { Component, Injector, Inject, OnInit } from '@angular/core';
import { TaskService } from '../../../../lib/ng-noosfero-api/http/task.service';

@Component({
    selector: "add-friend-task-accept",
    templateUrl: './add-friend-accept.html',
})
export class AddFriendTaskAcceptComponent extends TaskAcceptTypeComponent implements OnInit {

    constructor(private taskService: TaskService, injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        if (!this.task.target) return;
        this.taskService.get(this.task.id).then((result: noosfero.RestResult<noosfero.AddFriend>) => {
            this.task = result.data;
        });
    }
}
