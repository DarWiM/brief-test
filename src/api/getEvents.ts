import {Octokit} from '@octokit/rest';
import {GetResponseDataTypeFromEndpointMethod} from '@octokit/types';

const octokit = new Octokit();

const getEvents = octokit.rest.activity.listPublicEvents;

export default getEvents;

export type EventsData = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.activity.listPublicEvents
>;
