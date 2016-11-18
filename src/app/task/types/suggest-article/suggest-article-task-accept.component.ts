import { Component, Input, Inject } from "ng-forward";
import { ArticleService } from "../../../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: "suggest-article-task-accept",
    templateUrl: "app/task/types/suggest-article/suggest-article-accept.html",
})

@Inject(ArticleService)
export class SuggestArticleTaskAcceptComponent {

    @Input() task: noosfero.Task;
    @Input() confirmationTask: noosfero.Task;

    folders: Array<any>;

    constructor(private articleService: ArticleService) { }

    ngOnInit() {
        let targetProfile = <noosfero.Profile>this.task.target;
        let root = targetProfile.identifier;
        this.confirmationTask.data = this.task.data;
        this.folders = [{ id: null, path: root }];

        this.articleService.getByProfile(targetProfile, { content_type: "Folder,Blog" }).then((result: noosfero.RestResult<noosfero.Article[]>) => {
            result.data.forEach((article: noosfero.Article) => {
                this.folders.push({ id: article.id, path: `${root}/${article.title}` });
            });
        });
    }
}
