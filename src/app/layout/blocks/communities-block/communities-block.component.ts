import {Input, Inject, Component} from "ng-forward";
import {CommunityService} from "../../../../lib/ng-noosfero-api/http/community.service";

@Component({
    selector: "noosfero-communities-block",
    templateUrl: 'app/layout/blocks/communities-block/communities-block.html',
})
@Inject(CommunityService)
export class CommunitiesBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    profiles: any = [];

    constructor(private communityService: CommunityService) { }

    ngOnInit() {
        let limit: number = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 5;

        this.communityService.list(null, { limit: limit }).then((result: noosfero.RestResult<noosfero.Community[]>) => {
            this.profiles = result.data;
        });
    }
}
