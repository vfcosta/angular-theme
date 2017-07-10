import { Input, Inject, Component } from '@angular/core';
import { ArticleService } from '../../../../lib/ng-noosfero-api/http/article.service';

@Component({
    selector: "noosfero-display-content-block",
    templateUrl: './display-content-block.html',
    styleUrls: ['./display-content-block.scss']
})
export class DisplayContentBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;
    @Input() designMode: boolean;

    profile: noosfero.Profile;
    articles: noosfero.Article[];
    sections: noosfero.Section[];

    documentsLoaded: boolean = false;

    constructor(private articleService: ArticleService) { }

    ngOnInit() {
        this.profile = this.owner;
        let limit = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 5;
        this.articleService.getByProfile(this.profile, { per_page: limit })
            .then((result: noosfero.RestResult<noosfero.Article[]>) => {
                this.articles = <noosfero.Article[]>result.data;
                this.sections = this.block.settings.sections || [<noosfero.Section>{ value: 'title' }, <noosfero.Section>{ value: 'publish_date' }, <noosfero.Section>{ value: 'abstract' }];
                this.documentsLoaded = true;
            });
    }

    /**
     * Returns whether a settings section should be displayed.
     *
     */
    private display(section_name: string): boolean {
        let section: noosfero.Section = this.sections.find( section => {
            return section.value === section_name;
        });
        return section !== undefined && section.checked !== undefined;
    }

}
