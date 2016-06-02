import {StateConfig, Component, Inject, provide} from 'ng-forward';
import {EnvironmentService} from "../../lib/ng-noosfero-api/http/environment.service";
import {NotificationService} from "../shared/services/notification.service";
import {EnvironmentHomeComponent} from "./environment-home.component";

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
        provide('environmentService', { useClass: EnvironmentService }),
        provide('notificationService', { useClass: NotificationService })
    ]
})
@StateConfig([
    {
        name: 'main.environment.home',
        url: "",
        component: EnvironmentHomeComponent,
        views: {
            "mainBlockContent": {
                templateUrl: "app/environment/environment-home.html",
                controller: EnvironmentHomeComponent,
                controllerAs: "vm"
            }
        }
    }
])
@Inject(EnvironmentService, "$state", "currentEnvironment")
export class EnvironmentComponent {

    boxes: noosfero.Box[];
    environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService, private $state: ng.ui.IStateService, private notificationService: NotificationService, currentEnvironment: noosfero.Environment) {
        this.environment = currentEnvironment;

        this.environmentService.getBoxes(this.environment.id)
            .then((boxes: noosfero.Box[]) => {
                this.boxes = boxes;
            }).catch(() => {
                this.$state.transitionTo('main');
                this.notificationService.error({ message: "notification.environment.not_found" });
            });

    }

}
