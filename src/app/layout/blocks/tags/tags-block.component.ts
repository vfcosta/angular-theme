import {Component, Inject, Input} from "ng-forward";
import {EnvironmentService} from "../../../../lib/ng-noosfero-api/http/environment.service";

@Component({
    selector: "noosfero-tags-block",
    templateUrl: 'app/layout/blocks/tags/tags-block.html'
})
@Inject(EnvironmentService, "$state")
export class TagsBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Environment;

    tags: noosfero.Tag[];

    constructor(private environmentService: EnvironmentService, private $state: any) {
        this.loadTags();
    }

    loadTags() {
        this.tags = [];
        this.environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            return this.environmentService.getTags(environment.id);
        }).then((result: noosfero.RestResult<any>) => {
            for (let tag of result.data) {
                this.tags.push({ text: tag.name, weight: tag.count });
            };
        });
    }
}
