import { Component, Inject } from "@angular/core";
import {ArticleService} from "./../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: 'search',
    template: require('app/search/search.html'),
})
export class SearchComponent {

    articles: noosfero.Article[] = [];
    query: string;
    totalResults = 0;
    perPage = 10;
    currentPage: number = 0;

    constructor(
        protected articleService: ArticleService,
        @Inject("$stateParams") private $stateParams: ng.ui.IStateParamsService,
        @Inject("$state") private $state: ng.ui.IStateService) {
        this.query = this.$stateParams['query'];
        this.perPage = this.$stateParams['per_page'] || this.perPage;
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
            this.totalResults = <number>(<any>result.headers).get("total");
            this.articles = result.data;
        });
    }
}
