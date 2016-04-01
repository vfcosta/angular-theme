import { Inject, Input, Component } from 'ng-forward';
import { PostCommentComponent } from "./post-comment/post-comment.component";

@Component({
    selector: 'noosfero-comment',
    templateUrl: 'app/article/comment/comment.html'
})
@Inject("$scope")
export class CommentComponent {

    @Input() comment: noosfero.Comment;
    @Input() article: noosfero.Article;

    showReply: boolean = false;

    constructor(private $scope: ng.IScope) {
        $scope.$on(PostCommentComponent.EVENT_COMMENT_RECEIVED, (event: ng.IAngularEvent, comment: noosfero.Comment) => {
            this.showReply = false;
        });
    }

    reply() {
        this.showReply = true;
    }
}
