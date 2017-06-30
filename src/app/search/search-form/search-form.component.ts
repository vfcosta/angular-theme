import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject } from "@angular/core";

@Component({
    selector: 'search-form',
    template: require('app/search/search-form/search-form.html'),
})
export class SearchFormComponent {

    query: string;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.query = this.route.snapshot.queryParams['query'];
    }

    search() {
        this.router.navigate(['search'], { queryParams: { query: this.query } });
    }
}
