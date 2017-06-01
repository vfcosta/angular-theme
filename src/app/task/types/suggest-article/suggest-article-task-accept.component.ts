import { TaskAcceptTypeComponent } from './../task-accept-type.component';
import { Component, Injector, Inject } from "@angular/core";
import { ArticleService } from "../../../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: "suggest-article-task-accept",
    template: require("app/task/types/suggest-article/suggest-article-accept.html"),
})
export class SuggestArticleTaskAcceptComponent extends TaskAcceptTypeComponent {

    folders: Array<any>;

    constructor(@Inject("articleService") private articleService: ArticleService, injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
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
