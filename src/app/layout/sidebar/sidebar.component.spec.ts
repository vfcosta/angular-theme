import {provide} from 'ng-forward';
import {ComponentTestHelper, createClass} from '../../../spec/component-test-helper';
import {providers} from 'ng-forward/cjs/testing/providers';
import {SidebarComponent} from './sidebar.component';
import * as helpers from '../../../spec/helpers';

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
                person: { name: 'test' }
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

});
