import { TaskTypeComponent } from './../task-type.component';
import { Injector } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "approve-article-task",
    template: require("app/task/types/approve-article/approve-article.html")
})
export class ApproveArticleTaskComponent extends TaskTypeComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}
