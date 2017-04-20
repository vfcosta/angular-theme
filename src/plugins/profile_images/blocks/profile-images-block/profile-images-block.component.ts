import { Component, Inject, Input } from '@angular/core';
import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: "noosfero-profile-images-plugin-profile-images-block",
    template: require('plugins/profile_images/blocks/profile-images-block/profile-images-block.html')

})
export class ProfileImagesBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    images: any;

    constructor( @Inject('blockService') private blockService: BlockService) { }

    ngOnInit() {
        this.profile = this.owner;
        this.images = [];
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.images = content.images;
        });
    }
}
