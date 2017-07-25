import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: "noosfero-friends-block",
    templateUrl: './friends-block.html',
    styleUrls: ['./friends-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FriendsBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;
    @Input() designMode: boolean;

    profiles: any = [];
    constructor(private blockService: BlockService) { }

    ngOnInit() {
        let limit: number = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 4;

        if (this.block.api_content) {
            this.profiles = this.block.api_content['people'];
        } else {
            this.blockService.getApiContent(this.block).then((content: any) => {
                // FIXME we don't need to use api_content and friends at the same time
                this.profiles = content['people'];
                this.block.api_content = content;
            });
        }
    }
}
