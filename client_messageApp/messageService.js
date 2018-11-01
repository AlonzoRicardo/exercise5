const axios = require('axios')

class messageService {
  constructor() {
    this.service = axios.create({
      baseURL: `http://localhost:9003`
    });
  }

  sendMessage = (destination, body) => {
    return this.service.post('/message', {destination, body})
    .then(response => response.data)
  }

  getMessages = () => {
    return this.service.get('/messages')
    .then(response => response.data)
  }
}

module.exports = messageService;