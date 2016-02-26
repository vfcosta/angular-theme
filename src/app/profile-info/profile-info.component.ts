import {StateConfig, Component, Inject} from 'ng-forward';

@Component({
    selector: 'profile',
    templateUrl: "app/profile-info/profile-info.html"
})
@Inject("noosfero")
export class ProfileInfo {

    activities: any
    profile: any

    constructor(private noosfero) {
        this.activate();
    }

    activate() {
        this.noosfero.currentProfile.then((profile) => {
            this.profile = profile;
            return this.noosfero.profiles.one(this.profile.id).one('activities').get();
        }).then((response) => {
            this.activities = response.data.activities;
        });
    }
}
