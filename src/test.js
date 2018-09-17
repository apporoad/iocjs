

var ioc = require('./ioc')

//error
//ioc.invoke.test1("p1","p2")


ioc.record(["test1","test2","test3"])

ioc.invoke.test1("p1","p2").then(function(data){
    console.log(data)
})

ioc.invoke.test2().then(function(){
    console.log("test2 invoked ok")
})

ioc.invoke.test3("p1").then(function(data){
    console.log(data)
})

var bo = {
    name : "LiSA",
    age :32
}

ioc.reg([
    {
        name:"test1",
        fn:function(p1,p2,p3){
            return p1 + p2 ;
        }
    },
    {
        name : "test2",
        fn:function(p1){
            
        }
    },
    {
        name: "test3",
        fn: function(p1){
            return p1 + this.name + this.age;
        },
        bindObj : bo
    }
])



// add module 
ioc.addModule("reg")

ioc.addModule("abc")

ioc.abc.record(["fn1","fn2"])

ioc.abc.invoke.fn1("p1").then(function(data){ 
    console.log("your has invoke module.method success :" + data)
})

ioc.abc.reg("fn1",function(p1){return 3})
