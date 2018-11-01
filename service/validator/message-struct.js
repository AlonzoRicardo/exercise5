const struct = require('superstruct').struct

const MessageStruct = struct({
    destination: 'string',
    body: 'string'
})

module.exports = MessageStruct;
