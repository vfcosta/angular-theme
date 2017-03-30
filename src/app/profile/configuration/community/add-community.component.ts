import { NotificationService } from './../../../shared/services/notification.service';
import { CommunityService } from './../../../../lib/ng-noosfero-api/http/community.service';
import { ProfileService } from './../../../../lib/ng-noosfero-api/http/profile.service';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { Component, Input, Output, Inject, EventEmitter } from '@angular/core';

/**
 * @ngdoc controller
 * @name AddCommunityComponent
 */
@Component({
    selector: "add-community",
    template: require('app/profile/configuration/community/add-community.html'),
})
export class AddCommunityComponent {
    profile: noosfero.Profile;
    community: noosfero.Community;
    @Output() finished = new EventEmitter<noosfero.Profile>();
    errors: any;
    closed: boolean;

    constructor( @Inject('profileService') private profileService: ProfileService,
        @Inject("notificationService") private notificationService: NotificationService) {
        profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
        });
    }

    save() {
        this.community.type = 'Community';
        this.community.closed = this.closed;
        this.profileService.create(this.community).then(() => {
            this.errors = null;
            this.notificationService.success({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
            this.finished.emit(this.profile);
        }).catch((response) => {
            this.errors = response.data.error;
            console.log(this.errors);
            this.notificationService.error({ title: "profile.edition.error.title", message: "profile.edition.error.message" });
        });
    }

    cancel() {
        this.finished.emit(this.community);
    }

    onSelectionChange(entry) {
        this.closed = entry;
        console.log(entry);
    }
}