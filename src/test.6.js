

var LiSA =require('./ioc').module("LiSA")

console.log("fn isReg:" +LiSA.isReg("fn"))

LiSA.reg("fn",function(){console.log("fn1 called")})

console.log("fn isReg:" +LiSA.isReg("fn"))

LiSA.invoke.sync.fn();

LiSA.reg("fn",function(){console.log("fn2 called")},null,true)

LiSA.invoke.sync.fn();

LiSA.reg('fn',function(){console.log("fn3 called")})

LiSA.invoke.sync.fn();