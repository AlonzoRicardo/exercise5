const axios = require("axios");
const uuidv1 = require("uuid/v1");

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: `http://localhost:9003/api/v3`
    });
  }

  sendMessage(destination, body) {
    let uuid = uuidv1();
    return this.service
      .post("/messages", { destination, body, uuid })
      .then(response => {
        console.log(response.data);
        return {
          ok: true,
          message: response.data
        };
      })
      .catch(error => {
        console.log("error", error.message);
        return {
          ok: false,
          message: error.message
        };
      });
  }

  getMessages() {
    return this.service
      .get("/messages")
      .then(response => {
        return {
          ok: true,
          message: response
        };
      })
      .catch(error => {
        return {
          ok: false,
          message: error.message
        };
      });
  }

  addCredits(amount) {
    return this.service
      .post("/credits", { amount })
      .then(response => {
        console.log(response.data);
        return {
          ok: true,
          message: response.data
        };
      })
      .catch(error => {
        console.log("error", error.message);
        return {
          ok: false,
          message: error.message
        };
      });
  }
}

module.exports = Service;
