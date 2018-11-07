Simple Client
    Setup:
        1. npm install
        2. const messageClient = require('messageClient')

    Methods:
        1. sendMessage(destination, body) // takes 2 arguments, both string types;
        2. getMessages() // retreives all messages from db;
        3. addCredits() // adds the number given to the total the global credits;
        
    Examples: 
        1. send a message:
            messageClient.sendMessage('hello', 'world');
            //returns 'succesfull' or detailed error;

        2. get messages from db:
            messageClient.getMessages();
            //returns
            <!-- [ { _id: '5bdac83fb3f535f1d6219c86',
                    destination: 'la blyat',
                    body: 'kkkkkkk',
                    created_at: '2018-11-01T09:32:48.001Z',
                    updated_at: '2018-11-01T09:32:48.001Z',
                     __v: 0 },

                    { _id: '5bdad6deedc6ad664610c85a',
                    destination: 'hello',
                    body: 'world',
                    created_at: '2018-11-01T10:35:10.166Z',
                    updated_at: '2018-11-01T10:35:10.166Z',
                    __v: 0 } ] 
            -->

        3. add credits:
            messageClient.addCredits(5);
            if the current global credits is 0;
            //returns
            {
                amount: 5;
            }


