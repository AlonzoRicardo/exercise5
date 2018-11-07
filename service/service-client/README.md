service-client:

IMPORTANT:
-All methods return the promises of the current main database.
-The main database is always in the first index of the hierarchy array.

saveMessage(destination, body, uuid):
-Takes 3 arguments:
-detination: to whom the message is sent
-body: the actual contents of the message
-uuid: unique message identifier

    Returns:
    A promise, once resolved it gives us an object with the saved message;

    Example:
    //calling the constructor
    const ServiceController = require("../service-client/service-client");
    const ServiceHandler = new ServiceController();

    ServiceHandler.saveMessage('john', 'hello john!', uuid)
    .then(obj => obj.body); //Output --> 'hello john!'

charge():
-Takes no arguments and decreases the global balance of the databases;

    Returns:
    A promise, once resolved it gives us an object with the current global credit;

    Example:
    //calling the constructor
    const ServiceController = require("../service-client/service-client");
    const ServiceHandler = new ServiceController();

    ServiceHandler.charge().then(obj => obj.amount); //Output --> 7

sendMessage(destination, body, uuid, res):
-Takes 4 arguments, sends the message, if there is a problem sending the message it will call a rollback function to return the spent credits to the global balance;

-detination: to whom the message is sent
-body: the actual contents of the message
-uuid: unique message identifier
-res: response object passed by the end point;