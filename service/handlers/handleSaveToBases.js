const MessageModel = (database) => {
    return require('../models/MessageModel')(database)
}

function handleSaveToBases(destination, body, uuid, db, name) {
    console.log(`enters save handler for db: ${name}`);
    let Message = MessageModel(db)
    let newMsg = new Message({
        destination,
        body,
        uuid
    })
    return newMsg.save()
}

module.exports = handleSaveToBases;
