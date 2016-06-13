import { Input, Component } from 'ng-forward';

@Component({
    selector: 'noosfero-block-edition',
    templateUrl: 'app/layout/blocks/block-edition/block-edition.html'
})
export class BlockEditionComponent {

    displayOptions: any;
    displayUserOptions: any;
    languageOptions: any;

    constructor() {
        this.displayOptions = ["always", "home_page_only", "except_home_page", "never"];
        this.displayUserOptions = ["all", "logged", "not_logged"];
        this.languageOptions = ["all", "en", "pt"]; // FIXME get language list
    }
}
