import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'search-form',
    templateUrl: './search-form.html',
    styleUrls: ['./search-form.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SearchFormComponent {

    query: string;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.query = this.route.snapshot.queryParams['query'];
    }

    search() {
        this.router.navigate(['/search'], { queryParams: { query: this.query } });
    }
}
