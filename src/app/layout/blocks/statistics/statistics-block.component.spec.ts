import { BlockService } from './../../../../lib/ng-noosfero-api/http/block.service';
import { ArticleService } from './../../../../lib/ng-noosfero-api/http/article.service';
import { StatisticsBlockComponent } from './statistics-block.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslatePipe } from '../../../shared/pipes/translate-pipe';

import * as helpers from "../../../../spec/helpers";

describe("Components", () => {
    describe("Statistics Block Component", () => {
        let articleService = helpers.mocks.articleService;
        let blockService = helpers.mocks.blockService;
        let translatorService = helpers.mocks.translatorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [StatisticsBlockComponent, TranslatePipe],
                providers: [
                    { provide: ArticleService, useValue: articleService },
                    { provide: BlockService, useValue: blockService },
                    { provide: 'translatorService', useValue: translatorService }
                ]
            }).compileComponents();
        }));

        it("shows statistics marked with display equals 'true'", () => {
            const fixture = TestBed.createComponent(StatisticsBlockComponent);
            fixture.componentInstance.block = {
                statistics:
                [
                    { name: 'users', display: true, quantity: 10 },
                    { name: 'communities', display: true, quantity: 20 },
                    { name: 'hits', display: false, quantity: null }

                ]
            };
            fixture.detectChanges();
            let compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelectorAll('li.statistic').length).toEqual(2);
            expect(compiled.querySelector("span.users").innerHTML).toEqual("10");
            expect(compiled.querySelector("span.communities").innerHTML).toEqual("20");
        });

        it("does not shows statistics marked with display equals 'false'", () => {
            const fixture = TestBed.createComponent(StatisticsBlockComponent);
            fixture.componentInstance.block = {
                statistics: [{ name: 'hits', display: false, quantity: null }]
            };
            fixture.detectChanges();
            let compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelectorAll("span.hits").length).toEqual(0);
        });
    });
});
