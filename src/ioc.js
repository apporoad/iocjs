//promise

// ioc.record(["yourMethod"])
// ioc.invoke.yourMethod(param1,param2).then(function(data){})
// ioc.reg("yourMethod",yourMethod)
// or  ioc.reg([{name:"yourMethod",fn:yourMethod}])

// ps : es5 has not yield, without babel


function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

function ioc(){
    var _this = this;
    
    /**
     * invoke obj or function
     * @param {string or Array} fnName 
     */
    this.invoke=function(fnName){
        if(!fnName)
            return _this.invoke
        //record and invoke
        if(typeof(fnName) == "string")
            _this.record([fnName]);
        else
            _this.record(fnName)
        return _this.invoke
    };
    /**
     * inner invoke obj
     */
    this.registeredMethods={};

    this.tobeRunMethods = {};

    this.AddTobeRun = function(fnName,fn){
        if(fnName && fn){
            if(!_this.tobeRunMethods[fnName]){
                _this.tobeRunMethods[fnName] = new Array()
            }
            _this.tobeRunMethods[fnName].push(fn)
        }
    }

    /**
     * regOne fn
     * @param {string} methodName 
     * @param {function} methodFn
     * @param {object} bindObj
     * @param {boolean} notOverride is not override the fn already reged
     */
    this.regOne =  function(methodName,methodFn,bindObj,notOverride){
        //record 
        _this.record([methodName])
        if(_this.registeredMethods[methodName])
        {
            if(!notOverride)
                _this.registeredMethods[methodName] = { fn : methodFn, bo : bindObj};
        }
        else
        {
            _this.registeredMethods[methodName] = { fn : methodFn, bo : bindObj};
        }
        // run to be run and clear list
        if(_this.tobeRunMethods[methodName])
        {
            var tempArray = _this.tobeRunMethods[methodName]
            _this.tobeRunMethods[methodName] = null
            tempArray.forEach(element => {
                element();
            });

        }
        //chain
        return _this;
    } ;

    
    /**
     * regOne or array
     * @param {string or array} methodNameOrArray 
     * @param {fn or null} yourMethod 
     * @param {object} bindObj
     * @param {boolean} notOverride is override the fn already reged
     * reg("yourMethod",yourMethod)
     * reg([{name:"yourMethod",fn:yourMethod,bindObj: null}])
     */
    this.reg = function(methodNameOrArray,yourMethod,bindObj,notOverride){
        if(typeof(methodNameOrArray) == "string")
        {
            _this.regOne(methodNameOrArray,yourMethod,bindObj,notOverride)
        }
        else
        {
            for(var i=0;i<methodNameOrArray.length;i++){
                _this.regOne(methodNameOrArray[i].name,methodNameOrArray[i].fn,methodNameOrArray[i].bindObj,notOverride)
            }
        }
        //chain
        return _this;
    }

    /**
     * is reged 
     * @param {string} methodName 
     */
    this.isReg =function(methodName){
        if(_this.registeredMethods[methodName])
            return true;
        return false;
    }


    /**
     * record method
     */
    this.record = function(array){
        for(var i=0;i<array.length;i++){
            var name = array[i]
            if(_this.invoke[name])
                continue;
            //sync
            _this.invoke.sync = _this.invoke.sync || {}
            _this.invoke.sync[name] = function(){
                var name = this.fnName
                var args = arguments
                var result = null
                var rev = function(){
                    if(_this.registeredMethods[name])
                    {
                        result = _this.registeredMethods[name].fn.apply(_this.registeredMethods[name].bo,args);
                        return true;
                    }
                    else
                        return false;
                }
                if(rev())
                    return result
                //sleep 100 ms
                var waitUntil = new Date(new Date().getTime() + 100);
                while(waitUntil > new Date()){}
                if(!rev())
                    console.log("IOC:invoke.sync:"+name + " failed,you must reg it")
                return result


            }.bind({
                fnName : name
            })

            //async (promise) add bindObject ,for 'this'
            _this.invoke[name]=function(){
                var name = this.fnName
                let promise = new Promise((resolve, reject) => {
                    //wait 5 seconds
                    var args = arguments
                    var rev = function(){
                        if(_this.registeredMethods[name])
                        {
                            var result = _this.registeredMethods[name].fn.apply(_this.registeredMethods[name].bo,args);
                            resolve(result)
                            return true;
                        }
                        else
                            return false;
                    }
                    if(rev())
                        return
                    _this.AddTobeRun(name,rev)
                    // sleep(10).then(()=>{
                    //     if(rev())
                    //         return
                    //     sleep(100).then(function(){
                    //         if(rev())
                    //             return
                    //         sleep(200).then(function(){
                    //             if(rev())
                    //                 return
                    //             sleep(500).then(function(){
                    //                 if(rev())
                    //                     return
                    //                 sleep(800).then(function(){
                    //                     if(rev())
                    //                         return
                    //                     sleep(3000).then(()=>{
                    //                         if(rev())
                    //                             return
                    //                         console.log("IOC:invoke:"+name + " failed,you must reg it")
                    //                         reject("invoke failed :" +name)
                    //                     })
    
                    //                 })
                    //             })
                    //         })
                    //     })
                    // })
                }).catch(function(){})
                return promise;
            }.bind({
                fnName : name
            })
        }

        //chain
        return _this;
    }

}



global.LiSA = global.LiSA || new ioc();



exports =global.LiSA




exports.record = LiSA.record
exports.reg = LiSA.reg;
exports.invoke= LiSA.invoke
exports.isReg = LiSA.isReg
/**
 * add module
 * @param {string} moduleName 
 */
exports.addModule = function(moduleName){
    if(!moduleName)
    {
        console.log("modulename must have a value")
        return global.LiSA ;
    }
    if(exports[moduleName]){
        //console.log("modulename cant be add repeatly")
        return exports[moduleName]
    }
    exports[moduleName] = new ioc();
    //chain
    return exports[moduleName];
}

exports.module = exports.addModule

module.exports = exports