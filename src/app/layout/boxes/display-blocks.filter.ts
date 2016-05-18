import {Pipe, Inject} from "ng-forward";

@Pipe("displayBlocks")
export class DisplayBlocks {

    transform(blocks: noosfero.Block[], isHomepage: boolean, currentUser: noosfero.User) {
        let selected: noosfero.Block[] = [];
        blocks = blocks || [];
        for (let block of blocks) {
            if (this.visible(block, isHomepage) && this.displayToUser(block, currentUser)) {
                selected.push(block);
            }
        }
        return selected;
    }

    private visible(block: noosfero.Block, isHomepage: boolean) {
        let display = block.settings ? (<any>block.settings)['display'] : null;
        return !display || ((isHomepage ? display !== "except_home_page" : display !== "home_page_only") && display !== "never");
    }

    private displayToUser(block: noosfero.Block, currentUser: noosfero.User) {
        let displayUser = block.settings ? (<any>block.settings)['display_user'] : null;
        return !displayUser || displayUser === "all" ||
            (currentUser ? displayUser === "logged" : displayUser === "not_logged");
    }
}
