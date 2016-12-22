import { Component, Inject, Input } from "ng-forward";

@Component({
    selector: "noosfero-video-plugin-video-block",
    templateUrl: "plugins/video/blocks/video-block/video-block.html"
})
export class VideoBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    config: any;

    ngOnInit() {
        if (this.block && this.block.api_content) {
            this.config = {
                sources: [
                    { src: this.block.api_content.url, type: this.block.api_content.mime_type }
                ]
            };
            this.block.hide = (<any>this.block.api_content.url == null || <any>this.block.api_content.url === '');
        } else {
            this.block.hide = true;
        }

    }

}
