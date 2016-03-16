import {Component, Input, Inject} from "ng-forward";

import {Article, Profile} from "./../../../models/interfaces";
import {ArticleService} from "../../../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: "noosfero-blog",
    templateUrl: "app/components/noosfero-articles/blog/blog.html"
})
@Inject(ArticleService)
export class ArticleBlog {

    @Input() article: noosfero.Article;
    @Input() profile: Profile;

    private posts: noosfero.Article[];
    private perPage: number = 3;
    private currentPage: number;
    private totalPosts: number = 0;

    constructor(private articleService: ArticleService) { }

    ngOnInit() {
        this.loadPage();
    }

    loadPage() {
        let filters = {
            content_type: "TinyMceArticle",
            per_page: this.perPage,
            page: this.currentPage
        };

        this.articleService
            .getChildren(this.article, filters)
            .then((result: noosfero.RestResult<noosfero.Article[]>) => {
                this.totalPosts = <number>result.headers("total");
                this.posts = result.data;
            });
    }

}
