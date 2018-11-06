const MessageModel = (database) => {
    return require('../models/MessageModel')(database)
}

function handleMsgUpdateToBases(uuid, sent, confirmed, db) {
    let Message = MessageModel(db)
    return Message.findOneAndUpdate({ uuid }, { $set: { "status": { sent, confirmed } } }, { new: true })
}

module.exports = handleMsgUpdateToBases