import { Component, Inject, Input } from "ng-forward";

@Component({
    selector: "noosfero-video-plugin-video-block",
    templateUrl: "plugins/video/blocks/video-block/video-block.html"
})
@Inject("$scope")
export class VideoBlockComponent {

    @Input() block: any;
    @Input() owner: any;

    config: any;

    constructor(private $scope: ng.IScope) {
    }

    ngOnInit() {
        this.$scope.$watch(() => { return this.block.settings.url; }, () => {
            this.block.hide = true;
            if (this.block && this.block.settings && this.block.settings.url && this.block.api_content) {                
                this.config = {
                    sources: [
                        { src: this.block.settings.url, type: this.block.api_content.mime_type }
                    ]
                };
                this.block.hide = false;
            }
        });
    }
}
