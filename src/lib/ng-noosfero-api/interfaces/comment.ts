namespace noosfero {
    export interface Comment extends RestModel {
        reply_of_id: number;
        reply_of: Comment;
        replies: Comment[];
        body: string;
    }
}
