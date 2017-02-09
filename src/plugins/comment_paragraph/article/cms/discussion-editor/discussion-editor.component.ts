import {Component, Input, Inject} from 'ng-forward';
import * as moment from 'moment';

@Component({
    selector: 'comment-paragraph-plugin-discussion-editor',
    templateUrl: "plugins/comment_paragraph/article/cms/discussion-editor/discussion-editor.html"
})
@Inject("$scope")
export class DiscussionEditorComponent {

    @Input() article: noosfero.Article;
    start_date: Date;
    end_date: Date;

    constructor(private $scope: ng.IScope) {
        this.convertDate('start_date');
        this.convertDate('end_date');
    }

    convertDate(attributeName: string) {
        this.$scope.$watch(() => {
            return (<any>this)[attributeName];
        }, () => {
            if ((<any>this)[attributeName]) {
                (<any>this.article)[attributeName] = (<any>this)[attributeName].toISOString();
            }
        });
    }

    ngOnInit() {
        if (this.article.start_date) {
            this.start_date = new Date(this.article.start_date);
        } else {
            this.start_date = moment().toDate();
        }
        if (this.article.end_date) {
            this.end_date = new Date(this.article.end_date);
        }
    }
}
