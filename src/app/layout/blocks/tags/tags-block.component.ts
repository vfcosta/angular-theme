import {Component, Inject, Input} from "ng-forward";
import {EnvironmentService} from "../../../../lib/ng-noosfero-api/http/environment.service";

@Component({
    selector: "noosfero-tags-block",
    templateUrl: 'app/layout/blocks/tags/tags-block.html'
})
@Inject(EnvironmentService, "$state")
export class TagsBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    tags: any;
    tagsLoaded: boolean = false;

    constructor(private environmentService: EnvironmentService, private $state: any) {
        this.loadTags();
    }

    loadTags() {
        this.tags = [];
        let tag = '';
        let tags: any = [];
        let that = this;

        this.environmentService.getTags()
        .then((result: any) => {
            for (tag in result) {
                if (result.hasOwnProperty(tag)) {
                    let size: number = result[tag];
                    tags.push({ text: tag.toString(), weight: size.toString(), link: '/tag/' + tag });
                }
            }

            that.tagsLoaded = true;
            that.tags = tags.slice();
        });
    }

    ngOnInit() {
        this.profile = this.owner;
    }
}
