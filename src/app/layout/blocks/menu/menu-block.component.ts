import { Component, Input, Inject } from "ng-forward";
import { TranslatorService } from "../../../shared/services/translator.service";

@Component({
    selector: "noosfero-menu-block",
    templateUrl: "app/layout/blocks/menu/menu-block.html"
})
@Inject(TranslatorService)
export class MenuBlockComponent {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    titleTranslator: any;
    links: any[];

    constructor(private translatorService: TranslatorService) {
        this.titleTranslator = {
            'profile_about': this.translatorService.translate('blocks.menu.about'),
            'profile_activities': this.translatorService.translate('blocks.menu.activities'),
            'memberships_index': this.translatorService.translate('blocks.menu.communities'),
            'friends_index': this.translatorService.translate('blocks.menu.friends')
        };
    }

    ngOnInit() {
        this.links = [];
        if (this.block && this.block.api_content) {
            for (let link of this.block.api_content) {
                if (this.hasAvailabledPage(link)) {
                    this.links.push(this.makeUrl(link));
                }
            }
        }
    }

    makeUrl(params: any) {
        let link: any = {};
        let url = '';
        url += '/' + this.owner.identifier;

        if (params.controller != 'profile') {
            url += '/' + params.controller;
        }
        url += '/' + params.action;

        link['title'] = this.titleTranslator[params.controller + '_' + params.action];
        link['url'] = url;
        return link;
    }

    //communities and friends links are not available in this template yet.    
    hasAvailabledPage(link: any) {
        if (link.controller == 'profile') {
            return true;
        }
        return false;
    }
}
