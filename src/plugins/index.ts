import * as commentParagraph from "./comment_paragraph";
import * as breadcrumbs from "./breadcrumbs";
import * as section from "./section";
import * as video from "./video";
import * as friends from "./friends";

export let mainComponents: any = [];
mainComponents = mainComponents
    .concat(commentParagraph.mainComponents)
    .concat(breadcrumbs.mainComponents)
    .concat(section.mainComponents)
    .concat(video.mainComponents)
    .concat(friends.mainComponents);

export let hotspots: any = [];
hotspots = hotspots
    .concat(commentParagraph.hotspots)
    .concat(breadcrumbs.hotspots)
    .concat(section.hotspots)
    .concat(video.hotspots)
    .concat(friends.hotspots);
