const axios = require('axios')
const debug = require('debug')('express:client:')
const uuidv1 = require('uuid/v1');

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: `http://localhost:9003/api/v3`,
      timeout: 3000
    });
  };

  sendMessage(destination, body) {
    let uuid = uuidv1();
    return this.service.post('/messages', { destination, body, uuid })
      .then(response => {
        debug("ok", response);
        return {
          ok: true,
          message: response.data
        };
      })
      .catch(error => {
        debug("error", error);
        return {
          ok: false,
          message: error.message
        };
      });
  };

  getMessages() {
    return this.service.get('/messages')
      .then(response => {
        debug("ok", response);
        return {
          ok: true,
          message: response.data
        };
      })
      .catch(error => {
        debug("error", error);
        return {
          ok: false,
          message: error.message
        };
      });
  };

  addCredits(amount) {
    return this.service.post('credits', {amount})
      .then(response => {
        debug("ok", response);
        return {
          ok: true,
          message: response.data
        };
      })
      .catch(error => {
        debug("error", error);
        return {
          ok: false,
          message: error.message
        };
      });
  };
};



module.exports = Service;