const CreditModel = (database) => {
    return require('../models/CreditModel')(database)
}

function handleChargeToBases(db, name) {
    let Credit = CreditModel(db)
    console.log(`enters chager handler for db: ${name}`);
    return Credit.findOneAndUpdate({ "amount": { $gte: 5 } }, { $inc: { "amount": -5 } })
}

module.exports = handleChargeToBases