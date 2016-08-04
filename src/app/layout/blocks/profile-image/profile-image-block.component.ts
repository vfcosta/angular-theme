import { Inject, Input, Component } from "ng-forward";
import { ProfileImageComponent } from "./../../../profile/image/profile-image.component";
import { ProfileService } from "../../../../lib/ng-noosfero-api/http/profile.service";
import { SessionService } from "./../../../login";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
    selector: "noosfero-profile-image-block",
    templateUrl: 'app/layout/blocks/profile-image/profile-image-block.html',
    directives: [ProfileImageComponent]
})
@Inject(ProfileService, SessionService, NotificationService)
export class ProfileImageBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    private isMember: boolean;

    constructor(private profileService: ProfileService, private session: SessionService, private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.loadMembership();
    }

    loadMembership() {
        let person = this.session.currentUser() ? this.session.currentUser().person : null;
        this.profileService.isMember(person, this.owner).then((val: boolean) => {
            this.isMember = val;
        });
    }

    join() {
        let person = this.session.currentUser() ? this.session.currentUser().person : null;
        this.profileService.addMember(person, this.owner).then((result: any) => {
            if (result.data.pending) {
                this.notificationService.success({ title: "blocks.profile_image.join.moderation.title", message: "blocks.profile_image.join.moderation.message" });
            } else {
                this.loadMembership();
            }
        });
    }

    leave() {
        let person = this.session.currentUser() ? this.session.currentUser().person : null;
        this.profileService.removeMember(person, this.owner).then(() => {
            this.loadMembership();
        });
    }

    displayOrganizationActions() {
        return this.owner.type !== 'Person';
    }
}
