import { Input, Inject, Component } from 'ng-forward';
import { TranslatorService } from "../../../shared/services/translator.service";

@Component({
    selector: 'noosfero-block-edition',
    templateUrl: 'app/layout/blocks/block-edition/block-edition.html'
})
@Inject(TranslatorService)
export class BlockEditionComponent {

    static $inject = ["TranslatorService"]; // @Inject doesn't works with uibModal.open

    displayOptions: any;
    displayUserOptions: any;
    languageOptions: any;

    constructor(private translatorService: TranslatorService) {
        this.displayOptions = ["always", "home_page_only", "except_home_page", "never"];
        this.displayUserOptions = ["all", "logged", "not_logged"];
        this.languageOptions = ["all"].concat(Object.keys(translatorService.availableLanguages));
    }
}
