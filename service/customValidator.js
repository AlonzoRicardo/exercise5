function customValidator() {
    return (req, res, next) => {

        let { destination, body } = req.body
        
        if (typeof req.body !== 'object') {
            res.send('expected payload of type object')
        } else if (destination === "") {
            res.send("payload's length's should be at least 6 characters long")
        } else if (body == "") {
            res.send("payload's body is empty")
        } else if (typeof destination !== 'string' || typeof body !== 'string') {
            res.send("values must be strings")
        } 
        next()
    }
}

module.exports = customValidator;