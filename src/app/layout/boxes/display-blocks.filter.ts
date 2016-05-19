import {Pipe, Inject} from "ng-forward";
import {TranslatorService} from "../../shared/services/translator.service";

@Pipe("displayBlocks")
@Inject(TranslatorService)
export class DisplayBlocks {

    constructor(private translatorService: TranslatorService) { }

    transform(blocks: noosfero.Block[], isHomepage: boolean, currentUser: noosfero.User) {
        let selected: noosfero.Block[] = [];
        blocks = blocks || [];
        for (let block of blocks) {
            if (this.visible(block, isHomepage) && this.displayToUser(block, currentUser) &&
                this.displayOnLanguage(block, this.translatorService.currentLanguage())) {
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

    private displayOnLanguage(block: noosfero.Block, language: string) {
        let displayLanguage = block.settings ? (<any>block.settings)['language'] : null;
        return !displayLanguage || displayLanguage === "all" ||
            language === displayLanguage;
    }
}
