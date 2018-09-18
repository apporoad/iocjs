var ioc = require('./ioc')


//here is to invoke 
ioc.invoke.test1("p1","p2").then(function(data){
    console.log("here is test2")
})