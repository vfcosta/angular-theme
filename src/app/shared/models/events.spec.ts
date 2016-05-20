import { EventEmitter } from "ng-forward";
import {ModelEvent, ArticleEventType} from "./events";
import {HashMap} from "./../utils/hashmap";
import {ArrayUtils} from "./../utils/arrays";

describe("Events", () => {

    describe("Event Type Tests", () => {

        it("verify event type is correctly created", (done) => {
            let eventType1 = ArticleEventType.removed;
            expect(eventType1.type).toBe("removed");
            expect(ArrayUtils.arraysEqual(eventType1.types, ["added", "removed"])).toBeTruthy();
            done();
        });

        it("different event types of same type should be equal", (done) => {
            let eventType1 = ArticleEventType.removed;
            let eventType2 = ArticleEventType.removed;
            expect(eventType1).toBe(eventType2);
            expect(eventType1 === eventType2).toBeTruthy();
            done();
        });

        it("different events types of different types should not be equal", (done) => {
            let eventType1 = ArticleEventType.removed;
            let eventType2 = ArticleEventType.added;
            expect(eventType1).not.toBe(eventType2);
            expect(eventType1 === eventType2).not.toBeTruthy();
            done();
        });

        it("different events of same type should be equal", (done) => {
            let event1 = ModelEvent.event(ArticleEventType.added);
            let event2 = ModelEvent.event(ArticleEventType.added);
            expect(event1.equals(event2)).toBeTruthy();
            done();
        });

    });

    describe("Event HashMap Tests", () => {
       let events: HashMap<ModelEvent, EventEmitter<noosfero.Article>>;
       beforeEach((done) => {
           events = new HashMap<ModelEvent, EventEmitter<noosfero.Article>>();
           done();
       });

       it("verify event HashMap contains the correct event", () => {
           let expected = new EventEmitter<noosfero.Article>();
           events.put(ModelEvent.event(ArticleEventType.added), expected);
           let actual = events.get(ModelEvent.event(ArticleEventType.added));
           expect(expected === actual).toBeTruthy();
       });

       it("verify event HashMap does not contain the wrong event", () => {
           events.put(ModelEvent.event(ArticleEventType.added), new EventEmitter<noosfero.Article>());
           let actual = events.get(ModelEvent.event(ArticleEventType.removed));
           expect(actual).not.toBeTruthy();
       });

       it("verify HashMap has been cleared", () => {
           events.put(ModelEvent.event(ArticleEventType.added), new EventEmitter<noosfero.Article>());
           events.clear();
           let actual = events.get(ModelEvent.event(ArticleEventType.added));
           expect(actual).not.toBeTruthy();
       });

    });

});
