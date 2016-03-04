import {Component, Inject, Input} from "ng-forward";
import {ArticleService} from "../../../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: "noosfero-recent-documents-block",
    templateUrl: 'app/components/noosfero-blocks/recent-documents/recent-documents.html'
})
@Inject(ArticleService, "$state")
export class RecentDocumentsBlock {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    documents: any;

    constructor(private ArticleService: ArticleService, private $state: any) {
    }

    ngOnInit() {
        this.profile = this.owner;
        this.documents = [];

        var limit = (this.block && this.block.settings) ? this.block.settings.limit : null || 5;
        //FIXME get all text articles
        this.ArticleService.getByProfile(this.profile.id, { content_type: 'TinyMceArticle', per_page: limit }).then((response: any) => {
            this.documents = response.data.articles;
        });
    }

    openDocument(article: any) {
        this.$state.go("main.profile.page", { page: article.path, profile: article.profile.identifier });
    }

}
