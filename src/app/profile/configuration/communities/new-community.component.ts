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
        this.communityService.createNewCommunity(this.community).then((result) => {
             this.notificationService.success({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
             this.$state.go('main.myprofile.communities', { profile: this.profile.identifier });
        }).catch(response => {
            let errors = response.data;
            this.nameErrors.setBackendErrors(errors);
        });
    }

    cancel() {
        this.$state.go('main.myprofile.communities', { profile: this.sessionProfile.identifier });
    }
}