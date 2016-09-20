import { Input, Component, Inject } from 'ng-forward';
// import { BlockEditionComponent } from './block-edition/block-edition.component';
// import { BlockService } from '../../../lib/ng-noosfero-api/http/block.service';
// import { NotificationService } from '../../shared/services/notification.service';
// import { AuthService, SessionService, AuthEvents } from "../../login";
// import { TranslatorService } from "../../shared/services/translator.service";
// import { DesignModeService } from "../../admin/layout-edit/designMode.service";

@Component({
    selector: 'discussion-period',
    templateUrl: 'plugins/comment_paragraph/article/discussion-period/discussion-period.html'
})
@Inject("$scope")
export class DiscussionPeriodComponent {

    @Input() article: noosfero.Article;

    constructor(private $scope: ng.IScope) { }

    isDiscussion() {
        return this.article.type === "CommentParagraphPlugin::Discussion";
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
