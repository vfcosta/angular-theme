import { SimpleChanges, Inject, Input, Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { EventsHubService } from "../../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../../known-events";

declare var _: any;

@Component({
    selector: 'noosfero-block-edition',
    template: require('app/layout/blocks/block-edition/block-edition.html')
})
export class BlockEditionComponent {

    options: any;

    @Input() block: noosfero.Block;
    @Input() box: noosfero.Box;
    @Input() owner: noosfero.Profile | noosfero.Environment;
    @ViewChild("popover") popover: any;

    originalBlock: noosfero.Block;
    blockChanged = false;

    constructor(
        private elementRef: ElementRef,
        private eventsHubService: EventsHubService) {
        this.options = {
            display: ["always", "home_page_only", "except_home_page"],
            display_user: ["all", "logged", "not_logged"]
        };
    }

    ngDoCheck() {
        if (this.block && this.originalBlock) this.emitChanges();
    }

    ngOnInit() {
        this.originalBlock = _.cloneDeep(this.block);
        this.eventsHubService.subscribeToEvent(this.eventsHubService.knownEvents.BLOCKS_SAVED, (owner: noosfero.Profile | noosfero.Environment) => {
            this.originalBlock = _.cloneDeep(this.block);
        });

        if (this.block.type !== 'MainBlock')
            this.options.display.push('never');
    }

    selectOption(optionKey: string, option: string) {
        (<any>this.block.settings)[optionKey] = option;
    }

    emitChanges() {
        let blockDiff = <noosfero.Block>{ id: this.block.id, api_content: {} };
        for (let k in this.block.settings) {
            if (!_.isEqual((<any>this.block.settings)[k], (<any>this.originalBlock.settings)[k])) {
                (<any>blockDiff)[k] = (<any>this.block.settings)[k];
            }
        }
        for (let k in this.block.api_content) {
            if (this.originalBlock.api_content && !_.isEqual((<any>this.block.api_content)[k], (<any>this.originalBlock.api_content)[k])) {
                (<any>blockDiff.api_content)[k] = (<any>this.block.api_content)[k];
            }
        }
        if (this.block.title !== this.originalBlock.title) {
            blockDiff.title = this.block.title;
        }
        if (this.block.position !== this.originalBlock.position) {
            blockDiff.position = this.block.position;
        }
        // if (!this.block.id && !blockDiff.position) blockDiff.position = 1; // initialize block position for new blocks
        if (this.block._destroy !== this.originalBlock._destroy) {
            blockDiff._destroy = this.block._destroy;
        }
        blockDiff.box = <noosfero.Box>{ id: this.box.id };
        if (!this.block.id) blockDiff.type = this.block.type;

        if (!blockDiff.id || blockDiff.title != null || Object.keys(blockDiff).length > 3 || (blockDiff.api_content && Object.keys(blockDiff.api_content).length >= 1)) {
            this.eventsHubService.emitEvent(this.eventsHubService.knownEvents.BLOCK_CHANGED, blockDiff);
        }
    }

    isOptionSelected(optionKey: string, option: string) {
        return (<any>this.block.settings)[optionKey] === option ||
            (<any>this.block.settings)[optionKey] == null && this.options[optionKey].indexOf(option) === 0;
    }

    optionsKeys() {
        return Object.keys(this.options);
    }

    optionsValues(optionKey: string) {
        return this.options[optionKey];
    }

    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (this.popover && !this.elementRef.nativeElement.contains($event.target)) {
            this.popover.hide();
        }
    }
}