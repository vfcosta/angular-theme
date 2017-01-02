import { Input, Inject, Component } from "ng-forward";
import { ArticleService } from "../../../../lib/ng-noosfero-api/http/article.service";

@Component({
    selector: "noosfero-display-content-block",
    templateUrl: 'app/layout/blocks/display-content/display-content-block.html',
})
@Inject(ArticleService, "$state")
export class DisplayContentBlockComponent {

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile;

    profile: noosfero.Profile;
    articles: noosfero.Article[];
    sections: noosfero.Section[];

    documentsLoaded: boolean = false;

    constructor(private articleService: ArticleService, private $state: ng.ui.IStateService) { }

    ngOnInit() {
        this.profile = this.owner;
        let limit = ((this.block && this.block.settings) ? this.block.settings.limit : null) || 5;
        this.articleService.getByProfile(this.profile, { content_type: 'TinyMceArticle', per_page: limit })
            .then((result: noosfero.RestResult<noosfero.Article[]>) => {
                this.articles = <noosfero.Article[]>result.data;
                this.sections = this.block.settings.sections;
                this.documentsLoaded = true;
            });
    }

    /**
     * Returns whether a settings section should be displayed.
     *
     */
    private display(section_name: string): boolean {
        let section: noosfero.Section = this.sections.find(function(section: noosfero.Section) {
            return section.value === section_name;
        });
        return section !== undefined && section.checked !== undefined;
    }

}
