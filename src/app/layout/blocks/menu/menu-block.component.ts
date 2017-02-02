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

    titleTranslator: any = {
        'profile_about': this.translatorService.translate('blocks.menu.about'),
        'profile_activities': this.translatorService.translate('blocks.menu.activities'),
        'memberships_index': this.translatorService.translate('blocks.menu.communities'),
        'friends_index': this.translatorService.translate('blocks.menu.friends')
    };
    links: any[];

    constructor(private translatorService: TranslatorService) { }

    ngOnInit() {
        this.links = [];
        if (this.block && this.block.api_content) {
            for (let link of this.block.api_content) {
                if (this.hasAvailablePage(link)) {
                    this.links.push(this.makeUrl(link));
                }
            }
        }
    }

    makeUrl(params: any) {
        let link: { title: string, url: string } = { title: '', url: '' };
        let urlMapping: any = {
            'about': 'main.profile.about({profile: ctrl.owner.identifier})',
            'activities': 'main.profile.info({profile: ctrl.owner.identifier})'
        };

        link.title = this.titleTranslator[params.controller + '_' + params.action];
        link.url = urlMapping[params.action];

        return link;
    }

    // TODO Communities and friends links are not available in this template yet.
    hasAvailablePage(link: any) {
        if (link.controller === 'profile') {
            return true;
        }
        return false;
    }

}
