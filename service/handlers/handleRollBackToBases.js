const CreditModel = (database) => {
    return require('../models/CreditModel')(database)
}

function handleRollBackToBases(db, name) {
    let Credit = CreditModel(db)
    console.log(`enters rollback handler for db: ${name}`);
    return Credit.findOneAndUpdate({ "amount": { $gte: 0 } }, { $inc: { "amount": +5 } })
}

module.exports = handleRollBackToBases