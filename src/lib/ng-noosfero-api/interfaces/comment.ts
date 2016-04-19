namespace noosfero {
    export interface Comment extends RestModel {
        reply_of_id: number;
        reply_of: Comment;
        replies: Comment[];
        body: string;
    }

    export interface CommentViewModel extends Comment {
        __show_reply?: boolean;
    }
}
