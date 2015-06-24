var mo;
(function (mo) {
    //    var normalKey:UIKey = {
    //        //root========================
    //        designWidth:"designWidth",
    //        designHeight:"designHeight",
    //        textures:"textures",
    //        widgetTree:"widgetTree",
    //        dataScale:"dataScale",
    //
    //        //uiWidgetKey================
    //        className:"className",
    //        name:"name",
    //        x:"x",
    //        y:"y",
    //        width:"width",
    //        height:"height",
    //        anchorX:"anchorX",
    //        anchorY:"anchorY",
    //        posType:"posType",//TODO
    //        posPercentX:"posPercentX",//TODO
    //        posPercentY:"posPercentY",//TODO
    //        sizeType:"sizeType",//TODO
    //        sizePercentX:"sizePercentX",//TODO
    //        sizePercentY:"sizePercentY",//TODO
    //        zOrder:"zOrder",
    //        children:"children",
    //        flipX:"flipX",
    //        flipY:"flipY",
    //        opacity:"opacity",
    //        rotation:"rotation",
    //
    //        scaleX:"scaleX",
    //        scaleY:"scaleY",
    //        touchEnabled:"touchEnabled",
    //        visible:"visible",
    //
    //        layoutParameter:"layoutParameter",
    //
    //        //mo only
    //        color:"color",
    //        res:"res",
    //
    //        //scale9Grid
    //        scale9Grid:"scale9Grid",
    //
    //        //uiLayoutParameterKey=================
    //        type:"type",
    //        align:"align",
    //        gravity:"gravity",
    //        normalHorizontal:"normalHorizontal",
    //        normalVertical:"normalVertical",
    //        parentHorizontal:"parentHorizontal",
    //        parentVertical:"parentVertical",
    //        margin:"margin",
    //
    //
    //        //uiTextKey======================
    //        fontName:"fontName",
    //        fontSize:"fontSize",
    //        text:"text",
    //        areaHeight:"areaHeight",
    //        areaWidth:"areaWidth",
    //        hAlignment:"hAlignment",
    //        vAlignment:"vAlignment",
    //
    //        //uiTextAtlasKey============
    //        itemWidth:"itemWidth",
    //        itemHeight:"itemHeight",
    //        startCharMap:"startCharMap",
    //
    //
    //        //uiInputKey=================
    //        passwordEnable:"passwordEnable",
    //        placeHolder:"placeHolder",
    //
    //
    //        //uiPanelKey=================
    //        adaptScreen:"adaptScreen",
    //        bgColor:"bgColor",
    //        bgOpacity:"bgOpacity",
    //        //capInsetsX:"capInsetsX",//TODO 目前没用到
    //        //capInsetsY:"capInsetsY",//TODO 目前没用到
    //        //capInsetsHeight:"capInsetsHeight",//TODO 目前没用到
    //        //capInsetsWidth:"capInsetsWidth",//TODO 目前没用到
    //        clippingEnabled:"clippingEnabled",
    //        layoutType:"layoutType",
    //        vectorX:"vectorX",
    //        vectorY:"vectorY",
    //        //bgScale9Enabled:"bgScale9Enabled",//TODO 目前没用到
    //
    //
    //        //uiScrollViewKey===============
    //        direction:"direction",
    //        innerWidth:"innerWidth",
    //        innerHeight:"innerHeight",
    //
    //        //uiListViewKey============
    //        itemMargin:"itemMargin",
    //
    //        //uiImageKey=======================
    //
    //        //uiLoadingBarKey=================
    //        percent:"percent",
    //
    //
    //        //uiButtonKey======================
    //        scale9Enabled:"scale9Enabled",
    //        normal:"normal",
    //        pressed:"pressed",
    //        disabled:"disabled",
    ////    text:"text",
    ////    fontSize:"fontSize",
    ////    fontName:"fontName",
    //        textColor:"textColor"
    //    };
    var uglifyedKey = {
        "designWidth": "53",
        "designHeight": "58",
        "textures": "35",
        "widgetTree": "51",
        "dataScale": "39",
        "className": "38",
        "name": "4",
        "x": "1",
        "y": "2",
        "width": "11",
        "height": "12",
        "anchorX": "18",
        "anchorY": "19",
        "posType": "24",
        "posPercentX": "56",
        "posPercentY": "57",
        "sizeType": "34",
        "sizePercentX": "59",
        "sizePercentY": "60",
        "zOrder": "17",
        "children": "29",
        "flipX": "9",
        "flipY": "10",
        "opacity": "22",
        "rotation": "33",
        "scaleX": "15",
        "scaleY": "16",
        "touchEnabled": "62",
        "visible": "28",
        "layoutParameter": "68",
        "color": "8",
        "res": "3",
        "scale9Grid": "49",
        "type": "6",
        "align": "7",
        "gravity": "21",
        "normalHorizontal": "69",
        "normalVertical": "64",
        "parentHorizontal": "70",
        "parentVertical": "65",
        "margin": "13",
        "fontName": "31",
        "fontSize": "32",
        "text": "5",
        "areaHeight": "43",
        "areaWidth": "36",
        "hAlignment": "44",
        "vAlignment": "50",
        "itemWidth": "41",
        "itemHeight": "46",
        "startCharMap": "61",
        "passwordEnable": "66",
        "placeHolder": "55",
        "adaptScreen": "52",
        "bgColor": "20",
        "bgOpacity": "37",
        "clippingEnabled": "67",
        "layoutType": "48",
        "vectorX": "26",
        "vectorY": "27",
        "direction": "40",
        "innerWidth": "45",
        "innerHeight": "54",
        "itemMargin": "47",
        "percent": "23",
        "scale9Enabled": "63",
        "normal": "14",
        "pressed": "25",
        "disabled": "30",
        "textColor": "42"
    };
    var normalKey = uglifyedKey; //项目中为了减少混淆直接用压缩版本了
    function getUIKey(uglified) {
        if (uglified === void 0) { uglified = false; }
        return uglified ? uglifyedKey : normalKey;
    }
    mo.getUIKey = getUIKey;
})(mo || (mo = {}));
