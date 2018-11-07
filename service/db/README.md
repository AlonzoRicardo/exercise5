DATABASE

dbClient:
Exports a function called connect that receives 1 argument and that is the database url that the user wants to connect to.

    Returns:
        An object with the connection to the specified data base.

    Example:
        const dataBase1 = connect('mongodb://database1:27017/SampleDB');
        const dataBase2 = connect('mongodb://database2:27017/SampleDB');
        const localDB = connect('mongodb://local-database:27017/SampleDB');