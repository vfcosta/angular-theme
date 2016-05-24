import {Component, Inject, Input} from "ng-forward";
import {BlockService} from "../../../../lib/ng-noosfero-api/http/block.service";
import {ArticleService} from "./../../../../lib/ng-noosfero-api/http/article.service"
import {Arrays} from "./../../../../lib/util/arrays"

@Component({
    selector: "noosfero-recent-documents-block",
    templateUrl: 'app/layout/blocks/recent-documents/recent-documents-block.html'
})
@Inject(BlockService, "$state", ArticleService)
export class RecentDocumentsBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    documents: any;
    documentsLoaded: boolean = false;

    constructor(private blockService: BlockService, private $state: any, public articleService: ArticleService) { }

    ngOnInit() {
        this.profile = this.owner;
        this.documents = [];
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.documents = content.articles;
            this.documentsLoaded = true;
        });
        this.watchArticles();
    }
    
    watchArticles() {
        this.articleService.subscribeToArticleRemoved((article: noosfero.Article) => {
            Arrays.remove(this.documents, article);
        });
    }    

    openDocument(article: any) {
        this.$state.go("main.profile.page", { page: article.path, profile: article.profile.identifier });
    }

}
