import {Component, Input} from "ng-forward";


@Component({
    selector: "noosfero-blog",
    templateUrl: "app/components/noosfero-articles/blog/blog.html",
    inputs: ["article", "profile"]
})
export class NoosferoArticleBlog {
    @Input() article;
    @Input() profile;

    private posts: any[];
    private perPage: number;
    private currentPage: number;
    private totalPosts: number = 0;
    constructor(private noosferoService: any) {
        this.loadPage();
    }

    loadPage() {
        this.noosferoService.articles.one(this.article.id).customGET("children", {
            content_type: "TinyMceArticle",
            per_page: this.perPage,
            page: this.currentPage
        }).then((response) => {
            this.totalPosts = response.headers("total");
            this.posts = response.data.articles;
        });
    }

}