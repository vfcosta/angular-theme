import { Component, Inject, Input } from '@angular/core';
import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: "noosfero-friends-block",
    template: require('plugins/friends/blocks/friends-block/friends-block.html')
})
export class FriendsBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    profiles: any = [];
    constructor( @Inject('blockService') private blockService: BlockService) { }


    ngOnInit() {
        let limit: number = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 4;
        this.blockService.getApiContent(this.block).then((content: any) => {
            // FIXME we don't need to use api_content and friends at the same time
            this.profiles = content['people'];
            this.block.api_content = content;
        });
    }
}
