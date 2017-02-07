import { Input, StateConfig, Component, Inject, provide } from 'ng-forward';
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
    },
    {
        url: '^/search?query&per_page',
        component: SearchComponent,
        name: 'main.environment.search',
        views: {
            "mainBlockContent": {
                templateUrl: "app/search/search.html",
                controller: SearchComponent,
                controllerAs: "ctrl"
            }
        }
    }
])
@Inject(EnvironmentService, "$state")
export class EnvironmentComponent {

    boxes: noosfero.Box[];
    @Input() environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService, private $state: ng.ui.IStateService, private notificationService: NotificationService) {
        if (this.$state.params['environment'].id) {
            this.environment = this.$state.params['environment'];
        } else {
            environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
                this.environment = environment;
            });
        }

        this.environmentService.getBoxes(this.environment.id).then((response: restangular.IResponse) => {
            this.boxes = response.data.boxes;
        }).catch(() => {
            this.$state.transitionTo('main');
            this.notificationService.error({ message: "notification.environment.not_found" });
        });
    }

}
