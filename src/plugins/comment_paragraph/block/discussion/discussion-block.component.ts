import {Component, Inject, Input} from "ng-forward";
import {BlockService} from "../../../../lib/ng-noosfero-api/http/block.service";

@Component({
    selector: "noosfero-comment-paragraph-plugin-discussion-block",
    templateUrl: 'plugins/comment_paragraph/block/discussion/discussion-block.html'
})
@Inject(BlockService, "$state")
export class DiscussionBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: noosfero.Profile;
    documents: Array<noosfero.Article>;

    constructor(private blockService: BlockService, private $state: any) { }

    ngOnInit() {
        this.profile = this.owner;
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.documents = content.articles;
        });
    }

    openDocument(article: any) {
        this.$state.go("main.profile.page", { page: article.path, profile: article.profile.identifier });
    }

}
