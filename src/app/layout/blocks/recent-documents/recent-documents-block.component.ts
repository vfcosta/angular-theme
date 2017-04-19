import { Component, Inject, Input } from '@angular/core';
import {BlockService} from "../../../../lib/ng-noosfero-api/http/block.service";
import {ArticleService} from "./../../../../lib/ng-noosfero-api/http/article.service";
import {Arrays} from "./../../../../lib/util/arrays";

@Component({
    selector: "noosfero-recent-documents-block",
    template: require('app/layout/blocks/recent-documents/recent-documents-block.html')
})
export class RecentDocumentsBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: any;
    documents: any;

    constructor( @Inject('blockService') private blockService: BlockService,
        @Inject("$state") private $state: ng.ui.IStateService,
        @Inject('articleService') private articleService: ArticleService) { }


    ngOnInit() {
        this.profile = this.owner;
        this.documents = [];
        this.blockService.getApiContent(this.block).then((content: any) => {
            this.documents = content.articles;
        });
        this.articleService.subscribeToModelRemoved((article: noosfero.Article) => {
            Arrays.remove(this.documents, article);
        });
    }

    openDocument(article: any) {
        this.$state.go("main.profile.page", { page: article.path, profile: article.profile.identifier });
    }

}
