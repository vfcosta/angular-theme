import { EventsHubKnownEventNames } from './shared/services/events-hub.service';

export class NoosferoKnownEvents implements EventsHubKnownEventNames {
    IMAGE_PROFILE_UPDATED: string = 'IMAGE_PROFILE_UPDATED';
    PROFILE_INFO_UPDATED: string = 'PROFILE_INFO_UPDATED';
    ARTICLE_UPDATED: string = 'ARTICLE_UPDATED';
    TASK_CLOSED: string = 'TASK_CLOSED';
    OPEN_SEARCH_FORM: string = 'OPEN_SEARCH_FORM';
    BLOCK_CHANGED: string = 'BLOCK_CHANGED';
    BLOCKS_SAVED: string = 'BLOCKS_SAVED';

    constructor() {
    }

    getNames() {
        return Object.getOwnPropertyNames(this);
    }
}
