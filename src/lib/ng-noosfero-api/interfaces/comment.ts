namespace noosfero {
    export interface Comment extends RestModel {
        reply_of_id: number;
    }
}
