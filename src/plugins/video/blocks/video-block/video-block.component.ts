import {Component, Inject, Input} from "ng-forward";

@Component({
    selector: "noosfero-video-plugin-video-block",
    templateUrl: "plugins/video/blocks/video-block/video-block.html"
})
@Inject('$sce')
export class VideoBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    config: any;

    constructor(private $sce: ng.ISCEService) {
    }

    ngOnInit() {
        if (this.block && this.block.api_content) {
            this.config = {
                sources: [
                    { src: this.$sce.trustAsHtml(this.block.api_content.url), type: this.block.api_content.mime_type }
                ]
            };
        }
    }

}
