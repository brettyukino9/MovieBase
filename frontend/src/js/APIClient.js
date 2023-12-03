import HTTPClient from "./HTTPClient.js";

const API_BASE = '/api'

export default {
  createAccount: (firstName, lastName, email, password) => {
    return HTTPClient.post(API_BASE + '/createAccount', {firstName, lastName, email, password})
  }
}