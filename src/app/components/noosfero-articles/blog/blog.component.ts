import {Component, Input, Inject} from "ng-forward";


@Component({
    selector: "noosfero-blog",
    templateUrl: "app/components/noosfero-articles/blog/blog.html"
})
@Inject("noosfero", "$scope")
export class NoosferoArticleBlog {

    @Input() article;
    @Input() profile;

    private posts: any[];
    private perPage: number = 3;
    private currentPage: number;
    private totalPosts: number = 0;

    constructor(private noosfero: any, private $scope) {
    }

    ngOnInit() {
        this.loadPage();
    }

    loadPage() {
        this.noosfero.articles.one(this.article.id).customGET("children", {
            content_type: "TinyMceArticle",
            per_page: this.perPage,
            page: this.currentPage
        }).then((response) => {
            this.totalPosts = response.headers("total");
            this.posts = response.data.articles;
        });
    }

}
