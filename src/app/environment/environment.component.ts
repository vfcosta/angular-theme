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
    providers: [
        provide('notificationService', { useClass: NotificationService }),
        provide('designModeService', { useClass: DesignModeService })
    ]
})
@Inject(EnvironmentService, "$state", NotificationService, AuthService)
export class EnvironmentComponent {

    boxes: noosfero.Box[];
    environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService, private $state: ng.ui.IStateService, private notificationService: NotificationService,
        private AuthService: AuthService, private designModeService: DesignModeService) {
        designModeService.setInDesignMode(false);
        let environmentPromise: Promise<noosfero.Environment>;
        environmentPromise = environmentService.getCurrentEnvironment();
        environmentPromise.then((environment: noosfero.Environment) => {
            this.environment = environment;
            return this.environmentService.getBoxes(this.environment.id);
        }).then((response: restangular.IResponse) => {
            this.environment.boxes = response.data;
            this.boxes = response.data;
        }).catch(() => {
            this.$state.transitionTo('main');
            this.notificationService.error({ message: "notification.environment.not_found" });
        });

        this.AuthService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {
            environmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
                Object.assign(this.environment, result.data);
            });
        });
        this.AuthService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {
            environmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
                Object.assign(this.environment, result.data);
                this.environment.permissions = undefined;
            });
        });
    }
}
