import * as commentParagraph from "./comment_paragraph";
import * as breadcrumbs from "./breadcrumbs";
import * as section from "./section";

export let mainComponents: any = [];
mainComponents = mainComponents.concat(commentParagraph.mainComponents).concat(breadcrumbs.mainComponents).concat(section.mainComponents);

export let hotspots: any = [];
hotspots = hotspots.concat(commentParagraph.hotspots).concat(breadcrumbs.hotspots).concat(section.hotspots);
