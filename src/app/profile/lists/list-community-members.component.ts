import {Component, Inject, provide} from 'ng-forward';
import {ProfileService} from "../../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: 'list-community-members',
    templateUrl: "app/profile/lists/list-community-members.html"
})
@Inject(ProfileService)
export class ListCommunityMembersComponent {

    private members: noosfero.Person[];
    private currentPage: number;
    private membersPerPage: number;
    private totalMembers: number;

    constructor(private profileService: ProfileService) {
      this.members = [];
      this.currentPage = 1;
      this.membersPerPage = 20;
      this.totalMembers = 0;

      this.loadPage();
    }

    loadPage() {
        let filters = {
            per_page: this.membersPerPage,
            page: this.currentPage
        };

        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            return this.profileService.getMembers(profile, filters);
        }).then((result: any) => {
            this.totalMembers = <number>result.headers("total");
            this.members = result.data;
        });
    }
}
