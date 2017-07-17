import * as commentParagraph from './comment_paragraph';
import * as breadcrumbs from './breadcrumbs';
import * as section from './section_block';
import * as video from './video';
import * as friends from './friends';
import * as profileImages from './profile_images';
import * as recentActivities from './recent_activities';
import * as personTags from './person_tags';
import * as event from './event';

export let mainComponents: any = [];
export let ng2MainComponents: any = [];
export let hotspots: any = [];
export let ng2Hotspots: any = [];
export let ng2SharedComponents: any = [];
export let macros: any = [];

export const enabledPlugins = [
    commentParagraph,
    breadcrumbs,
    section,
    video,
    friends,
    profileImages,
    recentActivities,
    personTags,
    event,
];
enabledPlugins.forEach((plugin: any) => {
    mainComponents = mainComponents.concat(plugin.mainComponents);
    ng2MainComponents = ng2MainComponents.concat(plugin.ng2MainComponents);
    if (plugin.ng2SharedComponents) {
        ng2SharedComponents = ng2SharedComponents.concat(plugin.ng2SharedComponents);
    }
    hotspots = hotspots.concat(plugin.hotspots);
    if (plugin.ng2Hotspots) {
        ng2Hotspots = ng2Hotspots.concat(plugin.ng2Hotspots);
    }
    if (plugin.macros) {
        macros = macros.concat(plugin.macros);
    }
});
