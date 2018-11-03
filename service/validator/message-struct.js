const struct = require('superstruct').struct

const MessageStruct = struct({
    destination: 'string',
    body: 'string',
    uuid: 'string',
    status: {
        sent: 'boolean?',
        confirmed: 'boolean?'
    }
})

module.exports = MessageStruct;
