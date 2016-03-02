import {Component, Input, Inject} from "ng-forward";

import {Article, Profile} from "./../../../models/interfaces";

@Component({
    selector: "noosfero-blog",
    templateUrl: "app/components/noosfero-articles/blog/blog.html"
})
@Inject("noosfero", "$scope")
export class NoosferoArticleBlog {

    @Input() article: Article;
    @Input() profile: Profile;

    private posts: any[];
    private perPage: number = 3;
    private currentPage: number;
    private totalPosts: number = 0;

    constructor(private noosfero: any, private $scope: ng.IScope) {
    }

    ngOnInit() {
        this.loadPage();
    }

    loadPage() {
        this.noosfero.articles.one(this.article.id).customGET("children", {
            content_type: "TinyMceArticle",
            per_page: this.perPage,
            page: this.currentPage
        }).then((response: restangular.IResponse) => {
            this.totalPosts = <number>(<any>response.headers("total"));
            this.posts = response.data.articles;
        });
    }

}
