import { Component, Input, Inject } from "ng-forward";
import { ArticleService } from "../../../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: "approve-article-task-accept",
    templateUrl: "app/task/types/approve-article/approve-article-accept.html",
})
@Inject(ArticleService)
export class ApproveArticleTaskAcceptComponent {

    @Input() task: noosfero.ApproveArticleTask;
    @Input() confirmationTask: noosfero.ApproveArticleTask;

    folders: Array<any>;

    constructor(private articleService: ArticleService) { }

    ngOnInit() {
        let targetProfile = <noosfero.Profile>this.task.target;
        let root = targetProfile.identifier;
        this.confirmationTask.data = { create_link: true, article_id: this.task.data.article_id, name: this.task.data.name };

        this.folders = [{ id: null, path: root }];
        this.articleService.getByProfile(targetProfile, { content_type: "Folder,Blog" }).then((result: noosfero.RestResult<noosfero.Article[]>) => {
            result.data.forEach((article: noosfero.Article) => {
                this.folders.push({ id: article.id, path: `${root}/${article.title}` });
            });
        });
    }
}
