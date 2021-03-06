import { Router, ActivatedRoute } from '@angular/router';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {ArticleService} from './../../lib/ng-noosfero-api/http/article.service';

@Component({
    selector: 'search',
    templateUrl: './search.html',
    styleUrls: ['./search.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SearchComponent {

    articles: noosfero.Article[] = [];
    query: string;
    tag: string;
    totalResults = 0;
    perPage = 10;
    currentPage = 0;

    constructor(protected articleService: ArticleService, private router: Router, private route: ActivatedRoute) {
        this.query = route.snapshot.queryParams['query'];
        this.tag = route.snapshot.queryParams['tag'];
        this.perPage = route.snapshot.queryParams['per_page'] || this.perPage;
        this.loadPage();
    }

    search() {
        this.router.navigate(['search'], { queryParams: { query: this.query } });
    }

    loadPage() {
        const filters = {
            query: this.query,
            per_page: this.perPage,
            page: this.currentPage,
            tag: this.tag
        };
        this.articleService.search(filters).then((result: noosfero.RestResult<noosfero.Article[]>) => {
            this.totalResults = <number>(<any>result.headers).get("total");
            this.articles = result.data;
        });
    }
}
