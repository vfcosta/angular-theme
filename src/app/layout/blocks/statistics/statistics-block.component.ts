import { Input, Inject, Component } from '@angular/core';
import {ArticleService} from './../../../../lib/ng-noosfero-api/http/article.service';
import {BlockService} from './../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: "noosfero-statistics-block",
    templateUrl: './statistics-block.html',
    styleUrls: ['./statistics.scss']
})
export class StatisticsBlockComponent {
    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    constructor(articleService: ArticleService, blockService: BlockService) {
        // watches for article being removed
        // to update comments and tag statistics, which would
        // changed after removing an article
        articleService.subscribeToModelRemoved(() => {
            blockService.getBlock<noosfero.StatisticsBlock>(this.block.id)
                .then(blockFromAPI => this.block = blockFromAPI);
        });

        articleService.subscribeToModelAdded(() => {
            blockService.getBlock<noosfero.StatisticsBlock>(this.block.id)
                .then(blockFromAPI => this.block = blockFromAPI);
        });
    }
}
