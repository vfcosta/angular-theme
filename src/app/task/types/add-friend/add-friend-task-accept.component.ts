import { Component, Input, Inject } from "ng-forward";
import { TaskService } from "../../../../lib/ng-noosfero-api/http/task.service";

@Component({
    selector: "add-friend-task-accept",
    templateUrl: "app/task/types/add-friend/add-friend-accept.html",
})
@Inject(TaskService)
export class AddFriendTaskAcceptComponent {

    @Input() task: noosfero.Task;
    @Input() confirmationTask: noosfero.AddFriend;

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        if (!this.task.target) return;
        this.taskService.get(this.task.id).then((result: noosfero.RestResult<noosfero.AddFriend>) => {
            this.task = result.data;
        });
    }
}
