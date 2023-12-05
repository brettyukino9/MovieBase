import HTTPClient from "./HTTPClient.js";

const API_BASE = '/api'

export default {
  createAccount: (firstName, lastName, email, password) => {
    return HTTPClient.post(API_BASE + '/users/createAccount', {firstName, lastName, email, password})
  },
  fetchAllMedia: async () => {
    return HTTPClient.get(API_BASE + '/search/media')
  },
  fetchMedia: (mediaId) => {
    return HTTPClient.get(API_BASE + `/media/${mediaId}`);
  },
  fetchMediaTypes: () => {
    return HTTPClient.get(API_BASE + `/search/mediatype`);
  },
  fetchAgeRatings: () => {
    return HTTPClient.get(API_BASE + '/search/agerating');
  },
  fetchLanguages: () => {
    return HTTPClient.get(API_BASE + '/search/language');
  },
  fetchStramingServices: () => {
    return HTTPClient.get(API_BASE + '/search/streaming');
  },
  fetchGenres: () => {
    return HTTPClient.get(API_BASE + '/search/genre');
  },
  fetchMediaGenres: (mediaId) => {
    return HTTPClient.get(API_BASE + `/media/${mediaId}/genres}`);
  },
  fetchSearch: (filter, search) => {
    return HTTPClient.post(API_BASE + `/search/search`, {filter, search})
  }
}
