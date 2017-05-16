import { Component, Inject } from 'ng-forward';

@Component({
    selector: "route-ng2",
    template: '<div></div>',
})
@Inject("$stateParams")
export class RouteNg2 {

    constructor(private $stateParams: ng.ui.IStateParamsService) { }

}