import {Component, Inject, Input} from "ng-forward";
import {ArticleService} from "../../../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: "noosfero-comment-paragraph-plugin-discussion-block",
    templateUrl: 'plugins/comment_paragraph/block/discussion/discussion-block.html'
})
@Inject(ArticleService, "$state")
export class DiscussionBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    documents: any;

    documentsLoaded: boolean = false;

    constructor(private articleService: ArticleService, private $state: any) { }

    ngOnInit() {
        this.profile = this.owner;
        this.documents = [];

        let limit = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 50;
        let params: any = { content_type: 'CommentParagraphPlugin::Discussion', per_page: limit, order: 'start_date DESC' };
        let now = new Date().toISOString();
        switch (this.block.settings['discussion_status']) {
            case 0:
                params['from_start_date'] = now;
                break;
            case 1:
                params['until_start_date'] = now;
                params['from_end_date'] = now;
                break;
            case 2:
                params['until_end_date'] = now;
                break;
        }
        console.log(this.block.settings['discussion_status']);
        this.articleService.getByProfile(this.profile, params)
            .then((result: noosfero.RestResult<noosfero.Article[]>) => {
                this.documents = <noosfero.Article[]>result.data;
                this.documentsLoaded = true;
            });
    }

    openDocument(article: any) {
        this.$state.go("main.profile.page", { page: article.path, profile: article.profile.identifier });
    }

}
