// here test sync



var v = require('./ioc').module("abc").invoke("fn").sync.fn("hello good day")
console.log("v:" + v);
console.log("here should behind v")
require('./ioc').module("abc").reg("fn",function(p1){ return "params:" + p1})



