import { TaskTypeComponent } from './../task-type.component';
import { Injector, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "approve-article-task",
    templateUrl: "./approve-article.html",
    styleUrls: ['./approve-article.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApproveArticleTaskComponent extends TaskTypeComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}
