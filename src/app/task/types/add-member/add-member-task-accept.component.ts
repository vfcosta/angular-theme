import { Component, Input, Inject } from "@angular/core";
import { RoleService } from "../../../../lib/ng-noosfero-api/http/role.service";

@Component({
    selector: "add-member-task-accept",
    template: require("app/task/types/add-member/add-member-accept.html"),
})
export class AddMemberTaskAcceptComponent {

    @Input() task: noosfero.Task;
    @Input() confirmationTask: noosfero.AddMemberTask;
    roles: noosfero.Role[];

    constructor(@Inject("roleService") private roleService: RoleService) { }

    ngOnInit() {
        if (!this.task.target) return;
        this.confirmationTask.roles = [];
        this.roleService.getByProfile(this.task.target.id).then((result: noosfero.RestResult<noosfero.Role[]>) => {
            this.roles = result.data;
        });
    }

    toggleSelection(role: noosfero.Role) {
        let index = this.confirmationTask.roles.indexOf(role.id);
        if (index >= 0) {
            this.confirmationTask.roles.splice(index, 1);
        } else {
            this.confirmationTask.roles.push(role.id);
        }
    }
}
