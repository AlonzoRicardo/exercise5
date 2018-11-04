const Service = require('./message-client')
const messageClient = new Service();

/* messageClient.addCredits(100)
    .then(response => console.log(response)) */
messageClient.addCredits(50)
    .then(response => console.log(response))

let i = 0;
let interval = () => {
    setInterval(() => {
        i === 20 ? 
        messageClient.addCredits(50)
        .then(response => console.log(response))
        : i++

        messageClient.sendMessage('inya', 'yohaus').then(res => console.log(res))
            .then(() => messageClient.getMessages().then(res => {

                console.log(res.message.splice((res.message.length - 3), 3), 'SPLICE HERE');

                messageClient.addCredits(0)
                    .then(response => console.log(response))
            }))
    }, 800)
}

interval()

