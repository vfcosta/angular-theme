import { AuthService } from '../../login';
import { Component, Inject } from "@angular/core";
import { NotificationService } from "../../shared/services/notification.service";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service.ng2";

@Component({
    selector: 'destroy-profile',
    template: "not-used",
})
export class DestroyProfileComponent {

    constructor(
        @Inject("$state") private $state: ng.ui.IStateService,
        @Inject('notificationService') private notificationService: NotificationService,
        private profileService: ProfileService,
        @Inject('authService') private AuthService: AuthService) {
        profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            if (!profile) return;
            notificationService.confirmation({ title: "profile.remove.confirmation.title", message: "profile.remove.confirmation.message" }, () => {
                profileService.remove(profile).then((response: noosfero.RestResult<any>) => {
                    if (response.data.success) {
                        this.handleSuccess(profile);
                    } else {
                        this.handleError(profile);
                    }
                }).catch(() => {
                    this.handleError(profile);
                });
            });
        });
    }

    handleSuccess(profile: noosfero.Profile) {
        this.$state.go("main.domain");
        this.AuthService.logout();
        this.notificationService.success({ title: "profile.remove.success.title", message: "profile.remove.success.message" });
    }

    handleError(profile: noosfero.Profile) {
        this.$state.go("main.myprofile", { profile: profile.identifier });
        this.notificationService.error({ title: "profile.remove.failed.title" });
    }
}
