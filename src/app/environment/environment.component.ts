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
@Inject(EnvironmentService, "$state")
export class EnvironmentComponent {

    boxes: noosfero.Box[];
    environment: noosfero.Environment;

    constructor(environmentService: EnvironmentService, $state: ng.ui.IStateService, notificationService: NotificationService) {
        //console.debug("Creating EnvironmentComponent...");
        let boxesPromisse = environmentService.getByIdentifier("default").then((environment: noosfero.Environment) => {
            //console.debug("Set current environment by identifier callback.: ", environment);
            this.environment = environment;
            return environmentService.getBoxes(this.environment.id);
        }).then((boxes: noosfero.Box[]) => {
            //console.debug("Set environment boxes in callback: ", boxes);
            this.boxes = boxes;
        }).catch(() => {
            $state.transitionTo('main');
            notificationService.error({ message: "notification.environment.not_found" });
        });
    }
}
