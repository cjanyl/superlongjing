var driver = require("./lib/driver");
var ljClient = {
    getDeviceNumber: function () { // 获取设备号
        return this.get().clientNumber || null;
    },
    getSellerId: function () { // 获取商户号
        return this.get().sellerId || null;
    },
    getPointNo:function(){ // 获取网点号
        return this.get().pointNo|| null;
    },
    get: function () {
        var res = driver('readFile', {path: 'sys/client.json'}) || {};
        var result = {};
        try {
            result = JSON.parse(res.content);
        } catch (e) {
            result = res.content || {}
        }
        return result;
    }
};

var appID = driver('getAppID');

var jssdk = {
    test:function(){
        return 'hello world'
    },
    config:function(){ // todo 同步还是异步
        var set = function(){
            var config = get();
            var arg0 = arguments[0];
            if(typeof  arg0 == 'object'){
                for(var name in arg0){
                    config[name] = arg0[name];
                }
            }else{
                config[arg0] = arguments[1];
            }
            driver('writeConfig', {content: JSON.stringify(config)});
        };
        var get = function(attrName){
            var config = driver('readConfig') || {};
            var jsonConfig = {};
            try{
                if(typeof config.content == 'string'){
                    jsonConfig = (function(result){
                        if(typeof result == 'object') return result;
                        return arguments.callee(JSON.parse(result));
                    })((JSON.parse(config.content) || {}));
                }else{
                    jsonConfig = config.content || {};
                }
            }catch(e){
                jsonConfig = config.content || {};
                console.log('读取配置时，数据处理异常');
            }
            if (attrName) {
                switch(attrName){
                    case 'deviceNumber': //  终端号  设备号
                        return ljClient.getDeviceNumber();
                    case 'sellerId': // 商户号
                        return ljClient.getSellerId();
                    case 'pointNo': //  网点号
                        return ljClient.getPointNo();
                    case 'appid':// 应用号
                        return appID;
                    default:
                        return jsonConfig[attrName] || null;
                }

            }
            return jsonConfig;
        };
        switch(arguments.length){
            case 2:
                set(arguments[0],arguments[1]);
                break;
            case 1:
                if(typeof arguments[0] == 'object'){
                    set(arguments[0]);
                }
                if(typeof arguments[0] == 'string'){
                    return get(arguments[0]);
                }
                break;
            case 0:
                return get();
            default:break;
        }
    },
    openChildWindow: function (options) {
        driver('open', {
            type:options.type||'offline',
            url: options.path});
    },
    closeChildWindow: function () {
        driver('quit');
    },
    refresh:function(path){
        driver('refresh',{path:path});
    },
    upgrade: function (options) {
        driver('upgrade', {url: options.url});
        this.ts('upgradeResult',function(){
            driver('restart');
        });
    },
    setChildWindowAutoCloseSecond:function(options){
        driver('setQuitTime',{time:options.time||options});
    },
    refreshMainWindow:function(){
        driver('notifyMainPage');
    },
    notify:function(name,fn,options){
        switch(name){
            case 'ENTER_SCREENSAVERS':
                name = 'inScreensaver';
                break;
            default:
                break;
        }
        ljTsEventAction[name] = function (res) {
            if(fn)fn(res,options);
        };
    },
    ready:function(fn){ // todo config是否异步通知，设置完成后执行
        fn();
    }
};

// 内置方法
(function(){
    function timer(){
        if(jssdk.config('')){

        }
    }
})();

module.exports = jssdk;
