import { Component, Inject, Input } from '@angular/core';
import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: "noosfero-communities-block",
    template: require('app/layout/blocks/communities/communities-block.html')
})
export class CommunitiesBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    profiles: any = [];

    constructor(private blockService: BlockService) { }

    ngOnInit() {
        let limit: number = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 4;
        if(this.block.api_content) {
          this.profiles =  this.block.api_content['communities'];
        } else {
            this.blockService.getApiContent(this.block).then((content: any) => {
                this.profiles = content['communities'];
                this.block.api_content = content;
            });
        }
    }
}
