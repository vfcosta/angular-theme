import { TaskAcceptTypeComponent } from './../task-accept-type.component';
import { Injector, Component, Input, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { ArticleService } from '../../../../lib/ng-noosfero-api/http/article.service';

@Component({
    selector: "approve-comment-task-accept",
    templateUrl: './approve-comment-accept.html',
    styleUrls: ['./approve-comment-accept.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApproveCommentTaskAcceptComponent extends TaskAcceptTypeComponent implements OnInit {

    comment = <noosfero.Comment>{};
    article = <noosfero.Article>{};

    constructor(private articleService: ArticleService, injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        const attrs = JSON.parse(this.task.data.comment_attributes);
        this.comment.body = attrs.body;
        this.comment.created_at = attrs.created_at;
        this.comment.author = this.task.requestor;
        this.articleService.get(attrs.source_id).then((result: noosfero.RestResult<noosfero.Article>) => {
            this.article = result.data;
        });
    }
}
