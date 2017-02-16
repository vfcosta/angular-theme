import { NotificationService } from './../../shared/services/notification.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { Component, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
    selector: "profile-fast-edition",
    template: require('app/profile/fast-edition/profile-fast-edition.html')
})
export class ProfileFastEditionComponent {

    @Input() profile: noosfero.Profile;
    @Input() environment: noosfero.Environment;
    @Output() finished = new EventEmitter<noosfero.Profile>();

    @ViewChild('identifier') identifier;

    updatedProfile: noosfero.Profile;

    errors: any;

    constructor( @Inject("profileService") private profileService: ProfileService,
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
            this.finished.emit(this.profile);
            if (identifierChanged) {
                // go to the state with the new identifier url
                this.$state.go(this.$state.current, {profile: this.profile.identifier}, {reload: true});
            }
        }).catch((response) => {
            this.errors = response.data.message;
            if (this.errors['identifier']) {
                let identifierErrors = {};
                for (let error of this.errors['identifier']) {
                    identifierErrors[error] = true;
                }
                this.identifier.control.setErrors(identifierErrors);
            }
        });
    }

    cancel() {
        this.finished.emit(this.profile);
    }

    cloneProfile() {
        this.updatedProfile = <noosfero.Profile>['id', 'name', 'identifier'].reduce((object, key) => {
            object[key] = this.profile[key]; return object;
        }, {});
    }

    getProfileLink() {
        if (!this.environment || !this.environment.host || !this.profile) return null;
        let host = this.environment.host.replace(/https?:\/\//, "");
        return `${host}/${this.updatedProfile.identifier}`;
    }

    identifierChanged() {
        return this.updatedProfile.identifier !== this.profile.identifier;
    }

    allowChangeIdentifier() {
        if (!this.environment || !this.environment.settings) return false;
        if (this.profile.type === 'Person') {
            return this.environment.settings['enable_person_url_change_enabled'];
        } else {
            return this.environment.settings['enable_organization_url_change_enabled'];
        }
    }

    dasherize(text: string) {
        return text.toLowerCase().replace(/\s/g, '-').replace(/\./g, '');
    }

    getErrors(field: string) {
        if (!this[field] || !this[field].errors) return null;
        let prefix = "profile.edition.identifier.";
        return Object.keys(this[field].errors).map(key => prefix + this.dasherize(key));
    }
}
