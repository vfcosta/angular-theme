import { Input, Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'discussion-period',
    templateUrl: './discussion-period.html',
    styleUrls: ['./discussion-period.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DiscussionPeriodComponent {

    @Input() article: noosfero.Article;

    isDiscussion() {
        if ((this.article !== undefined) && (this.article.type === "CommentParagraphPlugin::Discussion")) {
            return true;
        } else {
            return false;
        }
    }

    notOpened() {
        const now = new Date();
        return !!this.article.start_date && new Date(this.article.start_date) > now;
    }

    available() {
        const now = new Date();
        return (!this.article.start_date || new Date(this.article.start_date) <= now) &&
            (!this.article.end_date || new Date(this.article.end_date) >= now);
    }

    closed() {
        const now = new Date();
        return !!this.article.end_date && new Date(this.article.end_date) < now;
    }

}
