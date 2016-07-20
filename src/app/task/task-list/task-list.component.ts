import { Component, Input } from "ng-forward";

@Component({
    selector: "task-list",
    templateUrl: "app/task/task-list/task-list.html",
})
export class TaskListComponent {

    @Input() tasks: noosfero.Task[];

    private taskTemplates = ["AddFriend", "AddMember", "CreateCommunity"];

    getTaskTemplate(task: noosfero.Task) {
        if (this.taskTemplates.indexOf(task.type) >= 0) {
            return 'app/task/types/' + task.type + '.html';
        } else {
            return 'app/task/types/default.html';
        }
    }
}
