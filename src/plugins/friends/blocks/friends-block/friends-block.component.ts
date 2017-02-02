import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { Component, Inject, Input } from "ng-forward";

@Component({
    selector: "noosfero-friends-block",
    templateUrl: "plugins/friends/blocks/friends-block/friends-block.html"
})
@Inject(BlockService)
export class FriendsBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    friends: any = [];

    constructor(private blockService: BlockService) { }

    ngOnInit() {
        let limit: number = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 4;
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.friends = content['people'];
            this.block.api_content = content;
        });
    }
}
