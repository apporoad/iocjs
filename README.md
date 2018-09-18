# iocjs
iocjs is an easy for peer invoking

## Usage scenario
1. you can call a function without it defined
2. your invoke will wait for the fn register
3. it will work in browser and node
4. it wrapped with promise

## how to install 
    //install
    npm i peeriocjs --save
    
## how to use
* detail @ src/test.*.js
* here is Recommended Usage

    //chain invoke
    //here is invoke
    require("peeriocjs").invoke("fn1").fn1("hello good day").then(function(data){ console.log("here is then")})

    //here is register
    require("peeriocjs").reg("fn1",function(p1){console.log("divide chain success:" + p1 + " "+ this.LiSA)},{ LiSA : "love and peace"})


    // recomand operation
    //here is invoke
    var i1154 = require("peeriocjs").module("1154").invoke(["fn1","config"])

    i1154.fn1("hello good day")
    i1154.config().then(function(config){
        console.log("config value :" + config.name)
    })


    // here is reg
    var m1154 = require("peeriocjs").module("1154")
    m1154.reg([
        {
            name:"fn1",
            fn:function(p1){
                console.log("recommanded is success:" + p1)
                return "yes"
            }
        },
        {
            name:"config",
            fn:function(){
                return {
                    name : "LiSA"
                }
            }
        }
    ])

