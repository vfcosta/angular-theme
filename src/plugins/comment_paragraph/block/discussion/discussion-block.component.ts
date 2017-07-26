import { Component, Inject, Input, ViewEncapsulation, OnInit } from '@angular/core';
import {BlockService} from '../../../../lib/ng-noosfero-api/http/block.service';
import {ArticleService} from './../../../../lib/ng-noosfero-api/http/article.service';
import {Arrays} from './../../../../lib/util/arrays';
import {DiscussionPresentationMode} from './discussion-presentation-mode';

@Component({
    selector: "noosfero-comment-paragraph-plugin-discussion-block",
    templateUrl: './discussion-block.html',
    styleUrls: ['./discussion-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DiscussionBlockComponent implements OnInit {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    profile: noosfero.Profile;
    documents: Array<noosfero.Article>;
    presentation_mode: DiscussionPresentationMode;

    constructor(private blockService: BlockService, public articleService: ArticleService) { }

    ngOnInit() {
        this.profile = this.owner;
        if (this.block.api_content) {
            this.documents =  this.block.api_content['articles'];
        } else {
            this.blockService.getApiContent(this.block).then((content: any) => {
                this.documents = content.articles;
                this.block.hide = !this.documents || this.documents.length === 0;
            });
        }
        this.presentation_mode = DiscussionPresentationMode.TITLE_ONLY;
        if (this.block && this.block.settings && this.block.settings.presentation_mode) {
            this.presentation_mode = this.block.settings.presentation_mode;
        }
        this.watchArticles();
    }

    watchArticles() {
        this.articleService.subscribeToModelRemoved((article: noosfero.Article) => {
            Arrays.remove(this.documents, article);
        });
    }

    presentAbstract() {
        return this.presentation_mode === DiscussionPresentationMode.TITLE_AND_ABSTRACT;
    }

    presentFullContent() {
        return this.presentation_mode === DiscussionPresentationMode.FULL_CONTENT;
    }

}
