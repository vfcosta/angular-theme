import { Component, Inject, Input } from "ng-forward";
import { EnvironmentService } from "../../../../lib/ng-noosfero-api/http/environment.service";

@Component({
    selector: "noosfero-tags-cloud-block",
    templateUrl: 'app/layout/blocks/tags/tags-block.html'
})
@Inject(EnvironmentService, "$state")
export class TagsBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Environment;

    tags: any[];

    constructor(private environmentService: EnvironmentService, private $state: any) {
        this.loadTags();
    }

    loadTags() {
        this.environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            return this.environmentService.getTags(environment.id);
        }).then((result: noosfero.RestResult<noosfero.Tag[]>) => {
            this.tags = result.data.map((tag: noosfero.Tag) => {
                return { text: tag.name, weight: tag.count, link: `/tag/${tag.name}` };
            });
        });
    }
}
