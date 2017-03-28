import { NotificationService } from './../../../shared/services/notification.service';
import { EventEmitter } from 'ng-forward';
import { ProfileService } from './../../../../lib/ng-noosfero-api/http/profile.service';
import { Component, Input, Inject, Output, ViewChild } from '@angular/core';

/**
 * @ngdoc controller
 * @name ProfilePersonalDataComponent
 * @description
 *  The controller responsible to profile configuration.
 */
@Component({
    selector: "profile-personal-data",
    template: require('app/profile/configuration/personal-data/profile-personal-data.html')
})
export class ProfilePersonalDataComponent {

    @Input() profile: noosfero.Profile;
    @Output() finished = new EventEmitter<noosfero.Profile>();

    @ViewChild('identifierErrors') identifierErrors;

    customFieldsDict: Dictionary;

    updatedProfile: noosfero.Profile;

    errors: any;

    constructor(@Inject("profileService") private profileService: ProfileService,
        @Inject("notificationService") private notificationService: NotificationService,
        @Inject("$state") private $state: ng.ui.IStateService) { }

    ngOnInit() {
        this.cloneProfile();
    }

    save() {
        this.profileService.update(this.updatedProfile).then(() => {
            this.errors = null;
            let identifierChanged = this.profile.identifier !== this.updatedProfile.identifier;
            this.profile = Object.assign(this.profile, this.updatedProfile);
            this.notificationService.success({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
            // this.finished.emit(this.profile);
            if (identifierChanged) {
                // go to the state with the new identifier url
                this.$state.go(this.$state.current, { profile: this.profile.identifier }, { reload: true });
            }
        }).catch((response) => {
            this.errors = response.data.message;
            this.identifierErrors.setErrors(this.errors['identifier']);
        });
    }

    cancel() {
        // this.finished.emit(this.profile);
    }

    cloneProfile() {
        this.updatedProfile = this.profile;
        this.customFieldsDict = this.updatedProfile.additional_data;
    }

    keys(): Array<string> {
        return Object.keys(this.customFieldsDict);
    }
}

interface Dictionary {
    [ index: string ]: string;
}