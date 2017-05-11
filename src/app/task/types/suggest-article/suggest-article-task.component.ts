import { TaskTypeComponent } from './../task-type.component';
import { Injector } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "add-friend-task",
    template: require("app/task/types/suggest-article/suggest-article.html")
})
export class SuggestArticleTaskComponent extends TaskTypeComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}
