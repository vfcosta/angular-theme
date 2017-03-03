import { Component, Inject, Input } from '@angular/core';
import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: "noosfero-members-block",
    template: require('app/layout/blocks/members/members-block.html')
})
export class MembersBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    profiles: any = [];
    constructor( @Inject('blockService') private blockService: BlockService) { }


    ngOnInit() {
        let limit: number = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 4;
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.block.api_content = content;
            this.profiles = this.block.api_content.people;
        });
    }
}
