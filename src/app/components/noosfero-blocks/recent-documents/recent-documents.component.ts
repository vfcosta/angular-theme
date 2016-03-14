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

    documentsLoaded: boolean = false;

    constructor(private articleService: ArticleService, private $state: any) {
    }

    ngOnInit() {
        this.profile = this.owner;
        this.documents = [];

        let limit = (this.block && this.block.settings) ? this.block.settings.limit : null || 5;
        // FIXME get all text articles
        // FIXME make the getByProfile a generic method where we tell the type passing a class TinyMceArticle
        //       and the promise should be of type TinyMceArticle[], per example
        this.articleService.getByProfile(this.profile.id, { content_type: 'TinyMceArticle', per_page: limit }).then((result: noosfero.ArticlesResult) => {
            this.documents = result.articles;
            this.documentsLoaded = true;
        });
    }

    openDocument(article: any) {
        this.$state.go("main.profile.page", { page: article.path, profile: article.profile.identifier });
    }

}
