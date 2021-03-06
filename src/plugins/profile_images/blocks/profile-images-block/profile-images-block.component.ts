import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { Component, Inject, Input, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: "noosfero-profile-images-plugin-profile-images-block",
    templateUrl: './profile-images-block.html',
    styleUrls: ['./profile-images-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileImagesBlockComponent implements OnInit {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    profile: any;
    images: any;

    constructor(private blockService: BlockService) { }

    ngOnInit() {
        this.profile = this.owner;
        this.images = [];
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.images = content.images;
        });
    }
}
