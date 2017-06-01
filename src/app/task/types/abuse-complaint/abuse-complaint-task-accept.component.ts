import { TaskAcceptTypeComponent } from './../task-accept-type.component';
import { Component, Input, Inject, Injector } from "@angular/core";
import { TaskService } from "../../../../lib/ng-noosfero-api/http/task.service";

@Component({
    selector: "abuse-complaint-task-accept",
    template: require("app/task/types/abuse-complaint/abuse-complaint-accept.html"),
})
export class AbuseComplaintTaskAcceptComponent extends TaskAcceptTypeComponent {

    constructor( @Inject('taskService') private taskService: TaskService, injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        if (!this.task.target) return;
        this.taskService.get(this.task.id).then((result: noosfero.RestResult<noosfero.AbuseComplaint>) => {
            this.task = result.data;
        });
    }
}
