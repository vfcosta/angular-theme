import { Component, Input, Inject } from "@angular/core";
import { TaskService } from "../../../../lib/ng-noosfero-api/http/task.service";

@Component({
    selector: "add-friend-task-accept",
    template: require("app/task/types/add-friend/add-friend-accept.html"),
})
export class AddFriendTaskAcceptComponent {

    @Input() task: noosfero.Task;
    @Input() confirmationTask: noosfero.AddFriend;

    constructor(@Inject('taskService') private taskService: TaskService) { }

    ngOnInit() {
        if (!this.task.target) return;
        this.taskService.get(this.task.id).then((result: noosfero.RestResult<noosfero.AddFriend>) => {
            this.task = result.data;
        });
    }
}
