import { SideCommentsComponent } from './side-comments/side-comments.component';
import {AllowCommentComponent} from "./allow-comment/allow-comment.component";
import {ExportCommentButtonHotspotComponent} from "./hotspot/export-comment-button.component";
import {CommentParagraphFormHotspotComponent} from "./hotspot/comment-paragraph-form.component";
import {DiscussionEditorComponent} from "./article/cms/discussion-editor/discussion-editor.component";
import {CommentParagraphArticleContentHotspotComponent} from "./hotspot/article-content/article-content.component";
import {DiscussionBlockComponent} from "./block/discussion/discussion-block.component";
import {DiscussionPeriodComponent} from "./article/discussion-period/discussion-period.component";

export let mainComponents: any = [DiscussionEditorComponent, DiscussionBlockComponent, DiscussionPeriodComponent];
export let ng2MainComponents: any = [AllowCommentComponent, SideCommentsComponent];
export let hotspots: any = [ExportCommentButtonHotspotComponent, CommentParagraphArticleContentHotspotComponent];
export let ng2Hotspots: any = [CommentParagraphFormHotspotComponent];
