import { SettingsService } from './../../../../lib/ng-noosfero-api/http/settings.service';
import { Inject, Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "add-block",
    template: require("app/layout/boxes/add-block/add-block.html")
})
export class AddBlockComponent {

    @Input() box: noosfero.Box;
    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Output() onAdd = new EventEmitter<noosfero.Block>();

    search: string;

    blocks: noosfero.BlockDefinition[];

    constructor(@Inject("settingsService") private settingsService: SettingsService) { }

    loadAvailableBlocks() {
        this.settingsService.getAvailableBlocks(this.owner).then((result: noosfero.RestResult<noosfero.BlockDefinition[]>) => {
            this.blocks = result.data;
        });
    }

    addBlock(block: noosfero.Block) {
        this.onAdd.emit(Object.assign({}, block));
    }
}
