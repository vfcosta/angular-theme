import * as commentParagraph from "./comment_paragraph";
import * as breadcrumbs from "./breadcrumbs";

export let mainComponents: any = [];
mainComponents = mainComponents.concat(commentParagraph.mainComponents).concat(breadcrumbs.mainComponents);

export let hotspots: any = [];
hotspots = hotspots.concat(commentParagraph.hotspots).concat(breadcrumbs.hotspots);
