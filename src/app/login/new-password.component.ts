import { ActivatedRoute, Router } from '@angular/router';
import { ValidationMessageComponent } from '../shared/components/validation-message/validation-message.component';
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { PasswordService } from '../../lib/ng-noosfero-api/http/password.service';
import { NotificationService } from './../shared/services/notification.service';

@Component({
    selector: 'new-password',
    templateUrl: './new-password.html'
})
export class PasswordComponent {

    code: string;
    password: string;
    passwordConfirmation: string;
    @ViewChild('passwordErrors') passwordErrors: ValidationMessageComponent;
    @ViewChild('passwordConfirmErrors') passwordConfirmErrors: ValidationMessageComponent;

    constructor(private route: ActivatedRoute, private router: Router,
        public passwordService: PasswordService,
        private notificationService: NotificationService) {
        this.code = route.snapshot.params['code'];
    }

    sendNewPassword() {
        this.passwordService.newPassword(this.code, this.password, this.passwordConfirmation).then((response) => {
            this.notificationService.success({ title: "new_password.success.title", message: "new_password.success.message" }, { timer: 5000 });
            this.router.navigate(['/']);
        }).catch((response) => {
            if (response.status === 422) {
                this.passwordErrors.setBackendErrors(response.data);
                this.passwordConfirmErrors.setBackendErrors(response.data);
            } else {
                this.notificationService.error({ title: "new_password.failed.title", message: "new_password.failed.message" });
            }
        });
    }
}
