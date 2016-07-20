import { Input, Inject, Component } from 'ng-forward';
import { AddMemberTaskAcceptComponent } from "../types/add-member/add-member-task-accept.component";

@Component({
    selector: 'task-accept',
    template: '<div></div>',
    directives: [AddMemberTaskAcceptComponent]
})
@Inject("$element", "$scope", "$injector", "$compile")
export class TaskAcceptComponent {

    @Input() task: noosfero.Task;

    ngOnInit() {
        let componentName = this.task.type.replace(/::/, '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        componentName += "-task-accept";
        this.$element.replaceWith(this.$compile(`<${componentName} [task]="ctrl.task"></${componentName}>`)(this.$scope));
    }

    constructor(private $element: any, private $scope: ng.IScope, private $injector: ng.auto.IInjectorService, private $compile: ng.ICompileService) { }
}
