const axios = require('axios')

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: `http://localhost:9003`
    });
  }

  sendMessage (destination, body)  {
    return this.service.post('/message', { destination, body })
      .then(response => response.data)
  }

  getMessages () {
    return this.service.get('/messages')
      .then(response => response.data)
  }
}

const messageClient = new Service();
module.exports = messageClient;