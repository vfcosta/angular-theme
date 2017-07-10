import { Inject, Input, Component } from '@angular/core';
import { DesignModeService } from "../../shared/services/design-mode.service";
import { EventsHubService } from "../../shared/services/events-hub.service";

@Component({
    selector: "noosfero-box",
    template: require("app/layout/boxes/box.html")
})
export class BoxComponent {

    @Input() box: noosfero.Box;
    @Input() boxes: noosfero.Box[];
    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() designMode: boolean;
    @Input() column: any;
    @Input() startIndex: number;

    constructor(private eventsHubService: EventsHubService) { }

    showButton(column: any) {
        return this.designMode && this.isNotParent(column);
    }

    isNotParent(column: any) {
        return column && column['subcolumns'] === undefined;
    }

    removeBlock(removedBlock: noosfero.Block) {
        this.box.blocks = this.box.blocks.filter((block: noosfero.Block) => {
            return block.id !== removedBlock.id;
        });
        this.resetBlockPositions();
        this.box.blocks = this.box.blocks.slice(); // force reload
    }

    addBlock(block: noosfero.Block) {
        this.box.blocks.unshift(block);
        this.resetBlockPositions();
        this.box.blocks = this.box.blocks.slice(); // force reload
    }

    resetBlockPositions() {
        let position = 1;
        this.box.blocks.forEach((block: noosfero.Block) => {
            if (!block._destroy) {
                block.position = position;
                position++;
            }
        });
    }

    updatePosition(sortedBlocks: noosfero.Block[]) {
        let i = 0;
        sortedBlocks.forEach((block: noosfero.Block) => {
            block.position = ++i;
        });
    }
}
