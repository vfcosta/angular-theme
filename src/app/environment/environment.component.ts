import { Input, Component, Inject, provide } from 'ng-forward';
import { EnvironmentService } from "../../lib/ng-noosfero-api/http/environment.service";
import { NotificationService } from "../shared/services/notification.service";
import { EnvironmentHomeComponent } from "./environment-home.component";
import { SearchComponent } from "../search/search.component";


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
        provide('notificationService', { useClass: NotificationService })
    ]
})
@Inject(EnvironmentService, "$state")
export class EnvironmentComponent {

    boxes: noosfero.Box[];
    @Input() environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService, private $state: ng.ui.IStateService, private notificationService: NotificationService) {
        let environmentPromise: Promise<noosfero.Environment>;
        if (this.$state.params['environment'].id) {
            this.environment = this.$state.params['environment'];
            environmentPromise = Promise.resolve(this.environment);
        } else {
            environmentPromise = environmentService.getCurrentEnvironment();
        }
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
    }

}
