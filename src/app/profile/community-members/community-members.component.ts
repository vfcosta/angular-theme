import { Component, Inject, Input } from '@angular/core';
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: "noosfero-community-members",
    template: require('app/profile/community-members/community-members.html')
})
export class CommunityMembersComponent {

    private members: noosfero.Person[];
    private currentPage: number;
    private membersPerPage: number;
    private totalMembers: number;
    private profile: noosfero.Profile;
    private style: string;

    constructor(private profileService: ProfileService) {
        this.members = [];
        this.currentPage = 1;
        this.membersPerPage = 20;
        this.totalMembers = 0;
        this.style = 'card';

        this.loadPage({ page: 1 });
    }

    getStyle() {
        return this.style;
    }

    loadPage($event: any) {
        let filters = {
            per_page: this.membersPerPage,
            page: $event.page,
            order: 'name ASC'
        };
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return this.profileService.getMembers(profile, filters);
        }).then((result: any) => {
            this.totalMembers = <number>(<any>result.headers).get("total");
            this.members = result.data;
        });
    }

}
