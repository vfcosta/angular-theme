import {Inject, Component, Input} from "@angular/core";
import { CloudData } from 'angular-tag-cloud-module';
import { EnvironmentService } from "../../../../lib/ng-noosfero-api/http/environment.service";

@Component({
    selector: "noosfero-tags-cloud-block",
    template: require('app/layout/blocks/tags/tags-block.html')
})
export class TagsBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Environment;

    tags: Array<CloudData> = [];

    constructor(
      @Inject("environmentService") private environmentService: EnvironmentService,
      @Inject("$state") private $state: ng.ui.IStateService) {
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
