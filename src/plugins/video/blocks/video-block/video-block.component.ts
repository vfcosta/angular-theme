import {Component, Inject, Input} from "ng-forward";

@Component({
    selector: "noosfero-video-plugin-video-block",
    templateUrl: "plugins/video/blocks/video-block/video-block.html"
})
@Inject('$sce')
export class VideoBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    url: string;
    platform: string;
    width: string;
    height: string;
    config: any;
    mimeType: string;  

    constructor (private $sce: ng.ISCEService) {
    }

    ngOnInit() {
        if (this.block && this.block.settings) {
            this.url = this.$sce.trustAsResourceUrl(this.block.settings.url);
            this.platform = this.block.settings.platform;
            this.width = this.block.settings.width;
            this.height = this.block.settings.height;
            this.mimeType = this.block.settings.mime_type;
            this.config =  {
				sources: [
					{src: this.url, type: this.mimeType}
                ]
            }
        }   
    }

}
