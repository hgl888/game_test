/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ResBarLayer = (function (_super) {
        __extends(ResBarLayer, _super);
        function ResBarLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ResBarLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiResBarLayer_ui;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            self._labGold = self.getWidgetByName("labGold");
            self._labDiamond = self.getWidgetByName("labDiamond");
            self._labStrength = self.getWidgetByName("labStrength");
            var strengthInfo = self.getWidgetByName("strengthInfo");
            strengthInfo.setVisible(false);
            strengthInfo.setAnchorPoint(0, 0);
            strengthInfo.setPositionY(strengthInfo.getPositionY() - 440);
            uw.setGoldColor(self, "labGold");
            uw.setDiamondColor(self, "labDiamond");
            self.onClickByName("btnGold", self.menuGold, self);
            self.onClickByName("btnDiamond", self.menuDiamond, self);
            self.onClickByName("btnAddIcon", self.menuStrength, self);
            var btnShowStrength = self.getWidgetByName("btnShowStrength");
            btnShowStrength.addEventListener(mo.TouchEvent.NODE_BEGIN, self.showStrengthInfoBegan, self);
            btnShowStrength.addEventListener(mo.TouchEvent.NODE_END, self.showStrengthInfoEnd, self);
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.gold.toString(), self.setGold);
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.diamond.toString(), self.setDiamond);
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.strength.toString(), self.setStrength);
            var info = uw.userDataCtrl;
            self.setGold(info.getGold());
            self.setDiamond(info.getDiamond());
            self.setStrength();
        };
        __egretProto__.setStrengthTipsInfo = function () {
            var self = this, userDataCtrl = uw.userDataCtrl;
            var c_vip = mo.getJSONWithFileName(uw.cfg_c_vip);
            var todayBuyCount = userDataCtrl.getBuyStrengthCount();
            var todayTotalCount = c_vip[userDataCtrl.getVip()][uw.c_vip_strengthCount];
            var totalTimeStamp = userDataCtrl.get(uw.dsConsts.UserEntity.strengthReTime).getTime();
            var interval = userDataCtrl.strengthReplayInterval;
            var curStrength = userDataCtrl.getStrength();
            var maxStrength = userDataCtrl.getMaxStrength();
            self.formatByName("strengthCount", todayBuyCount, todayTotalCount);
            //体力满了啊亲
            var nextTimeStamp;
            if (curStrength >= maxStrength) {
                self.setVisibleByName("nextTime", false);
                self.setVisibleByName("totalTime", false);
                self.setVisibleByName("interval", false);
                self.setVisibleByName("nextTimeTxt", false);
                self.setVisibleByName("totalTimeTxt", false);
                self.setVisibleByName("strengthFull", true);
                self.setSizeByName("strengthInfo", 820, 250);
            }
            else {
                self.setVisibleByName("nextTime", true);
                self.setVisibleByName("totalTime", true);
                self.setVisibleByName("interval", true);
                self.setVisibleByName("nextTimeTxt", true);
                self.setVisibleByName("totalTimeTxt", true);
                self.setVisibleByName("strengthFull", false);
                self.setSizeByName("strengthInfo", 820, 440);
                self.formatByName("interval", interval / 60 / 1000);
                nextTimeStamp = totalTimeStamp - (maxStrength - curStrength - 1) * interval;
                var now = Date.now();
                if (nextTimeStamp > now) {
                    self._nextTimeInv = self.countdownToEndTimeByName("nextTime", nextTimeStamp, function () {
                        self.setStrengthTipsInfo();
                    }, null);
                }
                else {
                    self.setInfoByName("nextTime", "00:00");
                }
                if (totalTimeStamp > now) {
                    self._totalTimeInv = self.countdownToEndTimeByName("totalTime", totalTimeStamp, function () {
                        self.setStrengthTipsInfo();
                    }, null);
                }
                else {
                    self.setInfoByName("totalTime", "00:00");
                }
            }
        };
        __egretProto__.showStrengthInfoBegan = function (event) {
            var self = this;
            self.setVisibleByName("strengthInfo", true);
            self.setStrengthTipsInfo();
        };
        __egretProto__.showStrengthInfoEnd = function (event) {
            var self = this;
            self.setVisibleByName("strengthInfo", false);
            if (self._nextTimeInv) {
                mo.timer.removeInvocation(self._nextTimeInv);
                self._nextTimeInv = null;
            }
            if (self._totalTimeInv) {
                mo.timer.removeInvocation(self._totalTimeInv);
                self._totalTimeInv = null;
            }
        };
        __egretProto__.showLayer = function () {
            var self = this;
            //        self._super();
            self.setTouchEnabledByName("btnGold", true);
            self.setTouchEnabledByName("btnDiamond", true);
            self.setTouchEnabledByName("btnStrength", true);
        };
        __egretProto__.hideLayer = function () {
            var self = this;
            //        self._super();
            self.setTouchEnabledByName("btnGold", false);
            self.setTouchEnabledByName("btnDiamond", false);
            self.setTouchEnabledByName("btnStrength", false);
        };
        __egretProto__.setGold = function (goldNum) {
            var self = this;
            self._labGold.setText(goldNum);
            var goldNumStr = goldNum + "";
            var len = goldNumStr.length, fontSize;
            if (len > 8) {
                fontSize = 60;
            }
            else if (len <= 8) {
                fontSize = 68;
            }
            self._labGold.setFontSize(fontSize);
        };
        __egretProto__.setDiamond = function (diamondNum) {
            var self = this;
            self._labDiamond.setText(diamondNum);
            var diamondNumStr = diamondNum + "";
            var len = diamondNumStr.length, fontSize;
            if (len > 8) {
                fontSize = 60;
            }
            else if (len <= 8) {
                fontSize = 68;
            }
            self._labDiamond.setFontSize(fontSize);
        };
        __egretProto__.setStrength = function () {
            //modify by zxj 这里比较特殊，需要用get方法获取
            var self = this;
            var curStrength = uw.userDataCtrl.getStrength();
            var maxStrength = uw.userDataCtrl.getMaxStrength();
            var totalStr = curStrength + "/" + maxStrength;
            self._labStrength.setText(totalStr);
            var len = totalStr.length, fontSize;
            if (len > 8) {
                fontSize = 60;
            }
            else if (len <= 8) {
                fontSize = 68;
            }
            self._labStrength.setFontSize(fontSize);
        };
        __egretProto__.menuGold = function (sender) {
            uw.pushSubModule(uw.SubModule.Alchemy);
        };
        __egretProto__.menuDiamond = function (sender) {
            uw.pushSubModule(uw.SubModule.Charge);
        };
        __egretProto__.menuStrength = function (sender) {
            //cc.log("呵呵，冲体力啦");
            uw.userDataCtrl.showBuyStrength();
        };
        ResBarLayer.__className = "ResBarLayer";
        return ResBarLayer;
    })(mo.MenuLayer);
    uw.ResBarLayer = ResBarLayer;
    ResBarLayer.prototype.__class__ = "uw.ResBarLayer";
})(uw || (uw = {}));
