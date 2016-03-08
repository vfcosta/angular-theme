import {Input, Inject, Component} from "ng-forward";
import {ProfileService} from "../../../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: "noosfero-members-block",
    templateUrl: 'app/components/noosfero-blocks/members-block/members-block.html',
})
@Inject(ProfileService)
export class MembersBlock {

    @Input() block: any;
    @Input() owner: any;

    members: any = [];

    constructor(private profileService: ProfileService) {

    }

    ngOnInit() {
        this.profileService.getProfileMembers(this.owner.id, { per_page: 6 }).then((response: any) => {
            this.members = response.data.people;
        });
    }
}
