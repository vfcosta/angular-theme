import { Input, Component, Inject } from '@angular/core';

@Component({
    selector: 'discussion-period',
    template: require('plugins/comment_paragraph/article/discussion-period/discussion-period.html')
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
        let now = new Date();
        return !!this.article.start_date && new Date(this.article.start_date) > now;
    }

    available() {
        let now = new Date();
        return (!this.article.start_date || new Date(this.article.start_date) <= now) &&
            (!this.article.end_date || new Date(this.article.end_date) >= now);
    }

    closed() {
        let now = new Date();
        return !!this.article.end_date && new Date(this.article.end_date) < now;
    }

}
