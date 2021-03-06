import { Component, Inject, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: "noosfero-people-block",
    templateUrl: './people-block.html',
    styleUrls: ['./people-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PeopleBlockComponent implements OnInit {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Environment;
    @Input() designMode: boolean;

    profiles: any = [];

    constructor(private blockService: BlockService) { }

    ngOnInit() {
        const limit: number = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 4;
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.block.api_content = content;
            this.profiles = this.block.api_content.people;
        });
    }
}
