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
        provide('environmentService', { useClass: EnvironmentService }),
        provide('notificationService', { useClass: NotificationService })
    ]
})
@Inject(EnvironmentService, "$state")
export class EnvironmentComponent {

    boxes: noosfero.Box[];
    @Input() environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService, private $state: ng.ui.IStateService, private notificationService: NotificationService) {
        if (this.$state.params['environment'].id) {
            this.environment = this.$state.params['environment'];
        } else {
            this.environment = this.environmentService.getCurrentEnvironment();
        }
        environmentService.get().then((result: any) => {
            this.environment = result;
            this.environmentService.getBoxes(this.environment.id).then((boxes: noosfero.Box[]) => {
                this.boxes = boxes;
            }).catch(() => {
                this.$state.transitionTo('main');
                this.notificationService.error({ message: "notification.environment.not_found" });
            });
        })
    }

}
