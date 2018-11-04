const Service = require('./message-client')
const messageClient = new Service();

/* messageClient.addCredits(100)
    .then(response => console.log(response)) */

messageClient.sendMessage('inya', 'yohaus').then(res => console.log(res))
    .then(() => messageClient.getMessages().then(res => {

        console.log(res.message.splice((res.message.length - 5), 5), 'SPLICE HERE');

    messageClient.addCredits(0)
    .then(response => console.log(response)) 
}))

