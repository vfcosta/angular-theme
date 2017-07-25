import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: "noosfero-members-block",
    templateUrl: './members-block.html',
    styleUrls: ['./members-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MembersBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;
    @Input() designMode: boolean;

    profiles: any = [];
    constructor(private blockService: BlockService) { }

    ngOnInit() {
        let limit: number = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 4;
        if (this.block.api_content) {
            this.profiles =  this.block.api_content['people'];
        } else {
            this.blockService.getApiContent(this.block).then((content: any) => {
                this.block.api_content = content;
                this.profiles = this.block.api_content.people;
            });
        }
    }
}
