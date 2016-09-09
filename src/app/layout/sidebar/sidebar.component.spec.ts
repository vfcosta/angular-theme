import {provide} from 'ng-forward';
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import {providers} from 'ng-forward/cjs/testing/providers';
import {SidebarComponent} from './sidebar.component';
import {SidebarSectionComponent} from './sidebar-section.component';
import * as helpers from '../../../spec/helpers';
import {TranslatorService} from '../../shared/services/translator.service';

const htmlTemplate: string = '<sidebar [visible]="false"></sidebar>';

describe('Sidebar Component', () => {

    let helper: ComponentTestHelper<SidebarComponent>;
    let notifyService: any = {
        event: Function,
        subscribe: (fn: (visible: boolean) => void) => {
            notifyService.event = fn;
        },
        next: (value: any) => {
            notifyService.event(value);
        },
        setVisibility: (visible: boolean) => {
            notifyService.event(visible);
        }
    };

    let sessionService: any = {
        currentUser: (): any => {
            return {
                person: { name: 'test', friends_count: 10 }
            };
        }
    };


    beforeEach(angular.mock.module("templates"));

    beforeEach((done: Function) => {
        providers((provide: any) => {
            return <any>[
                provide('SidebarNotificationService', {
                    useValue: notifyService
                }),
                provide('SessionService', {
                    useValue: sessionService
                }),
                provide('SidebarSectionComponent', {
                    useValue: SidebarSectionComponent

                }),
                provide('TranslatorService', {
                    useValue: helpers.mocks.translatorService
                })
            ];
        });

        let cls = createClass({
            template: htmlTemplate,
            directives: [SidebarComponent],
            properties: {
                visible: false
            }
        });

        helper = new ComponentTestHelper<SidebarComponent>(cls, done);
    });

    it('render the sidebar html content', () => {
        expect(helper.all('div#nav-col').length).toEqual(1);
    });

    it('show sidebar only if a service emit a visibility event', () => {

        notifyService.setVisibility(true);
        expect(helper.component.isVisible()).toBeTruthy();
    });

    it('show user name into sidebar', () => {

        notifyService.setVisibility(true);
        expect(helper.component.user.name).toEqual(sessionService.currentUser().person.name);
        expect(helper.debugElement.query('div.user-box .name a').text()).toMatch(sessionService.currentUser().person.name);
    });

    it('show sidebar section with a friends count item label', () => {
        notifyService.setVisibility(true);
        expect(helper.debugElement.query('li.active a span').text()).toMatch('person.friends_count');
    });

    it('show sidebar section with a friends count item number', () => {
        notifyService.setVisibility(true);
        expect(helper.debugElement.query('li.active a span.item-count').text()).toMatch('10');
    });

});
