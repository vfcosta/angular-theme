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

    addBlock(box: noosfero.Box, block: noosfero.Block) {
        block.permissions = ["allow_edit"];
        box.blocks.forEach((block: noosfero.Block) => {
            if (!block._destroy) block.position++;
        });
        block.position = 1;
        box.blocks.unshift(block);
        box.blocks = box.blocks.slice(); // force reload
    }

    updatePosition(sortedBlocks: noosfero.Block[]) {
        let i = 0;
        sortedBlocks.forEach((block: noosfero.Block) => {
            block.position = ++i;
        });
    }
}
