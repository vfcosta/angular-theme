namespace noosfero {
    export interface Comment extends RestModel {
        source_id: number;
        reply_of_id: number;
        reply_of: Comment;
        replies: Comment[];
        body: string;
        permissions: string[];
    }

    export interface CommentViewModel extends Comment {
        __show_reply?: boolean;
    }
}
