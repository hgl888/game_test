var uw;
(function (uw) {
    var CopyChildNode = (function (_super) {
        __extends(CopyChildNode, _super);
        function CopyChildNode() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CopyChildNode.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._starsArr = [];
            self.connectChildren = [];
            self._lvlRequired = 0;
            self._shining = false;
            self._unlocked = false;
            self._starsCount = 0;
            self._passState = 0;
            self._timesToday = 0; // 今天打的次数
            self._timesOverflow = false;
            self._isCream = false; // 是否是精英副本
        };
        /**
         *
         * @param pId 主副本id
         * @param copyInfo 副本配置
         * @param mapInfo 地图配置
         * @param parent
         */
        __egretProto__.init = function (pId, copyInfo, mapInfo, parent) {
            _super.prototype.init.apply(this, arguments);
            this._pCopyId = pId;
            this._copyId = 0;
            var CONFIG_KEY = uw.CopyProgressDataCtrl.CONFIG_KEY;
            //初始化数据
            if (mapInfo) {
                this.setAnchorPoint(0.5, 0.5);
                var height = parent.getSize().height;
                this.setPosition(mapInfo[CONFIG_KEY.pos].x, height - mapInfo[CONFIG_KEY.pos].y);
                this.setTag(mapInfo[CONFIG_KEY.tag]);
            }
            var icon1, cfgIcon = mapInfo[CONFIG_KEY.icon];
            var ui_common = res.ui_common;
            if (copyInfo) {
                this._copyId = copyInfo[uw.t_copy_id];
                this._isLast = !!copyInfo[uw.t_copy_isLast];
                this._lvlRequired = copyInfo[uw.t_copy_lvlRequired];
                this._timesPerDay = copyInfo[uw.t_copy_timesPerDay];
                // 0：普通副本 1：普通BOSS副本 2：精英副本 3：精英BOSS副本
                this._copyType = parseInt(copyInfo[uw.t_copy_type]);
                this._isCream = (this._copyType == uw.c_prop.copyTypeKey.cream || this._copyType == uw.c_prop.copyTypeKey.creamBoss);
                this._isBoss = ((this._copyType % 2) == 1);
                this._relateNormalId = copyInfo[uw.t_copy_normalCopyId];
                // 黄色小图标,一辈只能撸一次啊（太惨了）
                if (this._timesPerDay < 0) {
                    icon1 = ui_common.copy_btn_childsmall03_png;
                }
                // 大图标
                if (this._timesPerDay >= 0) {
                    icon1 = ui_common.copy_btn_childbig02_png;
                }
                // Boss图标
                if (this._isBoss) {
                    icon1 = ui_common.copy_btn_boss02_png;
                }
            }
            else {
                // 黄色小图标,一辈只能撸一次啊
                if (cfgIcon == "small.png") {
                    icon1 = ui_common.copy_btn_childsmall03_png;
                }
                // 大图标
                if (cfgIcon == "mid.png") {
                    icon1 = ui_common.copy_btn_childbig02_png;
                }
                // Boss图标
                if (cfgIcon == "big.png") {
                    icon1 = ui_common.copy_btn_boss02_png;
                }
            }
            this.setDisplayID(mapInfo[CONFIG_KEY.displayID] + "");
            this._iconSprite = mo.UIButton.create();
            this._iconSprite.name = "iconBtn";
            this._iconSprite.setPressedActionEnabled(true);
            this._iconSprite.loadTextures(icon1);
            this._iconSprite.setTouchEnabled(true);
            this._iconSprite.onClick(this.menuShowCopyInfo, this);
            this._iconSprite.setZOrder(100);
            this._iconSprite.setGray(true);
            this.addChild(this._iconSprite);
            this.present();
        };
        __egretProto__.getCopyId = function () {
            return this._copyId;
        };
        __egretProto__.getPCopyId = function () {
            return this._pCopyId;
        };
        __egretProto__.getIconRadius = function () {
            var iconSize = this._iconSprite.getSize(), radius;
            radius = Math.sqrt(iconSize.width * iconSize.width + iconSize.height * iconSize.height) / 2;
            return radius;
        };
        __egretProto__.updateConnection = function () {
            var connectChildren = this.connectChildren, ui_copy = res.ui_copy, connectSprite, diff, connector, angle, unitVec, startPos, endPos, offset1, offset2;
            for (var j = 0; j < connectChildren.length; j++) {
                connectSprite = connectChildren[j];
                unitVec = connectSprite.getPosition().sub(this.getPosition()).normalize();
                offset1 = unitVec.mult(this.getIconRadius());
                offset2 = unitVec.mult(connectSprite.getIconRadius());
                startPos = this.getPosition().add(offset1);
                endPos = connectSprite.getPosition().sub(offset2);
                diff = endPos.sub(startPos);
                connector = mo.UIImage.create();
                connector.loadTexture(ui_copy.copy_icon_connect_png);
                connector.setOpacity(160);
                connector.setScale(0.7);
                connector.setPosition(mo.pAdd(offset1, mo.pMult(diff, 0.5)));
                angle = mo.radiansToDegrees(unitVec.toAngle());
                connector.setRotation(angle);
                this.addChild(connector);
            }
        };
        __egretProto__.isLast = function () {
            return this._isLast;
        };
        __egretProto__.getLvlRequired = function () {
            return this._lvlRequired;
        };
        __egretProto__.setDisplayID = function (displayID) {
            if (displayID == null)
                return;
            this._iconNormal = mo.UITextAtlas.create();
            this._iconNormal.setProperty(displayID, res.levelNum_png, 45, 72, "0");
            this.addChild(this._iconNormal);
            this._iconNormal.setZOrder(110);
        };
        __egretProto__.isLimitedOneTimes = function () {
            return this._timesPerDay == -1;
        };
        __egretProto__.isLimitedTimes = function () {
            return this._timesPerDay > 0;
        };
        __egretProto__.isTimesOverflow = function () {
            if (this.isLimitedOneTimes() && this._passState == 1) {
                return true;
            }
            if (this.isLimitedTimes() && (this._timesToday > this._timesPerDay)) {
                return true;
            }
            return false;
        };
        __egretProto__.setStarCount = function (count) {
            var self = this;
            self._starsCount = count;
            var star;
            if (self._starsArr.length > 0) {
                for (var i = 0; i < self._starsArr.length; i++) {
                    star = self._starsArr[i];
                    star.removeFromParent(true);
                }
                self._starsArr.length = 0;
            }
            if (self._timesPerDay >= 0) {
                var a, b;
                for (var i = 0; i < self._starsCount; i++) {
                    if (self._starsCount == 1) {
                        b = 0;
                        a = 0;
                    }
                    else if (self._starsCount == 2) {
                        b = 0.5;
                        a = 1;
                    }
                    else {
                        b = 1;
                        a = i % 2 == 0 ? 1 : -1;
                    }
                    star = mo.UIImage.create();
                    star.loadTexture(res.ui_common.copy_starformap_png);
                    star.setPosition((i - b) * 50, -(-100 + a * 10));
                    self.addChild(star);
                    star.setZOrder(9999);
                    self._starsArr.push(star);
                }
            }
        };
        __egretProto__._setPassState = function (state) {
            var self = this;
            var ui_common = res.ui_common;
            this._passState = state;
            //已经解锁的副本小节点且只能打一次的
            if (self.isLimitedOneTimes()) {
                if (self._unlocked) {
                    if (self._passState == 0) {
                        // 小红图标
                        self._iconSprite.colorTransform = uw.colorType.none;
                    }
                    else {
                        // 小黄图标
                        self._iconSprite.colorTransform = ColorTransformUtils.getTransform(uw.colorType.copyStateYellow);
                    }
                }
            }
            else {
                self._iconSprite.setGray(!self._unlocked);
            }
        };
        /**
         * 解锁副本
         * @param state 0 未通关 1 已通关
         * @param starsCount
         * @param timesToday
         */
        __egretProto__.unlock = function (state, starsCount, timesToday) {
            if (starsCount === void 0) { starsCount = 0; }
            if (timesToday === void 0) { timesToday = 0; }
            this._unlocked = true;
            if (state == 0) {
                this.getDelegate().addNewestCopy(this);
            }
            this._setPassState(state);
            this.setStarCount(starsCount);
            this._timesToday = timesToday;
            this.present();
        };
        __egretProto__.copyClear = function (starsCount) {
            this.getDelegate().removeNewestCopy(this);
            this._setPassState(1);
            this.setStarCount(starsCount);
            this.present();
        };
        __egretProto__.setShining = function (shine) {
            this._shining = shine;
            this.present();
        };
        __egretProto__._setBright = function (bright) {
            var self = this;
            if (self.isLimitedOneTimes()) {
                if (bright) {
                    if (self._passState == 0) {
                        // 小红图标
                        self._iconSprite.colorTransform = uw.colorType.none;
                    }
                    else {
                        // 小黄图标
                        self._iconSprite.colorTransform = ColorTransformUtils.getTransform(uw.colorType.copyStateYellow);
                    }
                }
            }
            else {
                self._iconSprite.setGray(!bright);
            }
        };
        __egretProto__.present = function () {
            var self = this, unlocked = self._unlocked, ui_copy = res.ui_copy;
            self._setBright(unlocked);
            self._iconSprite.setTouchEnabled(unlocked);
            var circle1 = self._circle1, circle2 = self._circle2;
            if (self._shining) {
                if (!circle1) {
                    circle1 = self._circle1 = mo.UIImage.create();
                    circle1.loadTexture(ui_copy.copy_ntc_circle_png);
                    self.addChild(circle1);
                    circle1.setZOrder(100);
                    circle2 = self._circle2 = mo.UIImage.create();
                    circle2.loadTexture(ui_copy.copy_ntc_circle_png);
                    self.addChild(circle2);
                    circle2.setZOrder(100);
                }
                else {
                    circle1.stopAllActions();
                    circle2.stopAllActions();
                }
                circle1.setScale(0.5);
                circle1.setOpacity(255);
                circle2.setScale(0.5);
                circle2.setOpacity(255);
                circle2.setVisible(false);
                var seq = mo.sequence(mo.spawn(mo.scaleTo(1.5, 1.5), mo.fadeOut(1.5)), mo.callFunc(function (sender) {
                    sender.setScale(0.5);
                    sender.setOpacity(255);
                }, this));
                circle1.runAction(mo.repeatForever(seq));
                circle2.runAction(mo.sequence(mo.delayTime(0.5), mo.callFunc(function (sender) {
                    sender.setVisible(true);
                    sender.runAction(mo.repeatForever(seq.clone()));
                }, self)));
            }
            else {
                if (circle1) {
                    circle1.removeFromParent(true);
                    circle2.removeFromParent(true);
                    self._circle1 = null;
                    self._circle2 = null;
                }
            }
        };
        /**
         *  进入副本信息界面前的检查
         * @returns {boolean}
         * @private
         */
        __egretProto__._checkEnterCopyCondition = function () {
            var self = this;
            // 检查可以打次数是否超出
            if (this.isTimesOverflow()) {
                if (this.isLimitedOneTimes()) {
                    mo.showMsg(uw.id_c_msgCode.enterCopyOnlyOnce);
                    return false;
                }
            }
            // 精英副本还需要检查对应的"普通子副本"是否通关，以及剩余挑战次数
            if (self._copyType == uw.c_prop.copyTypeKey.cream || self._copyType == uw.c_prop.copyTypeKey.creamBoss) {
                var normCopyId = self._relateNormalId;
                if (!uw.userDataCtrl.isCopyPassed(normCopyId)) {
                    mo.showMsg(uw.id_c_msgCode.easyNoPast);
                    return false;
                }
            }
            return true;
        };
        __egretProto__.menuShowCopyInfo = function (event) {
            if (this._checkEnterCopyCondition()) {
                this.getDelegate().showCopyInfo(this);
            }
        };
        __egretProto__.getNextCopyId = function () {
            return this._copyId + 1;
        };
        CopyChildNode.__className = "CopyChildNode";
        return CopyChildNode;
    })(mo.UIWidget);
    uw.CopyChildNode = CopyChildNode;
    CopyChildNode.prototype.__class__ = "uw.CopyChildNode";
})(uw || (uw = {}));
