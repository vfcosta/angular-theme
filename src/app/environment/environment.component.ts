import { ThemeService } from './../shared/services/theme.service';
import { EnvironmentService } from '../../lib/ng-noosfero-api/http/environment.service';
import { AuthEvents, AuthService } from '../login';
import { NotificationService } from '../shared/services/notification.service';
import { DesignModeService } from './../shared/services/design-mode.service';
import { Component, Inject, provide } from 'ng-forward';


/**
 * @ngdoc controller
 * @name environment.Environment
 * @description
 *  This is the environment controller.
 */
@Component({
    selector: 'environment',
    templateUrl: "app/environment/environment.html",
})
@Inject("environmentService", "$state", "notificationService", "authService", "designModeService", "themeService")
export class EnvironmentComponent {

    boxes: noosfero.Box[];

    constructor(private environmentService: EnvironmentService, private $state: ng.ui.IStateService, private notificationService: NotificationService,
        private authService: AuthService, private designModeService: DesignModeService,
        private themeService: ThemeService, private environment: noosfero.Environment) {

        if (themeService.verifyTheme(this.environment.theme)) return;
        designModeService.setInDesignMode(false);
        this.environmentService.getBoxes(this.environment.id).then((response: restangular.IResponse) => {
            this.environment.boxes = response.data;
            this.boxes = response.data;
        }).catch(() => {
            this.$state.transitionTo('main');
            this.notificationService.error({ message: "notification.environment.not_found" });
        });

        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            environmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
                Object.assign(this.environment, result.data);
            });
        });
        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            environmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
                Object.assign(this.environment, result.data);
                this.environment.permissions = undefined;
            });
        });
    }
}
