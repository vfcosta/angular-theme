export class NoosferoKnownEvents {
    IMAGE_PROFILE_UPDATED: string = 'IMAGE_PROFILE_UPDATED';
    PROFILE_INFO_UPDATED: string = 'PROFILE_INFO_UPDATED';
    ARTICLE_UPDATED: string = 'ARTICLE_UPDATED';
    TASK_CLOSED: string = 'TASK_CLOSED';
    BLOCK_CHANGED: string = 'BLOCK_CHANGED';
    BLOCKS_SAVED: string = 'BLOCKS_SAVED';
    PROFILE_MEMBERSHIP_CHANGED: string = 'PROFILE_MEMBERSHIP_CHANGED';
    PROFILE_FRIENDSHIP_CHANGED: string = 'PROFILE_FRIENDSHIP_CHANGED';
    ARTICLE_SAVE_ERROR: string = 'ARTICLE_SAVE_ERROR';

    constructor() {
    }

    getNames() {
        return Object.getOwnPropertyNames(this);
    }
}
