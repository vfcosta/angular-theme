import { TaskAcceptTypeComponent } from './../task-accept-type.component';
import { Component, Input, Inject, Injector, OnInit } from '@angular/core';
import { RoleService } from '../../../../lib/ng-noosfero-api/http/role.service';

@Component({
    selector: "add-member-task-accept",
    templateUrl: './add-member-accept.html',
})
export class AddMemberTaskAcceptComponent extends TaskAcceptTypeComponent implements OnInit {

    roles: noosfero.Role[];

    constructor(private roleService: RoleService, injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        if (!this.task.target) return;
        (<noosfero.AddMemberTask>this.confirmationTask).roles = [];
        this.roleService.getByProfile(this.task.target.id).then((result: noosfero.RestResult<noosfero.Role[]>) => {
            this.roles = result.data;
        });
    }

    toggleSelection(role: noosfero.Role) {
        const index = (<noosfero.AddMemberTask>this.confirmationTask).roles.indexOf(role.id);
        if (index >= 0) {
            (<noosfero.AddMemberTask>this.confirmationTask).roles.splice(index, 1);
        } else {
            (<noosfero.AddMemberTask>this.confirmationTask).roles.push(role.id);
        }
    }
}
