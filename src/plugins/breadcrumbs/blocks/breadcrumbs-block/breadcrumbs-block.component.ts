import { Component, Inject, Input } from "ng-forward";
import { BlockService } from "../../../../lib/ng-noosfero-api/http/block.service";

@Component({
    selector: "noosfero-breadcrumbs-plugin-content-breadcrumbs-block",
    templateUrl: 'plugins/breadcrumbs/blocks/breadcrumbs-block/breadcrumbs-block.html'
})
@Inject(BlockService, "$scope", "$state", "$stateParams")
export class BreadcrumbsBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    profile: noosfero.Profile;
    links: [];

    constructor(private blockService: BlockService,
        private $scope: ng.IScope,
        private $state: ng.ui.IStateService,
        private $stateParams: ng.ui.IStateParamsService) { }

    ngOnInit() {
        this.$scope.$on('$stateChangeSuccess', () => this.setNavigationState());
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

    getDisplayName(state) {
        console.log(state);
        if (state.data && state.data.displayName) {
            return state.data.displayName;
        }
        return state.name;
    }

    isCurrent(state) {
        return this.$state.$current.name === state.name;
    }
}
