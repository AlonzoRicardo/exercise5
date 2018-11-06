const CreditModel = (database) => {
    return require('../models/CreditModel')(database)
}

function handleAddCreditToBases(db, amount) {
    let Credit = CreditModel(db)
    return Credit.findOneAndUpdate({ "amount": { $gte: 0 } }, { $inc: { "amount": amount } })
}

module.exports = handleAddCreditToBases;