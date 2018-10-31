const messageService = require('./messageService')

//messageapp users shouldn't be able to have names that contain so many special characters
messageService.sendMessage(".l,.'/'[*()!@#$%^&()_]", "console.log('sdfsdf')");

//Client side error but more than 3 fields shouldn't be allowed
messageService.sendMessage(".l,.'/'[*()!@#$%^&()_]", "console.log('sdfsdf')", "console.log('im not a log')")

//There should be a spam protection for this endpoint
setInterval(() => {
    messageService.sendMessage(".l,.'/'[*()!@#$%^&()_]", "console.log('sdfsdf')", "console.log('im not a log')")
}, 1);


//cliente de cesar
//empty strings <--- Breaks here
messageService.sendMessage( "", "" )

//undefined <--- code Breaks but not message send to messageapp
 messageService.sendMessage( undefined, undefined )

//object inside <--- Breaks here,s hould be string only
 messageService.sendMessage( {destination:"hola",body:"holahola"}, "asfsf" )

//null <--- code Breaks but not message send to messageapp
 messageService.sendMessage( null, null )

//numbers <--- Breaks here, should be string only
 messageService.sendMessage( 1234, 1234 )
