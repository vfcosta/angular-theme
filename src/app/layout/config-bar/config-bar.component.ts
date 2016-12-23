import {Component, Inject, Input} from 'ng-forward';
import {DesignModeService} from '../../shared/services/design-mode.service';

@Component({
    selector: "config-bar",
    templateUrl: "app/layout/config-bar/config-bar.html"
})
@Inject("$scope", DesignModeService)
export class ConfigBarComponent {

    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() permissionAction = "allow_edit";

    designModeOn = false;

    constructor(private $scope: ng.IScope, private designModeService: DesignModeService) {
        // this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
        //     this.designModeService.destroy();
        // });
        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designModeOn = designModeOn;
            this.$scope.$apply();
        });
        this.designModeOn = this.designModeService.isInDesignMode();
    }

}
