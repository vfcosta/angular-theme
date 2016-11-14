import { Input, Inject, Component } from 'ng-forward';
import { AddMemberTaskAcceptComponent } from "../types/add-member/add-member-task-accept.component";
import { ApproveCommentTaskAcceptComponent } from "../types/approve-comment/approve-comment-task-accept.component";
import { ApproveArticleTaskAcceptComponent } from "../types/approve-article/approve-article-task-accept.component";
import { AbuseComplaintTaskAcceptComponent } from "../types/abuse-complaint/abuse-complaint-task-accept.component";

@Component({
    selector: 'task-accept',
    template: '<div></div>',
    directives: [AddMemberTaskAcceptComponent, ApproveCommentTaskAcceptComponent, ApproveArticleTaskAcceptComponent, AbuseComplaintTaskAcceptComponent]
})
@Inject("$element", "$scope", "$injector", "$compile")
export class TaskAcceptComponent {

    @Input() task: noosfero.Task;
    @Input() confirmationTask: noosfero.Task;

    ngOnInit() {
        let componentName = this.task.type.replace(/::/, '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        componentName += "-task-accept";
        this.$element.replaceWith(this.$compile(`<${componentName} [task]="ctrl.task" [confirmation-task]="ctrl.confirmationTask"></${componentName}>`)(this.$scope));
    }

    constructor(private $element: any, private $scope: ng.IScope, private $injector: ng.auto.IInjectorService, private $compile: ng.ICompileService) { }
}
