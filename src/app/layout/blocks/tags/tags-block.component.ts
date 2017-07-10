import {Inject, Component, Input} from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';
import { EnvironmentService } from '../../../../lib/ng-noosfero-api/http/environment.service';

@Component({
    selector: "noosfero-tags-cloud-block",
    templateUrl: './tags-block.html',
    styleUrls: ['./tags-block.scss']
})
export class TagsBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Environment;
    @Input() designMode: boolean;

    tags: Array<CloudData> = [];

    constructor(
      private environmentService: EnvironmentService) {
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
