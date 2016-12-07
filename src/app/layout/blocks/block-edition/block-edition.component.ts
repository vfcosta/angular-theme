import { Input, Component } from 'ng-forward';

@Component({
    selector: 'noosfero-block-edition',
    templateUrl: 'app/layout/blocks/block-edition/block-edition.html'
})
export class BlockEditionComponent {

    options: any;

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile | noosfero.Environment;

    constructor() {
        this.options = {
            display: ["always", "home_page_only", "except_home_page", "never"],
            display_user: ["all", "logged", "not_logged"]
        };
    }

    selectOption(optionKey: string, option: string) {
        (<any>this.block.settings)[optionKey] = option;
    }

    isOptionSelected(optionKey: string, option: string) {
        return (<any>this.block.settings)[optionKey] === option ||
            (<any>this.block.settings)[optionKey] == null && this.options[optionKey].indexOf(option) === 0;
    }
}
