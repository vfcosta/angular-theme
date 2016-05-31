import {Component, Inject} from "ng-forward";
import {ArticleService} from "./../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: 'search',
    templateUrl: 'app/search/search.html'
})
@Inject(ArticleService, "$stateParams")
export class SearchComponent {

    articles: noosfero.Article[];
    query: string;
    totalResults = 0;
    perPage = 10;
    currentPage: number = 0;

    constructor(private articleService: ArticleService, private $stateParams: ng.ui.IStateParamsService) {
        this.query = this.$stateParams['query'];
        this.loadPage();
    }

    loadPage() {
        let filters = {
            query: this.query,
            per_page: this.perPage,
            page: this.currentPage
        };
        this.articleService.search(filters).then((result: noosfero.RestResult<noosfero.Article[]>) => {
            this.totalResults = <number>result.headers("total");
            this.articles = result.data;
        });
    }
}
