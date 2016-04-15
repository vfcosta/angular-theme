import { Inject, Input, Component } from 'ng-forward';
import { PostCommentComponent } from "./post-comment/post-comment.component";
import { PostCommentEventService } from "./post-comment/post-comment-event.service";

@Component({
    selector: 'noosfero-comment',
    templateUrl: 'app/article/comment/comment.html'
})
@Inject(PostCommentEventService, "$scope")
export class CommentComponent {

    @Input() comment: noosfero.Comment;
    @Input() article: noosfero.Article;

    showReply: boolean = false;

    constructor(postCommentEventService: PostCommentEventService, private $scope: ng.IScope) {
        postCommentEventService.subscribe((comment: noosfero.Comment) => {
            this.showReply = false;
            this.$scope.$apply();
        });
    }

    reply() {
        this.showReply = !this.showReply;
    }
}
