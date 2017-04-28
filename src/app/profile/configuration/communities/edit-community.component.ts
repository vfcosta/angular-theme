import { SessionService } from './../../../login/session.service';
import { NotificationService } from './../../../shared/services/notification.service';
import { CommunityService } from './../../../../lib/ng-noosfero-api/http/community.service';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { Component, Input, Output, Inject, EventEmitter } from '@angular/core';
import { AbstractFormCommunity } from './abstract-form-community';

/**
 * @ngdoc controller
 * @name AddCommunityComponent
 */
declare var _: any;
@Component({
    selector: "edit-community",
    template: require('app/profile/configuration/communities/form-community.html'),
})
export class EditCommunityComponent extends AbstractFormCommunity {
    ngOnInit() {
        this.sessionProfile = this.sessionService.currentUser().person;
        this.community = <noosfero.Community> this.profile;
        this.acceptBefore = this.community.closed;
    }

    getTitle() {
        return this.translatorService.translate('myprofile.configuration.community.edit');
    }

    save() {
        let profile: any = Object.assign({}, _.omitBy(_.pick(this.community, ['id', 'identifier', 'name', 'closed']), _.isNull));
        this.profileService.update(profile).then( (result) => {
            this.notificationService.success({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
        }).catch((response) => {
            let errors = response.data;
            if (response.status === 422) {
                this.nameErrors.setErrors(errors.errors_details.name);
                this.nameErrors.setErrors(errors.errors_details.identifier);
            } else {
                this.notificationService.error({ title: "profile.edition.error.title", message: errors.message ? errors.message : "profile.edition.error.message" });
            }
        });
    }

    cancel() {
    }
}