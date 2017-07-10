import { Component, Inject, Input, NgZone, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: "noosfero-video-plugin-video-block",
    templateUrl: './video-block.html',
    styleUrls: ['./video-block.scss']
})
export class VideoBlockComponent implements OnInit {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    config: any;

    constructor(private zone: NgZone, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.zone.run(() => {
            this.config = {
                "video_type": this.block.api_content.video_type,
                "url": this.sanitizer.bypassSecurityTrustResourceUrl(this.block.api_content.url_formatted),
                "width": this.block.settings.width,
                "height": this.block.settings.height
            };
        });
    }
}
