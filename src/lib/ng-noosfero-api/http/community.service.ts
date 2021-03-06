import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from '@angular/core';
import { RestangularService } from './restangular_service';
import { PersonService } from './person.service';
import { Observable } from 'rxjs/Observable';
import * as _ from "lodash";

@Injectable()
export class CommunityService extends RestangularService<noosfero.Community> {

    constructor(protected restangular: Restangular, protected personService: PersonService) {
        super(restangular);
    }

    getResourcePath() {
        return "communities";
    }

    getDataKeys() {
        return {
            singular: 'community',
            plural: 'communities'
        };
    }

    createNewCommunity(community: noosfero.Community) {
        const headers = {
            'Content-Type': 'application/json'
        };
        const attributesToUpdate: any = {
            community: Object.assign({}, _.omitBy(_.pick(community, ['name', 'closed']), _.isNull))
        };
        const restRequest = this.getElement(null).customPOST(attributesToUpdate, null, null, headers);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    updateCommunity(community: noosfero.Community) {
        const headers = {
            'Content-Type': 'application/json'
        };
        const attributesToUpdate: any = {
            community: Object.assign({}, _.omitBy(_.pick(community, ['name', 'closed']), _.isNull))
        };
        const restRequest = this.getElement(community.id).customOperation("patch", null, null, headers, attributesToUpdate);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    getByOwner(owner: any, params?: any) {
        // TODO see a better way to verify the owner type
        if (owner.type === "Person") {
            return this.getByPerson(owner, params);
        } else {
            return this.getByEnvironment(params);
        }
    }

    getByEnvironment(params?: any) {
        return this.list(null, params);
    }

    getByPerson(person: noosfero.Person, params?: any) {
        const personElement = this.personService.getElement(person.id);
        return this.list(personElement, params);
    }

    sendInvitations(communityId: number, people: noosfero.Person[]) {
        const headers = {
            'Content-Type': 'application/json'
        };
        const invitations = [];
        for (const invitation of people) {
            invitations.push(`${invitation.id}`);
        }
        const params = { 'contacts': invitations };
        const restRequest = this.getElement(communityId).customPOST(params, "invite", null, headers);
        return restRequest.map((ret: any) => {
            return ret.data;
        });
    }

    getCommunityElement(communityId: number) {
        return this.restangular.one('communities', communityId);
    }

    getMembershipState(person: noosfero.Person, profile: noosfero.Profile) {
        if (person) {
            return this.getCommunityElement(profile.id).customGET('membership', { identifier: person.identifier }).toPromise().then((result: any) => {
                return Promise.resolve(result.data);
            });
        } else {
            return Promise.resolve(0);
        }
    }
}
