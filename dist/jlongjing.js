!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("longjing",[],n):"object"==typeof exports?exports.longjing=n():t.longjing=n()}(window,function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=1)}([function(t,n){var e,r,o;window.ljTsEventAction={},window.onTsEvent=function(){var t;switch(arguments.length){case 1:t=JSON.parse(arguments[0]),"function"==typeof ljTsEventAction[t.fn]&&ljTsEventAction[t.fn](t.data);break;case 2:"function"==typeof ljTsEventAction[arguments[0]]&&ljTsEventAction[arguments[0]](arguments[1])}},t.exports=(e=function(t,n){return n?JSON.stringify({fn:t,data:n}):JSON.stringify({fn:t})},r=function(){var t=arguments[0],n="object"==typeof arguments[1]?arguments[1]:null,r=null;if("object"==typeof arguments[1]?!0===arguments[2]:!0===arguments[1])try{return void 0!==(r=JSON.parse(window.tianshan.invokeApp(e(t,n)))).code&&0==r.code?r.data||{}:r}catch(o){return console.log(e(t,n),"tianshan return data is not json format",o),r}else try{window.tianshan.invokeApp(e(t,n))}catch(r){console.log("app run function has error",e(t,n),c,r)}},o={getAppID:function(){return"test111"},restart:function(){r("restart")},upgrade:function(t){r("upgrade",t)},writeFile:function(t){r("writeFile",t)},readFile:function(t){return r("readFile",t,!0)}},function(t,n){return o[t]?"function"==typeof o[t]?o[t](n):o[t]:n?(n.callback&&n.callback(n),n.callbackFn&&n.callbackFn(n),void(n.fn&&n.fn(n))):null})},function(t,n,e){let r=e(0),o={getDeviceNumber:function(){return this.get().clientNumber||null},getSellerId:function(){return this.get().sellerId||null},getPointNo:function(){return this.get().pointNo||null},get:function(){var t=r("readFile",{path:"sys/client.json"})||{},n={};try{n=JSON.parse(t.content)}catch(e){n=t.content||{}}return n}},i=r("getAppID"),c="xxxx/xxxx/"+i+".json";t.exports={test:function(){return"hello world"},config:function(){var t=function(){var t=n(),e=arguments[0];if("object"==typeof e)for(var o in e)t[o]=e[o];else t[e]=arguments[1];r("writeFile",{path:c,content:JSON.stringify(t)})},n=function(t){var n=r("readFile",{path:c})||{},e={};try{e=JSON.parse(n).content}catch(t){e=n.content||{}}if(t)switch(t){case"deviceNumber":return o.getDeviceNumber();case"sellerId":return o.getSellerId();case"pointNo":return o.getPointNo();case"appid":return i;default:return e[t]||null}return e};switch(arguments.length){case 2:t(arguments[0],arguments[1]);break;case 1:if("object"==typeof arguments[0]&&t(arguments[0]),"string"==typeof arguments[0])return n(arguments[0]);break;case 0:return n()}},open:function(t){},quit:function(){},refresh:function(t){r("refresh",{path:t})},upgrade:function(t){r("upgrade",{url:t}),this.ts("upgradeResult",function(){r("restart")})},ts:function(t,n,e){ljTsEventAction[t]=function(t){n&&n(t,e)}},ready:function(t){t()}}}])});