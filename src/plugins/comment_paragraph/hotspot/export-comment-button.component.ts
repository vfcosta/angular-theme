import { ArticleToolbarHotspotComponent } from './../../../app/hotspot/article-toolbar-hotspot.component';
import { Input, Inject, Injector, Component, ViewEncapsulation } from '@angular/core';
import { Hotspot } from '../../../app/hotspot/hotspot.decorator';

@Component({
    selector: "export-comment-button-hotspot",
    templateUrl: './export-comment-button.html',
    styleUrls: ['./export-comment-button.scss'],
    encapsulation: ViewEncapsulation.None,
})
@Hotspot("article_extra_toolbar_buttons")
export class ExportCommentButtonHotspotComponent {

    article: noosfero.Article;
    exportCommentPath: any;

    parent: ArticleToolbarHotspotComponent;

    constructor(injector: Injector) {
        this.parent = injector.get(ArticleToolbarHotspotComponent);
        this.article = this.parent.article;
    }

    isActivated() {
        this.exportCommentPath = ["/api/v1/articles/", this.article.id, "/comment_paragraph_plugin/export"].join("");
        return this.article && this.article.setting && this.article.setting.comment_paragraph_plugin_activate;
    }

}
