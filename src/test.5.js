// here to test how to share ioc methods when require diff ioc.js



require('./temp/ioc').reg("fn",function(){console.log('hello good day')})



require('./ioc').invoke.fn()


require('./temp/ioc').module("config").invoke("config").config()


require('./ioc').module("config").reg("config",function(){ console.log('hello hello good day')})