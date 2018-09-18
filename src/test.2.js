var ioc = require('./ioc')

console.log("*here is add module ************************************************")
// you can design your own module
ioc.addModule("reg")
ioc.addModule("abc")
ioc.module("abc")

ioc.abc.record(["fn1","fn2"])

ioc.abc.invoke.fn1("p1").then(function(data){ 
    console.log("your has invoke module.method success :" + data)
})
ioc.abc.reg("fn1",function(p1){return 3})

var abc = ioc.abc.invoke

abc.fn1("p1").then(function(data){ 
    console.log("your has invoke module.method success :" + data)
})