import {Component, Inject, Input} from "ng-forward";
import {BlockService} from "../../../../lib/ng-noosfero-api/http/block.service";
import {ArticleService} from "./../../../../lib/ng-noosfero-api/http/article.service"
import {Arrays} from "./../../../../lib/util/arrays"

@Component({
    selector: "noosfero-comment-paragraph-plugin-discussion-block",
    templateUrl: 'plugins/comment_paragraph/block/discussion/discussion-block.html'
})
@Inject(BlockService, "$state", ArticleService)
export class DiscussionBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: noosfero.Profile;
    documents: Array<noosfero.Article>;

    constructor(private blockService: BlockService, private $state: any, public articleService: ArticleService) { }

    ngOnInit() {
        this.profile = this.owner;
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.documents = content.articles;
            this.block.hide = !this.documents || this.documents.length === 0;
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
