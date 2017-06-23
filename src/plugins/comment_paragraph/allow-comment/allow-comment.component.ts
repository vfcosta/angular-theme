import { ArticleService } from './../../../lib/ng-noosfero-api/http/article.service';
import {Component, HostListener, Input, Inject, ViewChild, ElementRef} from "@angular/core";
import {SideCommentsComponent} from "../side-comments/side-comments.component";
import {CommentParagraphEventService} from "../events/comment-paragraph-event.service";
import {CommentParagraphService} from "../http/comment-paragraph.service";
import {CommentService} from "./../../../lib/ng-noosfero-api/http/comment.service";
import {PermissionService} from "../../../app/shared/services/permission.service";

@Component({
    selector: '[data-macro="comment_paragraph_plugin\/allow_comment"]',
    template: require("plugins/comment_paragraph/allow-comment/allow-comment.html"),
})
export class AllowCommentComponent {

    @Input() content: string;
    @Input() paragraphUuid: string;
    @Input() article: noosfero.Article;
    commentsCount: number = 0;
    display = false;
    @ViewChild("popover") popover: any;

    constructor(private commentParagraphEventService: CommentParagraphEventService,
        private commentParagraphService: CommentParagraphService,
        private commentService: CommentService,
        private permissionService: PermissionService,
        private articleService: ArticleService,
        private elementRef: ElementRef
    ) { }

    dynamicOnMount(attr: Map<string, string>, content: string) {
        this.paragraphUuid = attr.get('data-macro-paragraph_uuid');
        this.content = content;
    }

    ngOnInit() {
        this.commentParagraphEventService.subscribeToggleCommentParagraph((article: noosfero.Article) => {
            this.article = article;
        });
        this.articleService.getCurrent().then((article: noosfero.Article) => {
            this.article = article;
        }).then(() => {
            this.commentParagraphService.commentParagraphCount(this.article, this.paragraphUuid).then((count: number) => {
                this.commentsCount = count ? count : 0;
            });
        });

        this.commentService.subscribeToModelAdded((comment: noosfero.CommentParagraph) => {
            if (comment.paragraph_uuid === this.paragraphUuid) {
                this.commentsCount += 1;
            };
        });

        this.commentService.subscribeToModelRemoved((comment: noosfero.CommentParagraph) => {
            if (comment.paragraph_uuid === this.paragraphUuid) {
                this.commentsCount -= (comment.replies) ? 1 + comment.replies.length : 1;
            };
        });
    }

    isAllowedShow() {
        return this.article && this.article.setting &&
            this.article.setting.comment_paragraph_plugin_activate &&
            this.permissionService.isAllowed(this.article, 'allow_edit');
    }

    isActivated() {
        return this.article && this.article.setting &&
            this.article.setting.comment_paragraph_plugin_activate &&
            (this.article.accept_comments || this.commentsCount > 0);
    }

    showParagraphComments() {
        this.popover.show();
        this.display = true;
    }

    hideParagraphComments() {
        this.popover.hide();
        this.display = false;
    }

    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (this.popover && !this.elementRef.nativeElement.contains($event.target)) {
            this.hideParagraphComments();
        }
    }
}
