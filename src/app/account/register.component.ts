import { Inject, Input, Component, Output, EventEmitter, provide } from 'ng-forward';
import { RegisterService } from "./../../lib/ng-noosfero-api/http/register.service";
import { NotificationService } from "./../shared/services/notification.service";
import { EnvironmentService } from "../../lib/ng-noosfero-api/http/environment.service";
import { RegisterController } from "./register.controller";
import { AuthController } from "./../login";
import { IModalComponent, IErrorMessages } from "../shared/components/interfaces";

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
        private $scope: IErrorMessages,
        public registerService: RegisterService,
        private notificationService: NotificationService,
        private environmentService: EnvironmentService
    ) {
        this.account = {};
        this.environment = environmentService.getCurrentEnvironment();
    }

    signup() {
        let error = '';
        let errors: any;
        let field = '';
        this.$scope.errorMessages = [];
        this.registerService.createAccount(this.account).then((response) => {
            this.$state.transitionTo('main.environment');
            this.notificationService.success({ title: "account.register.success.title", message: "account.register.success.message" });
        }).catch((response) => {
            if ( response.data.error ) {
              errors = response.data['error'].split(', ');
              for (error in errors) {
                 this.$scope.errorMessages.push({ message: errors[error] });
              }
            } else if ( response.data.message ) {
              errors = JSON.parse(response.data.message);
              for (field in errors) {
                 this.$scope.errorMessages.push({ fieldName: field, message: errors[field][0] });
              }
            }
            this.notificationService.error({ title: "account.register.save.failed" });
        });
    }

    isInvalid(field: any): any {
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

    openLogin() {
        this.modalInstance = this.$uibModal.open({
            templateUrl: 'app/login/login.html',
            controller: AuthController,
            controllerAs: 'vm',
            bindToController: true
        });
    }

}
