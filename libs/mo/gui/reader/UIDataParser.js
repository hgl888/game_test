var mo;
(function (mo) {
    var UIDataParser = (function (_super) {
        __extends(UIDataParser, _super);
        function UIDataParser() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIDataParser.prototype;
        //@override
        __egretProto__._onLoadFinish = function (event) {
            var self = this;
            var loader = (event.target);
            var itemInfo = self._itemInfoDic[loader.hashCode];
            var data = loader.data;
            delete self._itemInfoDic[loader.hashCode];
            self._recycler.push(loader);
            var resCfgItem = itemInfo.item;
            var compFunc = itemInfo.cb;
            if (event.type == egret.Event.COMPLETE) {
                var uiRootData = self._parse(resCfgItem, data);
                var dirPath = path.dirname(resCfgItem.url);
                var resArr = [];
                var textures = uiRootData.textures;
                for (var i = 0, li = textures.length; i < li; ++i) {
                    var texture = textures[i];
                    var extname = path.extname(texture);
                    //如果是打包图，则希望通过预加载好了才进来
                    //if(extname && extname.toLocaleLowerCase() == ".sheet") continue;
                    var url = path.join(dirPath, texture);
                    var rci = res.getResCfgItem(url);
                    rci.notToModule = true;
                    if (extname && extname.toLocaleLowerCase() == ".sheet") {
                        rci.name = path.basename(texture, extname);
                    }
                    else
                        rci.name = texture;
                    resArr.push(rci);
                }
                res.load(resArr, function () {
                    var result = res._cache(resCfgItem, uiRootData);
                    compFunc.call(itemInfo.ctx, result, resCfgItem);
                });
            }
            else {
                self._handleError(event, resCfgItem);
                compFunc.call(itemInfo.ctx, null, resCfgItem);
            }
        };
        __egretProto__.unload = function (data, resCfgItem) {
            var url = resCfgItem.url;
            res.debug("unload--->【%s】", url);
            if (data && data.textures) {
                var resArr = [];
                var textures = data.textures;
                var dirPath = path.dirname(url);
                for (var i = 0, li = textures.length; i < li; ++i) {
                    resArr.push(path.join(dirPath, textures[i]));
                }
                res.unload(resArr);
            }
        };
        //@override
        __egretProto__._parse = function (resCfgItem, parseResult) {
            //这里对解析结果进行缓存操作，将缓存的数据返回
            parseResult = _super.prototype._parse.call(this, resCfgItem, parseResult);
            return this._parseUIRootData(parseResult);
        };
        __egretProto__._parseChildren = function (data, uiKey, uiData) {
            var children = uiData.children = [];
            var childrenData = data[uiKey.children];
            if (!childrenData)
                return;
            for (var i = 0, li = childrenData.length; i < li; ++i) {
                children.push(this._parseWidgetData(childrenData[i], uiKey));
            }
        };
        __egretProto__._parseUIRootData = function (data) {
            var rootData = new mo.UIRootData();
            var uiKey = mo.getUIKey(data["widgetTree"] == null);
            rootData.dataScale = data[uiKey.dataScale] == null ? rootData.dataScale : data[uiKey.dataScale];
            rootData.designWidth = mo.project.design.width;
            rootData.designHeight = mo.project.design.height;
            rootData.textures = data[uiKey.textures] || [];
            rootData.widgetTree = this._parseWidgetData(data[uiKey.widgetTree], uiKey);
            return rootData;
        };
        __egretProto__._parseLayoutParameter = function (data, uiKey) {
            var uiData = new mo.UILayoutParameter();
            uiData.type = data[uiKey.type] == null ? uiData.type : data[uiKey.type];
            uiData.align = data[uiKey.align] == null ? uiData.align : data[uiKey.align];
            uiData.gravity = data[uiKey.gravity] == null ? uiData.gravity : data[uiKey.gravity];
            //            uiData.eageType = data[uiKey.eageType] == null ? uiData.eageType : data[uiKey.eageType];//TODO
            uiData.normalHorizontal = data[uiKey.normalHorizontal] == null ? uiData.normalHorizontal : data[uiKey.normalHorizontal];
            uiData.normalVertical = data[uiKey.normalVertical] == null ? uiData.normalVertical : data[uiKey.normalVertical];
            uiData.parentHorizontal = data[uiKey.parentHorizontal] == null ? uiData.parentHorizontal : data[uiKey.parentHorizontal];
            uiData.parentVertical = data[uiKey.parentVertical] == null ? uiData.parentVertical : data[uiKey.parentVertical];
            uiData.margin = data[uiKey.margin] == null ? uiData.margin : data[uiKey.margin];
            return uiData;
        };
        //widget基础数据解析
        __egretProto__._parseBaseUIWidgetData = function (data, uiKey, uiData) {
            //UIWidgetData公共部分
            uiData.className = data[uiKey.className] == null ? uiData.className : data[uiKey.className];
            uiData.name = data[uiKey.name] == null ? uiData.name : data[uiKey.name];
            uiData.x = data[uiKey.x] == null ? uiData.x : data[uiKey.x];
            uiData.y = data[uiKey.y] == null ? uiData.y : data[uiKey.y];
            uiData.width = data[uiKey.width] == null ? uiData.width : data[uiKey.width];
            uiData.height = data[uiKey.height] == null ? uiData.height : data[uiKey.height];
            uiData.anchorX = data[uiKey.anchorX] == null ? uiData.anchorX : data[uiKey.anchorX];
            uiData.anchorY = data[uiKey.anchorY] == null ? uiData.anchorY : data[uiKey.anchorY];
            //uiData.ignoreSize = data[uiKey.ignoreSize] == null ? uiData.ignoreSize : data[uiKey.ignoreSize];//TODO 目前没用
            uiData.posType = data[uiKey.posType] == null ? uiData.posType : data[uiKey.posType];
            uiData.posPercentX = data[uiKey.posPercentX] == null ? uiData.posPercentX : data[uiKey.posPercentX];
            uiData.posPercentY = data[uiKey.posPercentY] == null ? uiData.posPercentY : data[uiKey.posPercentY];
            uiData.sizeType = data[uiKey.sizeType] == null ? uiData.sizeType : data[uiKey.sizeType];
            uiData.sizePercentX = data[uiKey.sizePercentX] == null ? uiData.sizePercentX : data[uiKey.sizePercentX];
            uiData.sizePercentY = data[uiKey.sizePercentY] == null ? uiData.sizePercentY : data[uiKey.sizePercentY];
            uiData.zOrder = data[uiKey.zOrder] == null ? uiData.zOrder : data[uiKey.zOrder];
            //uiData.colorType = data[uiKey.colorType] == null ? uiData.colorType : data[uiKey.colorType];//TODO 目前没用
            uiData.color = data[uiKey.color] == null ? uiData.color : data[uiKey.color];
            //uiData.customProperty = data[uiKey.customProperty] == null ? uiData.customProperty : data[uiKey.customProperty];//TODO 目前没用
            uiData.flipX = data[uiKey.flipX] == null ? uiData.flipX : data[uiKey.flipX];
            uiData.flipY = data[uiKey.flipY] == null ? uiData.flipY : data[uiKey.flipY];
            uiData.opacity = data[uiKey.opacity] == null ? uiData.opacity : data[uiKey.opacity];
            uiData.rotation = data[uiKey.rotation] == null ? uiData.rotation : data[uiKey.rotation];
            uiData.scaleX = data[uiKey.scaleX] == null ? uiData.scaleX : data[uiKey.scaleX];
            uiData.scaleY = data[uiKey.scaleY] == null ? uiData.scaleY : data[uiKey.scaleY];
            uiData.scale9Enabled = data[uiKey.scale9Enabled] == null ? uiData.scale9Enabled : data[uiKey.scale9Enabled];
            //uiData.scaleWidth = data[uiKey.scaleWidth] == null ? uiData.scaleWidth : data[uiKey.scaleWidth];//TODO 目前没用
            //uiData.scaleHeight = data[uiKey.scaleHeight] == null ? uiData.scaleHeight : data[uiKey.scaleHeight];//TODO 目前没用
            uiData.touchEnabled = data[uiKey.touchEnabled] == null ? uiData.touchEnabled : data[uiKey.touchEnabled];
            uiData.visible = data[uiKey.visible] == null ? uiData.visible : data[uiKey.visible];
            uiData.res = data[uiKey.res] == null ? uiData.res : data[uiKey.res];
            if (data[uiKey.layoutParameter])
                uiData.layoutParameter = this._parseLayoutParameter(data[uiKey.layoutParameter], uiKey);
            this._parseChildren(data, uiKey, uiData);
            return uiData;
        };
        //9宫格相关数据解析
        __egretProto__._parseUIScale9Data = function (data, uiKey, uiData) {
            uiData.scale9Enabled = data[uiKey.scale9Enabled] == null ? uiData.scale9Enabled : data[uiKey.scale9Enabled];
            uiData.scale9Grid = data[uiKey.scale9Grid] == null ? uiData.scale9Grid : data[uiKey.scale9Grid];
            this._parseBaseUIWidgetData(data, uiKey, uiData);
            return uiData;
        };
        __egretProto__._parseUITextData = function (data, uiKey, uiData) {
            uiData.fontName = data[uiKey.fontName] == null ? uiData.fontName : data[uiKey.fontName];
            uiData.fontSize = data[uiKey.fontSize] == null ? uiData.fontSize : data[uiKey.fontSize];
            uiData.text = data[uiKey.text] == null ? uiData.text : data[uiKey.text];
            uiData.areaHeight = data[uiKey.areaHeight] == null ? uiData.areaHeight : data[uiKey.areaHeight];
            uiData.areaWidth = data[uiKey.areaWidth] == null ? uiData.areaWidth : data[uiKey.areaWidth];
            uiData.hAlignment = data[uiKey.hAlignment] == null ? uiData.hAlignment : data[uiKey.hAlignment];
            uiData.vAlignment = data[uiKey.vAlignment] == null ? uiData.vAlignment : data[uiKey.vAlignment];
            //uiData.touchScaleEnable = data[uiKey.touchScaleEnable] == null ? uiData.touchScaleEnable : data[uiKey.touchScaleEnable];//TODO 目前没用
            this._parseBaseUIWidgetData(data, uiKey, uiData);
            return uiData;
        };
        __egretProto__._parseUTextAtlasData = function (data, uiKey, uiData) {
            uiData.itemWidth = data[uiKey.itemWidth] == null ? uiData.itemWidth : data[uiKey.itemWidth];
            uiData.itemHeight = data[uiKey.itemHeight] == null ? uiData.itemHeight : data[uiKey.itemHeight];
            uiData.startCharMap = data[uiKey.startCharMap] == null ? uiData.startCharMap : data[uiKey.startCharMap];
            this._parseUITextData(data, uiKey, uiData);
            return uiData;
        };
        __egretProto__._parseUIInputData = function (data, uiKey, uiData) {
            uiData.passwordEnable = data[uiKey.passwordEnable] == null ? uiData.passwordEnable : data[uiKey.passwordEnable];
            uiData.placeHolder = data[uiKey.placeHolder] == null ? uiData.placeHolder : data[uiKey.placeHolder];
            this._parseUITextData(data, uiKey, uiData);
            return uiData;
        };
        //图片数据解析
        __egretProto__._parseUIImageData = function (data, uiKey, uiData) {
            this._parseUIScale9Data(data, uiKey, uiData);
            return uiData;
        };
        //图片数据解析
        __egretProto__._parseUILoadingBarData = function (data, uiKey, uiData) {
            uiData.direction = data[uiKey.direction] == null ? uiData.direction : data[uiKey.direction];
            uiData.percent = data[uiKey.percent] == null ? uiData.percent : data[uiKey.percent];
            this._parseUIScale9Data(data, uiKey, uiData);
            return uiData;
        };
        //button数据解析
        __egretProto__._parseUIButtonData = function (data, uiKey, uiData) {
            uiData.normal = data[uiKey.normal];
            uiData.pressed = data[uiKey.pressed];
            uiData.disabled = data[uiKey.disabled];
            if (uiData.normal && !uiData.pressed) {
                uiData.pressed = uiData.normal;
                uiData.pressedActionEnabled = true;
            }
            uiData.text = data[uiKey.text] == null ? uiData.text : data[uiKey.text];
            uiData.textColor = data[uiKey.textColor] == null ? uiData.textColor : data[uiKey.textColor];
            uiData.fontName = data[uiKey.fontName] == null ? uiData.fontName : data[uiKey.fontName];
            uiData.fontSize = data[uiKey.fontSize] == null ? uiData.fontSize : data[uiKey.fontSize];
            this._parseUIScale9Data(data, uiKey, uiData);
            return uiData;
        };
        __egretProto__._parseUIPanelData = function (data, uiKey, uiData) {
            uiData.layoutParameter = data[uiKey.layoutParameter] == null ? uiData.layoutParameter : data[uiKey.layoutParameter];
            uiData.adaptScreen = data[uiKey.adaptScreen] == null ? uiData.adaptScreen : data[uiKey.adaptScreen];
            uiData.res = data[uiKey.res] == null ? uiData.res : data[uiKey.res];
            uiData.bgColor = data[uiKey.bgColor] == null ? uiData.bgColor : data[uiKey.bgColor];
            uiData.bgOpacity = data[uiKey.bgOpacity] == null ? uiData.bgOpacity : data[uiKey.bgOpacity];
            //uiData.bgStartColor = data[uiKey.bgStartColor] == null ? uiData.bgStartColor : data[uiKey.bgStartColor];//TODO 目前没用
            //uiData.bgEndColor = data[uiKey.bgEndColor] == null ? uiData.bgEndColor : data[uiKey.bgEndColor];//TODO 目前没用
            uiData.clippingEnabled = data[uiKey.clippingEnabled] == null ? uiData.clippingEnabled : data[uiKey.clippingEnabled];
            uiData.layoutType = data[uiKey.layoutType] == null ? uiData.layoutType : data[uiKey.layoutType];
            uiData.vectorX = data[uiKey.vectorX] == null ? uiData.vectorX : data[uiKey.vectorX];
            uiData.vectorY = data[uiKey.vectorY] == null ? uiData.vectorY : data[uiKey.vectorY];
            this._parseUIScale9Data(data, uiKey, uiData);
            this._parseBaseUIWidgetData(data, uiKey, uiData);
            return uiData;
        };
        __egretProto__._parseUIScrollViewData = function (data, uiKey, uiData) {
            uiData.direction = data[uiKey.direction] == null ? uiData.direction : data[uiKey.direction];
            uiData.innerWidth = data[uiKey.innerWidth] == null ? uiData.innerWidth : data[uiKey.innerWidth];
            uiData.innerHeight = data[uiKey.innerHeight] == null ? uiData.innerHeight : data[uiKey.innerHeight];
            this._parseUIPanelData(data, uiKey, uiData);
            return uiData;
        };
        __egretProto__._parseUIListViewData = function (data, uiKey, uiData) {
            uiData.direction = data[uiKey.direction] == null ? uiData.direction : data[uiKey.direction];
            uiData.gravity = data[uiKey.gravity] == null ? uiData.gravity : data[uiKey.gravity];
            uiData.itemMargin = data[uiKey.itemMargin] == null ? uiData.itemMargin : data[uiKey.itemMargin];
            this._parseUIScrollViewData(data, uiKey, uiData);
            return uiData;
        };
        __egretProto__._parseUIPageViewData = function (data, uiKey, uiData) {
            this._parseUIPanelData(data, uiKey, uiData);
            return uiData;
        };
        __egretProto__._parseWidgetData = function (data, uiKey) {
            var className = data[uiKey.className];
            switch (className) {
                case mo.UIText.__className:
                    return this._parseUITextData(data, uiKey, new mo.UITextData());
                case mo.UITextAtlas.__className:
                    return this._parseUTextAtlasData(data, uiKey, new mo.UITextAtlasData());
                case mo.UIInput.__className:
                    return this._parseUIInputData(data, uiKey, new mo.UIInputData());
                case mo.UIImage.__className:
                    return this._parseUIImageData(data, uiKey, new mo.UIImageData());
                case mo.UIButton.__className:
                    return this._parseUIButtonData(data, uiKey, new mo.UIButtonData());
                case mo.UILoadingBar.__className:
                    return this._parseUILoadingBarData(data, uiKey, new mo.UILoadingBarData());
                case mo.UIPanel.__className:
                    return this._parseUIPanelData(data, uiKey, new mo.UIPanelData());
                case mo.UIScrollView.__className:
                    return this._parseUIScrollViewData(data, uiKey, new mo.UIScrollViewData());
                case mo.UIListView.__className:
                    return this._parseUIListViewData(data, uiKey, new mo.UIListViewData());
                case mo.UIPageView.__className:
                    return this._parseUIPageViewData(data, uiKey, new mo.UIPageViewData());
            }
            mo.warn("未找到【%s】类型的ui数据解析器！", className);
            return null;
        };
        //@override
        UIDataParser.TYPE = "ui";
        return UIDataParser;
    })(res.JsonParser);
    mo.UIDataParser = UIDataParser;
    UIDataParser.prototype.__class__ = "mo.UIDataParser";
    res.registerParser(UIDataParser, "ui");
})(mo || (mo = {}));
