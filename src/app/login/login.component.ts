import { AuthService } from './auth.service';
import { NotificationService } from './../shared/services/notification.service';
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
    selector: "noosfero-login",
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
    @Input("show") show = false;
    @Output("showChange") showChange = new EventEmitter();

    credentials = <noosfero.Credentials>{};
    showForgotPasswordModal = false;

    constructor(private authService: AuthService, private notificationService: NotificationService) { }

    login() {
        this.authService.login(this.credentials).then((response) => {
            this.notificationService.info({ title: "auth.login.success.title", message: "auth.login.success.message" });
        }).catch((response) => {
            this.notificationService.error({ title: "auth.login.error.title", message: "auth.login.error.message" });
        });
    }

    hide() {
        this.show = false;
        this.showChange.emit(this.show);
    }

    openForgotPassword() {
        this.hide();
        this.showForgotPasswordModal = true;
    }
}
