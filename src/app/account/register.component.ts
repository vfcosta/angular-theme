import { Inject, Input, Component, Output, EventEmitter, provide } from 'ng-forward';
import { RegisterService } from "./../../lib/ng-noosfero-api/http/register.service";
import { NotificationService } from "./../shared/services/notification.service";
import { EnvironmentService } from "../../lib/ng-noosfero-api/http/environment.service";

@Component({
    selector: 'noosfero-register',
    templateUrl: 'app/account/register-component.html',
    providers: [
        provide('registerService', { useClass: RegisterService })
    ]
})

@Inject("$state", RegisterService, NotificationService, EnvironmentService)
export class RegisterComponent {
    @Input() account: any;
    environment: noosfero.Environment;

    constructor(
        private $state: ng.ui.IStateService,
        public registerService: RegisterService,
        private notificationService: NotificationService,
        private environmentService: EnvironmentService
    ) {
        this.account = {};
        this.environment = environmentService.getCurrentEnvironment();
    }

    signup() {
        if (this.account.password === this.account.password_confirmation) {
            this.registerService.createAccount(this.account).then((response) => {
                if (response.status === 201) {
                    this.$state.transitionTo('main.environment');
                    this.notificationService.success({ title: "account.register.success.title", message: "account.register.success.message" });
                } else {
                    throw new Error('Invalid attributes');
                }
            });
        } else {
            this.notificationService.error({ message: "account.register.passwordConfirmation.failed" });
        }
    }

    isInvalid(field: Object): Object {
        return { 'has-error': field['$touched'] && field['$invalid'] };
    }
}
