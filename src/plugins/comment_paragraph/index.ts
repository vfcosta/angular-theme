import {AllowCommentComponent} from "./allow-comment/allow-comment.component";
import {CommentParagraphArticleButtonHotspotComponent} from "./hotspot/comment-paragraph-article-button.component";
import {CommentParagraphFormHotspotComponent} from "./hotspot/comment-paragraph-form.component";
import {DiscussionEditorComponent} from "./article/cms/discussion-editor/discussion-editor.component";
import {CommentParagraphArticleContentHotspotComponent} from "./hotspot/article-content/article-content.component";
import {DiscussionBlockComponent} from "./block/discussion/discussion-block.component";

export let mainComponents: any = [AllowCommentComponent, DiscussionEditorComponent, DiscussionBlockComponent];
export let hotspots: any = [CommentParagraphArticleButtonHotspotComponent, CommentParagraphFormHotspotComponent, CommentParagraphArticleContentHotspotComponent];
