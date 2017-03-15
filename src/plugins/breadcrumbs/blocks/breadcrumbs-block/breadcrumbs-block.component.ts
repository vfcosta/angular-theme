import { Component, Inject, Input } from "ng-forward";
import { BlockService } from "../../../../lib/ng-noosfero-api/http/block.service";

@Component({
    selector: "noosfero-breadcrumbs-plugin-content-breadcrumbs-block",
    templateUrl: 'plugins/breadcrumbs/blocks/breadcrumbs-block/breadcrumbs-block.html'
})
@Inject(BlockService, "$state", "$stateParams", "$transitions")
export class BreadcrumbsBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: noosfero.Profile;
    links: any[] = [];

    constructor(private blockService: BlockService,
        private $state: ng.ui.IStateService,
        private $stateParams: ng.ui.IStateParamsService,
        private $transitions: any) { }

    ngOnInit() {
        this.$transitions.onSuccess({}, (trans) => {
            this.setNavigationState();
        });
        this.setNavigationState();
        this.profile = this.owner;
    }

    setNavigationState() {
        this.blockService.getApiContent(this.block, this.$stateParams).then((content: any) => {
            this.links = content.links;
            this.block.hide = this.links.length <= 1;
            if (!this.block.hide) {
                this.links[this.links.length - 1]['active'] = true;
            }
        });
    };

    getDisplayName(state: any) {
        if (state.data && state.data.displayName) {
            return state.data.displayName;
        }
        return state.name;
    }

    isCurrent(state: any) {
        return (<any>this.$state.$current)['name'] === state.name;
    }
}
