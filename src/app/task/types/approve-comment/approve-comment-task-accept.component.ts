import { Component, Input, Inject } from "ng-forward";
import { ArticleService } from "../../../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: "approve-comment-task-accept",
    templateUrl: "app/task/types/approve-comment/approve-comment-accept.html",
})
@Inject(ArticleService)
export class ApproveCommentTaskAcceptComponent {

    @Input() task: noosfero.ApproveCommentTask;
    @Input() confirmationTask: noosfero.ApproveCommentTask;

    comment = <noosfero.Comment>{};
    article = <noosfero.Article>{};

    constructor(private articleService: ArticleService) { }

    ngOnInit() {
        let attrs = JSON.parse(this.task.data.comment_attributes);
        this.comment.body = attrs.body;
        this.comment.created_at = attrs.created_at;
        this.comment.author = this.task.requestor;
        this.articleService.get(attrs.source_id).then((result: noosfero.RestResult<noosfero.Article>) => {
            this.article = result.data;
        });
    }
}
