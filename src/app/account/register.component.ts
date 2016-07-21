import { Inject, Input, Component, Output, EventEmitter, provide } from 'ng-forward';
import { RegisterService } from "./../../lib/ng-noosfero-api/http/register.service";
import { NotificationService } from "./../shared/services/notification.service";
import { EnvironmentService } from "../../lib/ng-noosfero-api/http/environment.service";
import { RegisterController } from "./register.controller";
import { IModalComponent } from "../shared/components/interfaces";

@Component({
    selector: 'noosfero-register',
    templateUrl: 'app/account/register-component.html',
    providers: [
        provide('registerService', { useClass: RegisterService })
    ]
})

@Inject('$state', '$uibModal', '$scope', RegisterService, NotificationService, EnvironmentService)
export class RegisterComponent {
    @Input() account: any;
    environment: noosfero.Environment;

    modalInstance: ng.ui.bootstrap.IModalServiceInstance;

    constructor(
        private $state: ng.ui.IStateService,
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $scope: ng.IScope,
        public registerService: RegisterService,
        private notificationService: NotificationService,
        private environmentService: EnvironmentService,
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

    openTerms() {

        this.modalInstance = this.$uibModal.open({
            templateUrl: 'app/account/register-terms.html',
            size: 'lg',
            controller: RegisterController,
            controllerAs: 'vm',
            bindToController: true,
            scope: this.$scope
        });
    }
}
