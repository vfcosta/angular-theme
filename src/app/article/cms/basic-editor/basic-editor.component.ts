import { ProfileService } from './../../../../lib/ng-noosfero-api/http/profile.service';
import { Component, Input, Inject } from 'ng-forward';

@Component({
    selector: 'article-basic-editor',
    templateUrl: "app/article/cms/basic-editor/basic-editor.html"
})
@Inject("$stateParams", ProfileService)
export class BasicEditorComponent {

    @Input() article: noosfero.Article;
    @Input() options: any;
}
