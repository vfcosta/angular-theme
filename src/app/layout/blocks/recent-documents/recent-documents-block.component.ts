import { Component, Inject, Input, ViewEncapsulation, OnInit } from '@angular/core';
import {BlockService} from '../../../../lib/ng-noosfero-api/http/block.service';
import {ArticleService} from './../../../../lib/ng-noosfero-api/http/article.service';
import {Arrays} from './../../../../lib/util/arrays';

@Component({
    selector: "noosfero-recent-documents-block",
    templateUrl: './recent-documents-block.html',
    styleUrls: ['./recent-documents-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RecentDocumentsBlockComponent implements OnInit {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    profile: any;
    documents: any;

    constructor(private blockService: BlockService,
        private articleService: ArticleService) { }


    ngOnInit() {
        this.profile = this.owner;
        this.documents = [];
        if (this.block.api_content) {
            this.documents = this.block.api_content.articles;
        } else {
            this.blockService.getApiContent(this.block).then((content: any) => {
                this.documents = content.articles;
            });
        }
        this.articleService.subscribeToModelRemoved((article: noosfero.Article) => {
            Arrays.remove(this.documents, article);
        });
    }
}
