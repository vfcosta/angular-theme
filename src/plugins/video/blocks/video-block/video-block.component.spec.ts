import * as helpers from './../../../../spec/helpers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { VideoBlockComponent } from './video-block.component';
import { Component, Inject, Input, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { By } from '@angular/platform-browser';

const htmlTemplate = '<noosfero-video-plugin-video-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-video-plugin-video-block>';

describe("Components", () => {

    describe("Video Block Component", () => {

        let component: VideoBlockComponent;
        let fixture: ComponentFixture<VideoBlockComponent>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [VideoBlockComponent],
                providers: [ ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(VideoBlockComponent);
            component = fixture.componentInstance;
            component.block = {
                id: 1,
                settings: {
                    width: 200,
                    height: 200,
                    sections: [],
                    limit: 0
                },
                api_content: {
                    video_type: 'youtube',
                    url_formatted: "https://someurlvideo"
                }
            };
        }));

        it("should have config url equals to block url parameter", fakeAsync(() => {
            spyOn(component['zone'], 'run').and.callThrough();
            component.ngOnInit();
            expect(component['config'].url.changingThisBreaksApplicationSecurity).toEqual("https://someurlvideo");
        }));

        it("should have rendered an iframe when video type is youtube", fakeAsync(() => {
            spyOn(component['zone'], 'run').and.callThrough();
            component.ngOnInit();
            fixture.detectChanges();
            const iframe = fixture.debugElement.query(By.css("iframe.video-block-center"));
            expect(iframe).not.toBeNull();
        }));

        it("should have rendered an iframe when video type is vimeo", fakeAsync(() => {
            component.block.api_content = {
                video_type: 'vimeo',
                url_formatted: "https://vimeovideo"
            };
            spyOn(component['zone'], 'run').and.callThrough();
            component.ngOnInit();
            fixture.detectChanges();
            const iframe = fixture.debugElement.query(By.css("iframe.video-block-center"));
            expect(iframe).not.toBeNull();
        }));

        it("should have rendered an iframe when video type is video", fakeAsync(() => {
            component.block.api_content = {
                video_type: 'video',
                url_formatted: "https://vimeovideo"
            };
            spyOn(component['zone'], 'run').and.callThrough();
            component.ngOnInit();
            fixture.detectChanges();
            const video = fixture.debugElement.query(By.css("video.video-block-center"));
            expect(video).not.toBeNull();
            const iframe = fixture.debugElement.query(By.css("iframe.video-block-center"));
            expect(iframe).toBeNull();
        }));
    });
});
