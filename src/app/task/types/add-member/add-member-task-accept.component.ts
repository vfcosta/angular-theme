import { Component, Input, Inject } from "ng-forward";

@Component({
    selector: "add-member-task-accept",
    templateUrl: "app/task/types/add-member/add-member-accept.html",
})
export class AddMemberTaskAcceptComponent {

    @Input() task: noosfero.Task;
    roles: any;

    constructor() {
        //TODO list roles from API
        this.roles = ["Profile Administrator", "Member", "Moderator"];
    }

}
