import { NotificationService } from './../../shared/services/notification.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "profile-fast-edition",
    template: require('app/profile/fast-edition/profile-fast-edition.html')
})
export class ProfileFastEditionComponent {

    @Input() profile: noosfero.Profile;
    @Output() finished = new EventEmitter<noosfero.Profile>();

    updatedProfile: noosfero.Profile;

    constructor(@Inject("profileService") private profileService: ProfileService,
                @Inject("notificationService") private notificationService: NotificationService) { }

    ngOnInit() {
      this.cloneProfile();
    }

    save() {
      this.profileService.update(this.updatedProfile).then(() => {
        this.profile = Object.assign(this.profile, this.updatedProfile);
        this.notificationService.success({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
        this.finished.emit(this.profile);
      });
    }

    cancel() {
      this.finished.emit(this.profile);
    }

    cloneProfile() {
      this.updatedProfile = <noosfero.Profile>['id', 'name'].reduce((object, key) => {
        object[key] = this.profile[key]; return object;
      }, {});
    }
}
