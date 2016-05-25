import {Input, Inject, Component, provide} from "ng-forward";
import {ArticleService} from "./../../../../lib/ng-noosfero-api/http/article.service";
import {BlockService} from "./../../../../lib/ng-noosfero-api/http/block.service";
@Component({
    selector: "noosfero-statistics-block",
    templateUrl: 'app/layout/blocks/statistics/statistics-block.html'
})

@Inject(ArticleService, BlockService)
export class StatisticsBlockComponent {
    @Input() block: noosfero.StatisticsBlock;
    @Input() owner: any;

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
