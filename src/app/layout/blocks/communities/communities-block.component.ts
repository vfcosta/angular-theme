import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: "noosfero-communities-block",
    templateUrl: './communities-block.html',
    styleUrls: ['./communities-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CommunitiesBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;
    @Input() designMode: boolean;

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
