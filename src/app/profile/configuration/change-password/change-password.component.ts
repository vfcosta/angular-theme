import { UserService } from './../../../../lib/ng-noosfero-api/http/user.service';
import { SessionService } from './../../../login/session.service';
import { TranslatorService } from './../../../shared/services/translator.service';
import { NotificationService } from './../../../shared/services/notification.service';
import { Component, Input, Inject, Output, ViewChild, EventEmitter } from '@angular/core';
import { ValidationMessageComponent } from '../../../shared/components/validation-message/validation-message.component';


/**
 * @ngdoc controller
 * @name ChangePasswordComponent
 * @description
 *  The controller responsible to change the user password.
 */
@Component({
    selector: "change-password",
    template: require('app/profile/configuration/change-password/change-password.html')
})
export class ChangePasswordComponent {

    @Input() profile: noosfero.Profile;

    @ViewChild('currentPasswordValidation') currentPassword: ValidationMessageComponent;
    @ViewChild('newPasswordValidation') newPassword: ValidationMessageComponent;
    @ViewChild('newPasswordConfirmationValidation') newPasswordConfirmation: ValidationMessageComponent;

    current_password: string;
    new_password: string;
    new_password_confirmation: string;
    errors: any;

    constructor(private userService: UserService,
        @Inject("notificationService") private notificationService: NotificationService,
        @Inject("$state") private $state: ng.ui.IStateService) { }

    save(event: Event) {
        event.preventDefault();
        if (this.new_password !== this.new_password_confirmation) {
            this.newPasswordConfirmation.setBackendErrors({errors: { password_confirmation: [{error: 'profile.edition.password.error.message'}] }});
            return false;
        } else {
            this.userService.changePassword(this.profile, this.current_password, this.new_password, this.new_password_confirmation)
                .then(response => {
                    this.errors = null;
                    this.notificationService.success({ title: "profile.edition.success.title", message: "new_password.success.message" });
                    this.$state.go('main.myprofile', { profile: this.profile.identifier });
                })
                .catch(error => {
                    this.errors = error.data;
                    this.currentPassword.setBackendErrors(this.errors);
                    this.newPassword.setBackendErrors(this.errors);
                    this.newPasswordConfirmation.setBackendErrors(this.errors);
                });
        }
    }
}
