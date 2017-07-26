import { CommentFormHotspotComponent } from './../../../app/hotspot/comment-form-hotspot.component';
import { Inject, Input, Component, Injector, OnInit } from '@angular/core';
import { Hotspot } from '../../../app/hotspot/hotspot.decorator';

@Component({
    selector: "comment-paragraph-form-hotspot",
    template: "<span></span>",
})
@Hotspot("comment_form_extra_contents")
export class CommentParagraphFormHotspotComponent implements OnInit {

    parent: CommentFormHotspotComponent;

    constructor(injector: Injector) {
        this.parent = injector.get(CommentFormHotspotComponent);
    }

    ngOnInit() {
        if (this.parent.parent && (<any>this.parent.parent).paragraph_uuid) {
            (<any>this.parent.comment).paragraph_uuid = (<any>this.parent.parent).paragraph_uuid;
        }
    }
}
