import {Component, Inject, Input} from "ng-forward";
import {BlockService} from "../../../../lib/ng-noosfero-api/http/block.service";

@Component({
    selector: "noosfero-recent-documents-block",
    templateUrl: 'app/layout/blocks/recent-documents/recent-documents-block.html'
})
@Inject(BlockService, "$state")
export class RecentDocumentsBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    documents: any;
    documentsLoaded: boolean = false;

    constructor(private blockService: BlockService, private $state: any) { }

    ngOnInit() {
        this.profile = this.owner;
        this.documents = [];
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.documents = content.articles;
            this.documentsLoaded = true;
        });
    }

    openDocument(article: any) {
        this.$state.go("main.profile.page", { page: article.path, profile: article.profile.identifier });
    }

}
