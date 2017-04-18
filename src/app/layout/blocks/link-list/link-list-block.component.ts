import { DragulaService } from 'ng2-dragula';
import { Component, Input, Inject } from "@angular/core";

@Component({
    selector: "noosfero-link-list-block",
    template: require("app/layout/blocks/link-list/link-list-block.html")
})
export class LinkListBlockComponent {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    links: any;
    newIndex = -1;

    dragulaOptions: any;

    constructor(private dragulaService: DragulaService) {
    }


    ngOnInit() {
        this.dragulaOptions = {
            invalid: () => {
                return !this.designMode;
            }
        };

        this.dragulaService.dropModel.subscribe((value) => {
            if (this.designMode) {
                let links = [];
                for (let link of this.links) {
                    links.push(link);
                }
                this.block.settings.links = links;
            }
        });

        if (this.block && this.block.settings) {
            this.links = this.block.settings.links;
        }
    }

    addLink() {
        this.links.push({ name: "", address: "http://", icon: "fa-file-o" });
        this.newIndex = this.links.length - 1;
    }

    isNewLink(index: number) {
        return index === this.newIndex;
    }

    removeLink(index: number) {
        this.links.splice(index, 1);
    }
}
