/**
 * Created by wander on 15-3-2.
 * 这个模块是 Egret Runtime 对 EgretH5SDK的代理层
 */

function createEgretSDK(){
    var EgretH5Sdk = {

        checkLogin:function(callback,thisObject){

            EgretH5Sdk.checkLoginCallback = callback.bind(thisObject);

            var webviewInfo = {
                "action":"callWebViewMethod",
                "data":{
                    methodName:"checkLogin",
                    paramStr:""
                }
            };
            var webviewInfoStr = JSON.stringify(webviewInfo);
            console.log (webviewInfoStr);
            egret.ExternalInterface.call("newWebViewInstance", webviewInfoStr);
        },


        login:function(callback,thisObject){

            EgretH5Sdk.loginCallback = callback.bind(thisObject);
            var webviewInfo = {
                "action":"callWebViewMethod",
                "data":{
                    methodName:"login",
                    paramStr:""
                }
            };
            var webviewInfoStr = JSON.stringify(webviewInfo);
            console.log (webviewInfoStr);
            egret.ExternalInterface.call("newWebViewInstance", webviewInfoStr);

        },


        pay:function(orderInfo){

            orderInfo.runtime = 1;
            console.log ("proxy.pay");

//            orderInfo = {
//                "uId":"1",
//                "appId":"1",
//                "goodsId":"12001",
//                "goodsNumber":"1",
//                "serverId":"1",
//                "ext":"1"
//            };


            var webviewInfo = {
                "action":"callWebViewMethod",
                "data":{
                    methodName:"pay",
                    paramStr:JSON.stringify(orderInfo)
                }
            };
            var webviewInfoStr = JSON.stringify(webviewInfo);
            console.log (webviewInfoStr);
            egret.ExternalInterface.call("newWebViewInstance", webviewInfoStr);
        },


        init:function(){


            console.log ("EgretSDK init")
            egret.ExternalInterface.addCallback("webview_to_runtime_js_data",function(resultStr){

                var result = JSON.parse(resultStr);
                switch (result.type){
                    case "checkLoginCallback":
                        EgretH5Sdk.checkLoginCallback(result.data);
                        break;
                    case "loginCallback":
                        EgretH5Sdk.loginCallback(result.data);
                        break;
                    case "isOpenAttentionCallback":
                        EgretH5Sdk.isOpenAttentionCallback(result.data);
                        break;
                }
            });


            var url = "http://showcase.egret-labs.org/runtime_demo/sdk/v3/login.html" + egret_native.getOption("game_platInfoParam");

            var webviewInfo = {
                "action":"createHiddenWebView",
                "data":{
                    "url":url
                }
            };

            var webviewInfoStr = JSON.stringify(webviewInfo)
            egret.ExternalInterface.call("newWebViewInstance", webviewInfoStr);
        },


        attention:function(appId, id){
            var paramObj = {
                "appId":appId,
                "id":id
            }

            var webviewInfo = {
                "action":"callWebViewMethod",
                "data":{
                    methodName:"attention",
                    paramStr:JSON.stringify(paramObj)
                }
            };
            var webviewInfoStr = JSON.stringify(webviewInfo);
            console.log (webviewInfoStr);
            egret.ExternalInterface.call("newWebViewInstance", webviewInfoStr);
        },

        isOpenAttention:function(appId, id, callbackFun, callbackFunClass){

            EgretH5Sdk.isOpenAttentionCallback = callbackFun.bind(callbackFunClass);

            var paramObj = {
                "appId":appId,
                "id":id
            }

            var webviewInfo = {
                "action":"callWebViewMethod",
                "data":{
                    methodName:"isOpenAttention",
                    paramStr:JSON.stringify(paramObj)
                }
            };
            var webviewInfoStr = JSON.stringify(webviewInfo);
            console.log (webviewInfoStr);
            egret.ExternalInterface.call("newWebViewInstance", webviewInfoStr);

        }

    }

    EgretH5Sdk.init();
    return EgretH5Sdk;
}


function createNestSDK(){
    var EgretH5Sdk = {};

    function login(callback,thisObject){
        callback = callback.bind(thisObject);
        nest1.user.init(callback)

    }


    function checkLogin(callback,thisObject){
        var data = {token:null,status:-1};
        callback.call(thisObject,data);
    }

    function pay(orderInfo){
        nest1.iap.pay(orderInfo,function(){});
    }

    function attention(appId, id){
        return;
    }

    function isOpenAttention(appId, id, callbackFun, callbackFunClass){
        callbackFun.call(callbackFunClass, {"status": 0});
    }

    EgretH5Sdk.login = login;
    EgretH5Sdk.checkLogin = checkLogin;
    EgretH5Sdk.pay = pay;
    EgretH5Sdk.attention = attention;
    EgretH5Sdk.isOpenAttention = isOpenAttention;
    return EgretH5Sdk;

}





// 如果 EgretH5Sdk 已经存在，就代表是H5环境，无需代理层
if (!EgretH5Sdk){

    if (egret_native.getOption("egret.runtime.nest") == 1){
        var EgretH5Sdk = createNestSDK();
    }
    else {
        var EgretH5Sdk = createEgretSDK();
    }
}
else{
    console.log ("Egret SDK init");
}