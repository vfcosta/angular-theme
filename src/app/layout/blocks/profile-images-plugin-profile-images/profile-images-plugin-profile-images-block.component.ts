import {Component, Inject, Input} from "ng-forward";
import {BlockService} from "./../../../../lib/ng-noosfero-api/http/block.service";
import {Arrays} from "./../../../../lib/util/arrays";

@Component({
    selector: "noosfero-profile-images-plugin-profile-images-block",
    templateUrl: 'app/layout/blocks/profile-images-plugin-profile-images/profile-images-plugin-profile-images-block.html'
})
@Inject(BlockService, "$state")
export class ProfileImagesPluginProfileImagesBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    images: any;

    constructor(private blockService: BlockService, private $state: any) { }

    ngOnInit() {
        this.profile = this.owner;
        this.images = [];
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.images = content.images;
        });
    }
}
