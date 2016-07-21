import { Component, Input, Inject } from "ng-forward";
import { RoleService } from "../../../../lib/ng-noosfero-api/http/role.service";

@Component({
    selector: "add-member-task-accept",
    templateUrl: "app/task/types/add-member/add-member-accept.html",
})
@Inject(RoleService)
export class AddMemberTaskAcceptComponent {

    @Input() task: noosfero.Task;
    roles: noosfero.Role[];

    constructor(private roleService: RoleService) { }

    ngOnInit() {
        if (!this.task.target) return;
        this.roleService.getByProfile(this.task.target.id).then((result: noosfero.RestResult<noosfero.Role[]>) => {
            this.roles = result.data;
        });
    }
}
