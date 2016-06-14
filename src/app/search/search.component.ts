import {Component, Inject} from "ng-forward";
import {ArticleService} from "./../../lib/ng-noosfero-api/http/article.service";

import {SearchFormComponent} from "./search-form/search-form.component";

@Component({
    selector: 'search',
    templateUrl: 'app/search/search.html',
    directives: [SearchFormComponent]
})
@Inject(ArticleService, "$stateParams", "$state")
export class SearchComponent {

    articles: noosfero.Article[];
    query: string;
    totalResults = 0;
    perPage = 10;
    currentPage: number = 0;

    constructor(private articleService: ArticleService, private $stateParams: ng.ui.IStateParamsService, private $state: ng.ui.IStateService) {
        this.query = this.$stateParams['query'];
        this.loadPage();
    }

    search() {
         this.$state.go('main.environment.search', { query: this.query });
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
