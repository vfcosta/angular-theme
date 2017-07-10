import { EventsHubService } from './../../../../../app/shared/services/events-hub.service';
import { TranslatorService } from './../../../../../app/shared/services/translator.service';
import { ValidationMessageComponent } from './../../../../../app/shared/components/validation-message/validation-message.component';
import { NgModel } from '@angular/forms';
import { Input } from '@angular/core';
import { OnInit, Inject, Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import * as moment from 'moment';

@Component({
    selector: 'comment-paragraph-plugin-discussion-editor',
    templateUrl: './discussion-editor.html',
    styleUrls: ['./discussion.scss']
})
export class DiscussionEditorComponent implements OnInit {

    @Input() article: noosfero.Article;
    @Input() options: any;
    start_date: any;
    end_date: any;

    @ViewChild('titleValidation') titleValidation: ValidationMessageComponent;
    @ViewChild('startDateValidation') startDateValidation: ValidationMessageComponent;
    @ViewChild('endDateValidation') endDateValidation: ValidationMessageComponent;
    locale: string;

    constructor(private eventsHubService: EventsHubService, private translatorService: TranslatorService) {
        eventsHubService.subscribeToEvent(eventsHubService.knownEvents.ARTICLE_SAVE_ERROR, (error: any) => {
            this.titleValidation.setBackendErrors(error.data);
            this.startDateValidation.setBackendErrors(error.data);
            this.endDateValidation.setBackendErrors(error.data);
        });
    }

    ngOnInit() {
        this.locale = this.translatorService.currentLanguage();
        if (this.locale === 'pt') this.locale = 'pt-br';
        if (this.article.start_date) {
            this.start_date = this.formatDate(new Date(this.article.start_date));
        } else {
            this.start_date = this.formatDate(moment().toDate());
        }
        if (this.article.end_date) {
            this.end_date = this.formatDate(new Date(this.article.end_date));
        }
    }

    formatDate(date: Date) {
        // set date object to format expected by date picker
        return { date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } };
    }

    onDateChanged(field: string, event: IMyDateModel) {
        if (event && event.formatted) this.article[field] = event.formatted;
    }
}
