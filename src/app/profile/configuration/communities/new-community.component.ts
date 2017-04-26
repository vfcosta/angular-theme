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
@Component({
    selector: "new-community",
    template: require('app/profile/configuration/communities/form-community.html'),
})
export class NewCommunityComponent extends AbstractFormCommunity {

    ngOnInit() {
        this.sessionProfile = this.sessionService.currentUser().person;
        this.community = <noosfero.Community>{closed: true};
    }

    getTitle() {
        return this.translatorService.translate('myprofile.configuration.community.new');
    }

    save() {
        this.community.type = 'Community';
        // console.log(this.communityService);
        // console.log(this.communityService.createNewCommunity(this.community));
        this.communityService.createNewCommunity(this.community).then((result) => {
             this.notificationService.success({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
             this.$state.go('main.myprofile.communities', { profile: this.profile.identifier });
        }).catch(response => {
            // console.log('@@@@@@@', response);
            // console.log('$$$$$', this.nameErrors);

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
        this.$state.go('main.myprofile.communities', { profile: this.sessionProfile.identifier });
    }
}