import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'noosfero-comment-paragraph-plugin-discussion-block',
})
export class DiscussionBlockUpgradeDirective extends UpgradeComponent {
    @Input() block: any;
    @Input() owner: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('noosferoCommentParagraphPluginDiscussionBlock', elementRef, injector);
    }
}