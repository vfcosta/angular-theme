import { CommentFormHotspotComponent } from './../../../app/hotspot/comment-form-hotspot.component';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CommentParagraphFormHotspotComponent } from './comment-paragraph-form.component';
import { Injector } from '@angular/core';
import * as helpers from '../../../spec/helpers';

describe("Components", () => {
    describe("Comment Paragraph Form Hotspot Component", () => {
        const mocks = helpers.getMocks();
        let fixture: ComponentFixture<CommentParagraphFormHotspotComponent>;
        let component: CommentParagraphFormHotspotComponent;

        beforeEach(async(() => {
            const commentFormHotspotComponent = {comment: {}, parent: {}};
            TestBed.configureTestingModule({
                declarations: [CommentParagraphFormHotspotComponent],
                providers: [
                    { provide: CommentFormHotspotComponent, useValue: commentFormHotspotComponent },
                ]
            });
            fixture = TestBed.createComponent(CommentParagraphFormHotspotComponent);
            component = fixture.componentInstance;
        }));

        it('set paragraph uuid when parent has it setted', () => {
            component.parent.parent = <any>{ paragraph_uuid: 'uuid' };
            fixture.detectChanges();
            expect((<any>component.parent.comment).paragraph_uuid).toEqual('uuid');
        });
    });
});
