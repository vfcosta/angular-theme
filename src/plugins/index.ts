import * as commentParagraph from "./comment_paragraph";
import * as breadcrumbs from "./breadcrumbs";
import * as section from "./section";
import * as video from "./video";
import * as friends from "./friends";
import * as profileImages from "./profile_images";
import * as recentActivities from "./recent_activities";

export let mainComponents: any = [];
mainComponents = mainComponents
    .concat(commentParagraph.mainComponents)
    .concat(breadcrumbs.mainComponents)
    .concat(section.mainComponents)
    .concat(video.mainComponents)
    .concat(friends.mainComponents)
    .concat(profileImages.mainComponents)
    .concat(recentActivities.mainComponents);

export let ng2MainComponents: any = [];
ng2MainComponents = ng2MainComponents
    .concat(commentParagraph.ng2MainComponents)
    .concat(breadcrumbs.ng2MainComponents)
    .concat(section.ng2MainComponents)
    .concat(video.ng2MainComponents)
    .concat(friends.ng2MainComponents)
    .concat(profileImages.ng2MainComponents)
    .concat(recentActivities.ng2MainComponents);

export let hotspots: any = [];
hotspots = hotspots
    .concat(commentParagraph.hotspots)
    .concat(breadcrumbs.hotspots)
    .concat(section.hotspots)
    .concat(video.hotspots)
    .concat(friends.hotspots)
    .concat(profileImages.hotspots)
    .concat(recentActivities.hotspots);
