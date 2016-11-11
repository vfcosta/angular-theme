namespace noosfero {
    export interface Comment extends RestModel, ModelWithPermissions {
        source_id: number;
        reply_of_id: number;
        reply_of: Comment;
        replies: Comment[];
        body: string;
        author: Person;
        created_at: Date;
    }

    export interface CommentViewModel extends Comment {
        __show_reply?: boolean;
    }
}
