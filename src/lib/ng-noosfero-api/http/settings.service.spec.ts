import { MockBackend } from '@angular/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import { Restangular, RestangularModule } from 'ngx-restangular';
import { SettingsService } from './settings.service';
import * as helpers from '../../../spec/helpers';

describe("Services", () => {
    describe("Settings Service", () => {
        let service: SettingsService;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule, RestangularModule, BrowserModule],
                providers: [
                    SettingsService,
                ].concat(helpers.provideMockBackend()),
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(SettingsService);
        }));

        describe("Succesfull requests", () => {
            xit("should return available blocks", (done) => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/settings/available_blocks`,
                    [{type: "RawHTMLBlock"}], {}, 200);
                service.getAvailableBlocks(<noosfero.Profile>{ id: profileId }).then((content: any) => {
                    expect(content.data[0].type).toEqual("RawHTMLBlock");
                });
            });
        });
    });
});
