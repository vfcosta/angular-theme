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
    selector: "new-community",
    template: require('app/profile/configuration/community/new-community.html'),
})
export class NewCommunityComponent {
    @Input() profile: noosfero.Profile;
    community = <noosfero.Community> {};
    @Output() finished = new EventEmitter<noosfero.Profile>();
    errors: any;

    constructor(@Inject("notificationService") private notificationService: NotificationService,
    @Inject('communityService') private communityService: CommunityService) {}

    save() {
        this.community.type = 'Community';
        console.log(this.community);
        this.communityService.createNewCommunity(this.community).then( (result) => {
            this.errors = null;
            this.notificationService.success({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
            this.finished.emit(this.community);
        }).catch((response) => {
            this.errors = response.data;
            this.notificationService.error({ title: "profile.edition.error.title", message: "profile.edition.error.message" });
        });
    }

    cancel() {
        this.finished.emit(this.community);
    }

    onSelectionChange(entry) {
        this.community.closed = entry;
    }
}