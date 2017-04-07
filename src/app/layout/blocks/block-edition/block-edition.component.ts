import { Inject, Input, Component } from 'ng-forward';
import { EVENTS_HUB_KNOW_EVENT_NAMES, EventsHubService } from "../../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../../known-events";

declare var _: any;

@Component({
    selector: 'noosfero-block-edition',
    templateUrl: 'app/layout/blocks/block-edition/block-edition.html'
})
@Inject("$scope", EventsHubService)
export class BlockEditionComponent {

    eventsNames: NoosferoKnownEvents;
    options: any;

    @Input() block: noosfero.Block;
    @Input() owner: noosfero.Profile | noosfero.Environment;

    originalBlock: noosfero.Block;
    blockChanged = false;

    constructor(private $scope: ng.IScope, private eventsHubService: EventsHubService) {
        this.eventsNames = new NoosferoKnownEvents();
        this.options = {
            display: ["always", "home_page_only", "except_home_page", "never"],
            display_user: ["all", "logged", "not_logged"]
        };
    }

    ngOnInit() {
        this.originalBlock = angular.copy(this.block);
        this.$scope.$watch(() => {
            return this.block;
        }, () => {
            this.emitChanges();
        }, true);
        this.eventsHubService.subscribeToEvent(this.eventsNames.BLOCKS_SAVED, (owner: noosfero.Profile | noosfero.Environment) => {
            this.originalBlock = angular.copy(this.block);
        });
    }

    selectOption(optionKey: string, option: string) {
        (<any>this.block.settings)[optionKey] = option;
    }

    emitChanges() {
        let blockDiff = <noosfero.Block>{ id: this.block.id, api_content: {} };
        for (let k in this.block.settings) {
            if (!angular.equals((<any>this.block.settings)[k], (<any>this.originalBlock.settings)[k])) {
                (<any>blockDiff)[k] = (<any>this.block.settings)[k];
            }
        }
        for (let k in this.block.api_content) {
            if (this.originalBlock.api_content && !angular.equals((<any>this.block.api_content)[k], (<any>this.originalBlock.api_content)[k])) {
                (<any>blockDiff.api_content)[k] = (<any>this.block.api_content)[k];
            }
        }
        if (this.block.title !== this.originalBlock.title) {
            blockDiff.title = this.block.title;
        }
        if (this.block._destroy !== this.originalBlock._destroy) {
            blockDiff._destroy = this.block._destroy;
        }

        this.eventsHubService.emitEvent(this.eventsNames.BLOCK_CHANGED, blockDiff);
    }

    isOptionSelected(optionKey: string, option: string) {
        return (<any>this.block.settings)[optionKey] === option ||
            (<any>this.block.settings)[optionKey] == null && this.options[optionKey].indexOf(option) === 0;
    }
}
