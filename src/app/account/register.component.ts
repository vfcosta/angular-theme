import { Router } from '@angular/router';
import { Inject, Input, Component, Output, EventEmitter, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { RegisterService } from './../../lib/ng-noosfero-api/http/register.service';
import { NotificationService } from './../shared/services/notification.service';
import { EnvironmentService } from '../../lib/ng-noosfero-api/http/environment.service';
import { ValidationMessageComponent } from '../shared/components/validation-message/validation-message.component';

@Component({
    selector: 'noosfero-register',
    templateUrl: './register-component.html',
    styleUrls: ['register.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
    @Input() account: any;
    environment: noosfero.Environment;

    @ViewChild('nameErrors') nameErrors: ValidationMessageComponent;
    @ViewChild('userNameErrors') userNameErrors: ValidationMessageComponent;
    @ViewChild('emailErrors') emailErrors: ValidationMessageComponent;
    @ViewChild('passwordErrors') passwordErrors: ValidationMessageComponent;
    @ViewChild('passwordConfirmErrors') passwordConfirmErrors: ValidationMessageComponent;

    constructor(private router: Router,
        public registerService: RegisterService,
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
        const error = '';
        const field = '';
        this.registerService.createAccount(this.account).then( () => {
            this.router.navigate(['/']);
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
