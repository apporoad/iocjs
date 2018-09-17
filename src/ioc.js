//promise

// ioc.record(["yourMethod"])
// ioc.invoke.yourMethod(param1,param2).then(function(data){})
// ioc.reg("yourMethod",yourMethod)
// or  ioc.reg([{name:"yourMethod",fn:yourMethod}])

// ps : es5 has not yield, without babel

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

/**
 * invoke obj
 */
var invoke = {};

/**
 * inner invoke obj
 */
var registeredMethods = {}

/**
 * regOne fn
 * @param {string} methodName 
 * @param {function} methodFn
 * @param {object} bindObj
 */
var regOne= function(methodName,methodFn,bindObj){
    registeredMethods[methodName] = { fn : methodFn, bo : bindObj};
} 

/**
 * regOne or array
 * @param {string or array} methodNameOrArray 
 * @param {fn or null} yourMethod 
 * reg("yourMethod",yourMethod)
 * reg([{name:"yourMethod",fn:yourMethod,bindObj: null}])
 */
var reg = function(methodNameOrArray,yourMethod,bindObj){
    if(typeof(methodNameOrArray) == "string")
    {
        regOne(methodNameOrArray,yourMethod,bindObj)
    }
    else
    {
        for(var i=0;i<methodNameOrArray.length;i++){
            regOne(methodNameOrArray[i].name,methodNameOrArray[i].fn,methodNameOrArray[i].bindObj)
        }
    }
}

/**
 * record method
 */
var record = function(array){
    for(var i=0;i<array.length;i++){
        var name = array[i]
        // add bindObject ,for 'this'
        invoke[name]=function(){
            var name = this.fnName
            let promise = new Promise((resolve, reject) => {
                //wait 5 seconds
                var args = arguments
                var rev = function(){
                    if(registeredMethods[name])
                    {
                        var result = registeredMethods[name].fn.apply(registeredMethods[name].bo,args);
                        resolve(result)
                        return true;
                    }
                    else
                        return false;
                }
                if(rev())
                    return
                sleep(10).then(()=>{
                    if(rev())
                        return
                    sleep(100).then(function(){
                        if(rev())
                            return
                        sleep(200).then(function(){
                            if(rev())
                                return
                            sleep(500).then(function(){
                                if(rev())
                                    return
                                sleep(800).then(function(){
                                    if(rev())
                                        return
                                    sleep(3000).then(()=>{
                                        if(rev())
                                            return
                                        console.log("IOC:invoke:"+name + " failed,you must reg it")
                                        reject("invoke failed :" +name)
                                    })
  
                                })
                            })
                        })
                    })
                })
            }).catch(function(){})
            return promise;
        }.bind({
            fnName : name
        })
    }
}


exports.record = record
exports.reg = reg;
exports.invoke= invoke