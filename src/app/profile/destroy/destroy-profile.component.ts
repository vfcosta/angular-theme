import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../login';
import { Component, Inject } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { ProfileService } from '../../../lib/ng-noosfero-api/http/profile.service';

@Component({
    selector: 'destroy-profile',
    template: "<div></div>",
})
export class DestroyProfileComponent {

    constructor(private notificationService: NotificationService,
        private profileService: ProfileService, private router: Router,
        private authService: AuthService, route: ActivatedRoute) {

        let profile = route.parent.snapshot.data['profile'];
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
    }

    handleSuccess(profile: noosfero.Profile) {
        this.router.navigate(['/']);
        if (profile && profile.type !== "Community") {
            this.authService.logout();
        }
        this.notificationService.success({ title: "profile.remove.success.title", message: "profile.remove.success.message" });
    }

    handleError(profile: noosfero.Profile) {
        this.router.navigate(['/myprofile', profile.identifier]);
        this.notificationService.error({ title: "profile.remove.failed.title" });
    }
}
