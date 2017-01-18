import { Component, Inject, Input } from "ng-forward";
import {FriendService} from "../../../../lib/ng-noosfero-api/http/friend.service";

@Component({
    selector: "noosfero-friends-block",
    templateUrl: "plugins/friends/blocks/friends-block/friends-block.html"
})
@Inject(FriendService)
export class FriendsBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    profiles: any = [];

    constructor(private friendService: FriendService) { }

    ngOnInit() {
        let limit: number = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 4;
        this.friendService.getByOwner(this.owner, { limit: limit }).then((result: noosfero.RestResult<noosfero.Friend[]>) => {
            this.profiles = result.data;
            console.log("### Profiles ==", result.data);
        });
    }
}
