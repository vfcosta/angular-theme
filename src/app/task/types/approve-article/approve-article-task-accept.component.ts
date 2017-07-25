import { TaskAcceptTypeComponent } from './../task-accept-type.component';
import { Component, Injector, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { ArticleService } from '../../../../lib/ng-noosfero-api/http/article.service';

@Component({
    selector: "approve-article-task-accept",
    templateUrl: './approve-article-accept.html',
    styleUrls: ['./approve-article-accept.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApproveArticleTaskAcceptComponent extends TaskAcceptTypeComponent implements OnInit {

    folders: Array<any>;

    constructor(private articleService: ArticleService, injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        const targetProfile = <noosfero.Profile>this.task.target;
        const root = targetProfile.identifier;
        this.confirmationTask.data = { create_link: true, article_id: this.task.data.article_id, name: this.task.data.name };

        this.folders = [{ id: null, path: root }];
        this.articleService.getByProfile(targetProfile, { content_type: "Folder,Blog" }).then((result: noosfero.RestResult<noosfero.Article[]>) => {
            result.data.forEach((article: noosfero.Article) => {
                this.folders.push({ id: article.id, path: `${root}/${article.title}` });
            });
        });
    }
}
