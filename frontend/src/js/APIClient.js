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
    return HTTPClient.get(API_BASE + `/${mediaId}`);
  }
}
