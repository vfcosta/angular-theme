import { Input, Inject, Component } from 'ng-forward';
import { ApproveCommentTaskAcceptComponent } from "../types/approve-comment/approve-comment-task-accept.component";
import { AddFriendTaskAcceptComponent } from "../types/add-friend/add-friend-task-accept.component";

@Component({
    selector: 'task-accept',
    template: '<div></div>',
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