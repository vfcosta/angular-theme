import { UserService } from './../../../../lib/ng-noosfero-api/http/user.service';
import { SessionService } from './../../../login/session.service';
import { TranslatorService } from './../../../shared/services/translator.service';
import { NotificationService } from './../../../shared/services/notification.service';
import { ProfileService } from './../../../../lib/ng-noosfero-api/http/profile.service';
import { Component, Input, Inject, Output, ViewChild, EventEmitter } from '@angular/core';


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
    @Output() finished = new EventEmitter<any[]>();

    @ViewChild('identifierErrors') identifierErrors;

    current_password: string;
    new_password: string;
    new_password_confirmation: string;
    errors: any;

    constructor( @Inject("userService") private userService: UserService,
        @Inject("notificationService") private notificationService: NotificationService,
        @Inject("$state") private $state: ng.ui.IStateService) { }

    save() {
        if (this.new_password !== this.new_password_confirmation) {
            this.notificationService.error({ title: "new_password.failed.title", message: "profile.edition.password.error.message" });
            return false;
        } else {
            this.userService.changePassword(this.profile, this.current_password, this.new_password, this.new_password_confirmation).then( response => {
                this.errors = null;
                this.notificationService.success({ title: "profile.edition.success.title", message: "new_password.success.message" });
                this.$state.go('main.myprofile', { profile: this.profile.identifier });
            }).catch( error => {
                this.errors = error.message;
                this.notificationService.error({ title: "new_password.failed.title", message: "new_password.failed.message" });
            });
        }
    }

    cancel() {
        this.finished.emit([this.current_password, this.new_password, this.new_password_confirmation]);
    }
}