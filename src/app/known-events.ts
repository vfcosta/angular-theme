import { EventsHubKnownEventNames } from './shared/services/events-hub.service';

export class NoosferoKnownEvents implements EventsHubKnownEventNames  {
    IMAGE_PROFILE_UPDATED: string = 'IMAGE_PROFILE_UPDATED';
    PROFILE_INFO_UPDATED: string = 'IMAGE_PROFILE_UPDATED';
    ARTICLE_UPDATED: string = 'ARTICLE_UPDATED';

    constructor() {
    }

    getNames() {
        return Object.getOwnPropertyNames(this);
    }
}