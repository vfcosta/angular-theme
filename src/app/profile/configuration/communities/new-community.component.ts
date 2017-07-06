import { SessionService } from './../../../login/session.service';
import { NotificationService } from './../../../shared/services/notification.service';
import { CommunityService } from './../../../../lib/ng-noosfero-api/http/community.service';
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
        this.community = <noosfero.Community>{ closed: true };
        this.nameErrors.pushAditionalField('identifier');
        this.profile = this.route.parent.snapshot.data['profile'];
    }

    getTitle() {
        return this.translatorService.translate('myprofile.configuration.community.new');
    }

    save() {
        this.community.type = 'Community';
        this.communityService.createNewCommunity(this.community).then((result) => {
            this.notificationService.success({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
            this.router.navigate(['/myprofile', this.profile.identifier, 'communities']);
        }).catch(response => {
            let errors = response.data;
            if (response.status === 422) {
                this.nameErrors.setBackendErrors(errors);
            } else {
                this.notificationService.error({ title: "profile.edition.error.title", message: response.message });
            }
        });
    }

    cancel() {
        this.router.navigate(['/myprofile', this.profile.identifier, 'communities']);
    }
}