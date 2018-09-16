# iocjs
iocjs is an easy for peer invoking

## Usage scenario
1. you can call a function without it defined
2. your invoke will wait for the fn register
3. it will work in browser and node
4. it wrapped with promise

## how to use
`
    var ioc = require('./ioc')
    // first record methods
    ioc.record(["test1","test2","test3"])

    // then you can invoke the methods any way
    ioc.invoke.test1("p1","p2").then(function(data){
        console.log(data)
    })

    ioc.invoke.test2().then(function(){
        console.log("test2 invoked ok")
    })

    ioc.invoke.test3("p1").then(function(data){
        console.log(data)
    })

    // define a bind object
    var bo = {
        name : "LiSA",
        age :32
    }

    // here to register real methods
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
`