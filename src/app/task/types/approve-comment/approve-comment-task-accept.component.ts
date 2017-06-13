import { TaskAcceptTypeComponent } from './../task-accept-type.component';
import { Injector, Component, Input, Inject } from "@angular/core";
import { ArticleService } from "../../../../lib/ng-noosfero-api/http/article.service.ng2";

@Component({
    selector: "approve-comment-task-accept",
    template: require("app/task/types/approve-comment/approve-comment-accept.html"),
})
export class ApproveCommentTaskAcceptComponent extends TaskAcceptTypeComponent {

    comment = <noosfero.Comment>{};
    article = <noosfero.Article>{};

    constructor(private articleService: ArticleService, injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        let attrs = JSON.parse(this.task.data.comment_attributes);
        this.comment.body = attrs.body;
        this.comment.created_at = attrs.created_at;
        this.comment.author = this.task.requestor;
        this.articleService.get(attrs.source_id).then((result: noosfero.RestResult<noosfero.Article>) => {
            this.article = result.data;
        });
    }
}
