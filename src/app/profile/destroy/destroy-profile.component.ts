import { Component, Inject } from "ng-forward";
import { NotificationService } from "../../shared/services/notification.service";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: 'destroy-profile',
    template: "not-used",
})
@Inject("$state", NotificationService, ProfileService)
export class DestroyProfileComponent {

    constructor($state: ng.ui.IStateService, notificationService: NotificationService, profileService: ProfileService) {
        profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            if (!profile) return;
            notificationService.confirmation({ title: "profile.remove.confirmation.title", message: "profile.remove.confirmation.message" }, () => {
                profileService.remove(profile).then(() => {
                    $state.go("main.environment.home");
                    notificationService.success({ title: "profile.remove.success.title", message: "profile.remove.success.message" });
                }).catch(() => {
                    notificationService.error({ title: "profile.remove.failed.title" });
                });
            });
        });
    }
}
