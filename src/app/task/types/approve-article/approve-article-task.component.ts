import { TaskTypeComponent } from './../task-type.component';
import { Injector } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "approve-article-task",
    templateUrl: "./approve-article.html",
    styleUrls: ['./approve-article.scss']
})
export class ApproveArticleTaskComponent extends TaskTypeComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}
