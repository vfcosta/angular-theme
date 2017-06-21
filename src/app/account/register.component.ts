import { Inject, Input, Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { RegisterService } from "./../../lib/ng-noosfero-api/http/register.service";
import { NotificationService } from "./../shared/services/notification.service";
import { EnvironmentService } from "../../lib/ng-noosfero-api/http/environment.service";
import { AuthController } from './../login';
import { IModalComponent } from "../shared/components/interfaces";
import { ValidationMessageComponent } from '../shared/components/validation-message/validation-message.component';

@Component({
    selector: 'noosfero-register',
    template: require('app/account/register-component.html')
})
export class RegisterComponent {
    @Input() account: any;
    environment: noosfero.Environment;
    modalInstance: ng.ui.bootstrap.IModalServiceInstance;
    @ViewChild('nameErrors') nameErrors: ValidationMessageComponent;
    @ViewChild('userNameErrors') userNameErrors: ValidationMessageComponent;
    @ViewChild('emailErrors') emailErrors: ValidationMessageComponent;
    @ViewChild('passwordErrors') passwordErrors: ValidationMessageComponent;
    @ViewChild('passwordConfirmErrors') passwordConfirmErrors: ValidationMessageComponent;

    constructor(
        @Inject('$state') private $state: ng.ui.IStateService,
        public RegisterService: RegisterService,
        private notificationService: NotificationService,
        private environmentService: EnvironmentService) {
        this.account = {};
    }

    ngOnInit() {
        this.environmentService.get('default').then((result: noosfero.RestResult<noosfero.Environment>) => {
            this.environment = result.data;
        });
    }

    signup() {
        let error = '';
        let errors: any;
        let field = '';
        this.RegisterService.createAccount(this.account).then( () => {
            this.$state.transitionTo('main.environment.home');
            this.notificationService.success({ title: "account.register.success.title", message: "account.register.success.message" });
        }).catch( response => {
            if (response.status === 422) {
                this.nameErrors.setBackendErrors(response.data);
                this.userNameErrors.setBackendErrors(response.data);
                this.emailErrors.setBackendErrors(response.data);
                this.passwordErrors.setBackendErrors(response.data);
                this.passwordConfirmErrors.setBackendErrors(response.data);
            } else {
                this.notificationService.error({ title: "account.register.save.failed" });
            }
        });
    }
}
