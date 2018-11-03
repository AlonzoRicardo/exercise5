const Service = require('./message-client')
const messageClient = new Service();

messageClient.sendMessage('inbla', 'blacar').then(res => console.log(res))
.then(() => messageClient.getMessages().then(res => {
    
    console.log(res.message.splice((res.message.length - 5), 5), 'SPLICE HERE');
    
}))
