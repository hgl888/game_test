var uw;
(function (uw) {
    var FightHeroRole = (function (_super) {
        __extends(FightHeroRole, _super);
        function FightHeroRole() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightHeroRole.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._fightOption = new uw._FightHeroRoleNodeOption();
            //self.setCascadeOpacityEnabled(true);
            self._fightOption._effectTextArr = [];
            self._fightOption._skillEffectArr = [];
            self._fightOption._shadow = mo.UIImage.create();
            self._fightOption._shadow.loadTexture(res.ui_common.shadow_png);
            self._fightOption._shadow.setOpacity(200);
            self._fightOption._shadow.zOrder = uw.roleZOrder.SHADOW;
            self.addChild(self._fightOption._shadow);
        };
        __egretProto__.initWithData = function (tempId, isSelf, cb) {
            var self = this;
            self._fightOption._tempId = tempId;
            self._fightOption._isSelf = isSelf;
            self._fightOption._isHero = tempId < 10000;
            self._cb = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (!self._fightOption._bloodProgress) {
                    var statePos = self.getStatePos();
                    var bloodProgress = uw.FightHeroHaemalStrand.create(self.getIsSelf());
                    bloodProgress.setPosition(mo.pAdd(statePos, mo.p(0, -30)));
                    bloodProgress.setDelegate(this);
                    bloodProgress.reset();
                    self.addChild(bloodProgress);
                    bloodProgress.zOrder = uw.roleZOrder.BLOOD;
                    this._fightOption._bloodProgress = bloodProgress;
                }
                cb.apply(null, args);
            };
            self._createArmature();
        };
        __egretProto__.setFightPosition = function (x, y) {
            var fightOrigin = uw.fightUtils.originPos;
            this.setPosition(x, fightOrigin.y - y);
        };
        __egretProto__.getIsSelf = function () {
            return this._fightOption._isSelf;
        };
        __egretProto__.getTempId = function () {
            return this._fightOption._tempId;
        };
        __egretProto__.getIsHero = function () {
            return this._fightOption._isHero;
        };
        __egretProto__.setStatePos = function (p) {
            this._fightOption._statePos.x = p.x;
            this._fightOption._statePos.y = p.y;
        };
        __egretProto__.getStatePos = function () {
            return this._fightOption._statePos;
        };
        __egretProto__.getBodyPos = function () {
            return this._fightOption._bodyPos;
        };
        __egretProto__.getHeadPos = function () {
            return this._fightOption._headPos;
        };
        __egretProto__.getFootPos = function () {
            return mo.p(0, 0);
        };
        __egretProto__.getBodyWorldPos = function () {
            return this.localToGlobal(0, 0, this._fightOption._bodyPos);
        };
        __egretProto__.getHeadWorldPos = function () {
            return this.localToGlobal(0, 0, this._fightOption._headPos);
        };
        __egretProto__.getFootWorldPos = function () {
            return this.getPosition();
        };
        __egretProto__.getHeroArmature = function () {
            return this._fightOption._heroArmature;
        };
        __egretProto__.shakeShadow = function () {
            var self = this;
            var scale = self._fightOption._heroArmature.width / self._fightOption._shadow.width;
            self._fightOption._shadow.setScale(scale, scale);
            //设置脚底的影子比例
            //todo m  先注释掉,在native下降5帧啊。。。
            /*var self = this;
            this._fightOption._shadow.stopAllActions();

            var scale = self._fightOption._heroArmature.width / self._fightOption._shadow.width;
            var seq = mo.repeatForever(
                mo.sequence(
                    mo.scaleTo(1, scale * 0.8),
                    mo.scaleTo(1, scale * 0.7)
                )
            );
            self._fightOption._shadow.runAction(seq);*/
        };
        __egretProto__.hideShadow = function () {
            this._fightOption._shadow.stopAllActions();
            var seq = mo.spawn(mo.fadeTo(0.08, 0), mo.scaleTo(0.08, 0.3));
            this._fightOption._shadow.runAction(seq);
        };
        __egretProto__.addEffectText = function (bloodNode, zOrder) {
            zOrder = zOrder == null ? 999 : zOrder;
            this._fightOption._effectTextArr.push(bloodNode);
            this.addChild(bloodNode);
            bloodNode.zOrder = zOrder;
        };
        __egretProto__.removeEffectText = function (bloodNode) {
            mo.ArrayRemoveObject(this._fightOption._effectTextArr, bloodNode);
            bloodNode.removeFromParent(true);
        };
        __egretProto__.removeAllEffectText = function () {
            var self = this, text;
            for (var i = 0, len = self._fightOption._effectTextArr.length; i < len; i++) {
                text = self._fightOption._effectTextArr[i];
                text.removeFromParent(true);
            }
            self._fightOption._effectTextArr.length = 0;
        };
        __egretProto__.removeAllSkillEffect = function () {
            var self = this, skillEffect;
            for (var i = 0, len = self._fightOption._skillEffectArr.length; i < len; i++) {
                skillEffect = self._fightOption._skillEffectArr[i];
                skillEffect.removeFromParent();
            }
            self._fightOption._skillEffectArr.length = 0;
        };
        __egretProto__.addBloodProgress = function (oldHP, newHP, totleHP) {
            if (!this._fightOption._bloodProgress)
                return;
            this._fightOption._bloodProgress.showBlood(oldHP, newHP, totleHP);
        };
        __egretProto__.removeBloodProgress = function () {
            if (this._fightOption._bloodProgress) {
                this._fightOption._bloodProgress.removeFromParent();
                this._fightOption._bloodProgress = null;
            }
        };
        __egretProto__._addHeroEffect = function (effectName) {
            //todo ts
            /*var _heroEffect = uw.FightHeroEffectFactory.getInstance().produce(effectName);
            _heroEffect.zOrder = 999;
            return _heroEffect;*/
        };
        __egretProto__.addCharm = function (charmName) {
            var _charmMap = this._fightOption._charmMap;
            if (!_charmMap) {
                _charmMap = this._fightOption._charmMap = {};
            }
            this.removeCharm(charmName);
            var _charmEffect = uw.FightHeroCharm.create(charmName);
            _charmEffect.setZOrder(uw.roleZOrder.SHADOW + 1);
            this.addChild(_charmEffect);
            _charmMap[charmName] = _charmEffect;
        };
        __egretProto__.removeCharm = function (charmName) {
            var _charmMap = this._fightOption._charmMap;
            if (!_charmMap)
                return;
            var _charmEffect = _charmMap[charmName];
            if (_charmEffect) {
                _charmEffect.removeSelf();
                delete _charmMap[charmName];
            }
        };
        __egretProto__.removeAllCharm = function () {
            var _charmMap = this._fightOption._charmMap, _charmEffect;
            if (!_charmMap)
                return;
            for (var key in _charmMap) {
                _charmEffect = _charmMap[key];
                _charmEffect.removeSelf();
                delete _charmMap[key];
            }
        };
        __egretProto__._createArmature = function () {
            var self = this;
            //创建人物
            var tid = uw.getWarriorByTempId(self._fightOption._tempId)[uw.t_warrior_id];
            var arm = uw.roleArmFactory.attachDynamicNodeTo(this, tid, null, function (sender) {
                //在不需要翻转白名单里的资源不翻转
                if (self.getIsSelf()) {
                    self.forward(false);
                }
                else {
                    self.forward(true);
                }
                self.steady();
                self._calShadowPos();
                self._setWidth(1);
                self._setHeight(1);
                if (self._cb && !uw.Fight.isExit) {
                    self._cb(self);
                }
            }, self);
            arm.scaleX = 1;
            arm.scaleY = 1;
            arm.zOrder = uw.roleZOrder.ARMATURE;
            self._fightOption._originalArmature = arm;
            self._fightOption._heroArmature = arm;
        };
        //重新计算阴影，身体位置
        __egretProto__._calShadowPos = function () {
            var self = this, sender = self._fightOption._heroArmature;
            var headConfig = sender.getBoneConfig(uw.Fight.HeroBodykey.head);
            var bodyConfig = sender.getBoneConfig(uw.Fight.HeroBodykey.body);
            //动作已经结束时，坑爹的armature获取不到 render
            if (!headConfig || !bodyConfig) {
                return;
            }
            self._fightOption._headPos = mo.p(headConfig[0], headConfig[1]);
            self._fightOption._bodyPos = mo.p(bodyConfig[0], bodyConfig[1]);
            var headHeight = headConfig[3];
            self._fightOption._statePos = mo.p(0, self._fightOption._headPos.y - headHeight);
            self.shakeShadow();
        };
        __egretProto__._isNotInWhiteList = function (name) {
            return this.__class.armatureWhiteList.indexOf(name) == -1;
        };
        __egretProto__.clearStatus = function (isClearWithoutAnimation) {
            var self = this;
            //移除掉血的值
            self.removeAllEffectText();
            //移除技能特效
            self.removeAllSkillEffect();
            //移除各种状态啊
            //        self.setUpState(false);
            //        self.setDownState(false);
            self.setStun(false);
            self.setFreeze(false);
            self.setStone(false);
            self.setMagicShield(false);
            self.setMagicShield1(false);
            self.setMagicShield2(false);
            self.setPhysicsShield(false);
            self.setChaos(false);
            self.setCurse(false);
            self.setPoison(false);
            self.setBlind(false);
            self.setDKShield(false);
            self.setSheep(false);
            //        self.setBounce(false);
            self.setDefend(false);
            self.setLimitMove(false);
            self.setMirror(false);
            self.setCrow(false);
            self.setBackShadow(false);
            //移除晕眩
            //self.removeStunEffect();
        };
        __egretProto__.removeFromParent = function () {
            var self = this;
            if (!self._fightOption._heroArmature)
                return;
            //移除所有状态
            self.clearStatus(true);
            //移除血条啊哥
            self.removeBloodProgress();
            //移除人物armature动画
            if (self._fightOption._heroArmature) {
                self._fightOption._heroArmature.removeFromParent();
                self._fightOption._heroArmature = null;
            }
            if (self._fightOption._originalArmature) {
                self._fightOption._originalArmature.removeFromParent();
                self._fightOption._originalArmature = null;
            }
            if (self._fightOption._crowArmature) {
                self._fightOption._crowArmature.removeFromParent();
                self._fightOption._crowArmature = null;
            }
            _super.prototype.removeFromParent.call(this);
            /* for(var key in self){
                 delete self[key];
             }*/
        };
        __egretProto__.reset = function () {
            var self = this;
            //设置可见和透明
            self.setVisible(true);
            self.setOpacity(255);
        };
        /**
         * 待机动作
         */
        __egretProto__.steady = function () {
            this.playAnimation(uw.Fight.HeroAction.steady);
        };
        /**
         * 释法动作
         */
        __egretProto__.chant = function () {
            this.playAnimation(uw.Fight.HeroAction.chant);
        };
        /**
         * 跳跃
         */
        __egretProto__.jump = function () {
            this.playAnimation(uw.Fight.HeroAction.jump);
        };
        /**
         * 跑
         */
        __egretProto__.run = function () {
            this.playAnimation(uw.Fight.HeroAction.run);
        };
        /**
         * 攻击动作
         */
        __egretProto__.normalAttack = function () {
            this.playAnimation(uw.Fight.HeroAction.normalAttack);
        };
        /**
         * 技能攻击1
         */
        __egretProto__.skillAttack1 = function () {
            this.playAnimation(uw.Fight.HeroAction.skillAttack1);
        };
        /**
         * 技能攻击2
         */
        __egretProto__.skillAttack2 = function () {
            this.playAnimation(uw.Fight.HeroAction.skillAttack2);
        };
        /**
         * 技能攻击3
         */
        __egretProto__.skillAttack3 = function () {
            this.playAnimation(uw.Fight.HeroAction.skillAttack3);
        };
        /**
         * 必杀攻击
         */
        __egretProto__.uniqueAttack = function () {
            this.playAnimation(uw.Fight.HeroAction.uniqueAttack);
        };
        /**
         * 受击
         */
        __egretProto__.hit = function () {
            this.playAnimation(uw.Fight.HeroAction.hit);
        };
        /**
         * 胜利
         */
        __egretProto__.win = function () {
            this.playAnimation(uw.Fight.HeroAction.win);
        };
        /**
         * 死亡动作
         */
        __egretProto__.dead = function () {
            this.playAnimation(uw.Fight.HeroAction.dead);
            //受击音效
            var self = this, tid = 0;
            if (self._fightOption._isHero) {
                tid = mo.getJSONWithFileNameAndID(uw.cfg_t_hero, this._fightOption._tempId)[uw.t_hero_tid];
            }
            else {
                tid = mo.getJSONWithFileNameAndID(uw.cfg_t_monster, this._fightOption._tempId)[uw.t_monster_tid];
            }
            mo.playDeathAudio(tid, false);
        };
        __egretProto__.deadFadeOut = function () {
            var self = this;
            var delay = mo.delayTime(0);
            if (uw.isFightSimulate)
                delay = mo.delayTime(1);
            var seq = mo.sequence(delay, mo.fadeOut(0.3), mo.callFunc(self.removeFromParent, self));
            self.runAction(seq);
        };
        __egretProto__.setHighLight = function (isLight) {
            var color = isLight ? mo.c3b(255, 255, 255) : mo.c3b(110, 110, 110);
            this._fightOption._heroArmature.setColor(color);
        };
        __egretProto__.setUpState = function () {
            var self = this;
            var armatureName = res.cca_buff.stateUp;
            uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, armatureName, null, function (sender) {
                sender.setMovementEventCallFunc(self._armatureEndMovementEventCallFunc, self);
                sender.playWithIndex(0);
                sender.setZOrder(uw.roleZOrder.BUFF);
            }, self);
        };
        __egretProto__.setDownState = function () {
            var self = this;
            var armatureName = res.cca_buff.stateDown;
            uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, armatureName, null, function (sender) {
                sender.setMovementEventCallFunc(self._armatureEndMovementEventCallFunc, self);
                sender.playWithIndex(0);
                sender.setZOrder(uw.roleZOrder.BUFF);
            }, self);
        };
        /**
         * 晕眩动作
         */
        __egretProto__.setStun = function (isStun) {
            var self = this;
            if (isStun) {
                if (!self._fightOption._stunEffect) {
                    self._fightOption._stunEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.stun, null, function (sender) {
                        sender.playWithIndex(0);
                    }, self);
                    self._fightOption._stunEffect.setMovementEventCallFunc(self._armatureEndMovementEventCallFunc, self);
                    self._fightOption._stunEffect.setPosition(mo.pAdd(self._fightOption._statePos, mo.p(0, -10)));
                    self._fightOption._stunEffect.setZOrder(uw.roleZOrder.BUFF);
                }
            }
            else {
                if (self._fightOption._stunEffect) {
                    self._fightOption._stunEffect.removeFromParent();
                    self._fightOption._stunEffect = null;
                }
            }
        };
        /**
         * 睡眠动作
         */
        __egretProto__.setSleep = function (isSleep) {
            var self = this;
            if (isSleep) {
                if (!self._fightOption._sleepEffect) {
                    self._fightOption._sleepEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.sleep, null, function (sender) {
                        sender.playWithIndex(0);
                    }, self);
                    self._fightOption._sleepEffect.setMovementEventCallFunc(self._armatureEndMovementEventCallFunc, self);
                    self._fightOption._sleepEffect.setPosition(mo.pAdd(self._fightOption._statePos, mo.p(-20, -20)));
                    self._fightOption._sleepEffect.setZOrder(uw.roleZOrder.BUFF);
                }
                self.playAnimation(uw.Fight.HeroAction.stun);
            }
            else {
                if (self._fightOption._sleepEffect) {
                    self._fightOption._sleepEffect.removeFromParent();
                    self._fightOption._sleepEffect = null;
                }
            }
        };
        /**
         * 设置变乌鸦
         * @param bool
         */
        __egretProto__.setCrow = function (bool) {
            var self = this;
            if (!bool) {
                //移除
                if (self._fightOption._crowArmature) {
                    self._fightOption._crowArmature.removeFromParent();
                    self._fightOption._crowArmature = null;
                    self._calHeroArmature();
                }
            }
            else {
                //已经是变乌鸦状态，则返回
                if (!self._fightOption._crowArmature) {
                    //创建人物
                    var arm = uw.roleArmFactory.attachDynamicNodeTo4Recycle(this, uw.id_t_warrior.m_65, null, function (sender) {
                        //在不需要翻转白名单里的资源不翻转
                        if (self.getIsSelf()) {
                            self.forward(false);
                        }
                        else {
                            self.forward(true);
                        }
                        self.steady();
                        self._calShadowPos();
                    }, self);
                    arm.zOrder = uw.roleZOrder.ARMATURE;
                    self._fightOption._crowArmature = arm;
                    self._calHeroArmature();
                }
            }
        };
        __egretProto__._calHeroArmature = function () {
            var self = this;
            if (self._fightOption._crowArmature) {
                self._fightOption._originalArmature.setVisible(false);
                self._fightOption._heroArmature = self._fightOption._crowArmature;
            }
            else if (self._fightOption._originalArmature) {
                self._fightOption._heroArmature = self._fightOption._originalArmature;
                self._calShadowPos();
            }
            self._fightOption._heroArmature.setVisible(true);
        };
        /**
         * 异次元空间动作
         */
        __egretProto__.setSpace = function (isSleep) {
            var self = this;
            var mainLayer = uw.fightScene.getMainLayer();
            //var layer = uw.
            if (isSleep) {
                if (!self._fightOption._spaceEffect) {
                    self._fightOption._spaceEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(mainLayer, res.cca_buff.space, null, function (sender) {
                        sender.playWithIndex(0);
                    }, self);
                    self._fightOption._spaceEffect.setMovementEventCallFunc(self._armatureEndMovementEventCallFunc, self);
                    self._fightOption._spaceEffect.setPosition(self.getPosition());
                    self._fightOption._spaceEffect.setZOrder(uw.roleZOrder.SHADOW);
                }
                //self.playAnimation(uw.Fight.HeroAction.stun);
                self.setVisible(false);
            }
            else {
                if (self._fightOption._spaceEffect) {
                    self._fightOption._spaceEffect.removeFromParent();
                    self._fightOption._spaceEffect = null;
                }
                self.setVisible(true);
            }
        };
        /**
         * 冰冻动作
         */
        __egretProto__.setFreeze = function (isFreeze) {
            var self = this;
            if (isFreeze) {
                if (!self._fightOption._iceEffect) {
                    self._fightOption._iceEffect = mo.UIImage.create();
                    self._fightOption._iceEffect.loadTexture(res.ui_fight.freeze_png);
                    self.addChild(self._fightOption._iceEffect);
                    self._fightOption._iceEffect.zOrder = uw.roleZOrder.BUFF + 1;
                }
                self.playAnimation(uw.Fight.HeroAction.freeze);
                self._fightOption._heroArmature.colorTransform = ColorTransformUtils.getTransform(uw.Fight.ColorTransformType.frozen);
            }
            else {
                if (self._fightOption._iceEffect) {
                    self._fightOption._iceEffect.removeFromParent(true);
                    self._fightOption._iceEffect = null;
                }
                self.resumeAnimation();
                self._fightOption._heroArmature.colorTransform = null;
            }
        };
        /**
         * 动作冻住，底部没冰块
         */
        __egretProto__.setFreezeNoIce = function (isStone) {
            var self = this;
            if (isStone) {
                self.playAnimation(uw.Fight.HeroAction.freeze);
            }
            else {
                self.resumeAnimation();
            }
        };
        /**
         * 石化
         */
        __egretProto__.setStone = function (isStone) {
            var self = this;
            if (isStone) {
                self.playAnimation(uw.Fight.HeroAction.freeze);
                self._fightOption._heroArmature.colorTransform = ColorTransformUtils.getTransform(uw.Fight.ColorTransformType.stone);
            }
            else {
                self.resumeAnimation();
                self._fightOption._heroArmature.colorTransform = null;
            }
        };
        //禁言
        __egretProto__.setForbidden = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._forbiddenEffect) {
                    self._fightOption._forbiddenEffect = mo.UIImage.create();
                    self._fightOption._forbiddenEffect.loadTexture(res.ui_fight.silence_png);
                    self._fightOption._forbiddenEffect.setPosition(mo.pAdd(self.getStatePos(), mo.p(0, -40)));
                    self.addChild(self._fightOption._forbiddenEffect);
                    self._fightOption._forbiddenEffect.zOrder = uw.roleZOrder.BUFF;
                }
            }
            else {
                if (self._fightOption._forbiddenEffect) {
                    self._fightOption._forbiddenEffect.removeFromParent(true);
                    self._fightOption._forbiddenEffect = null;
                }
            }
        };
        //魔免
        __egretProto__.setMagicShield = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._magicShieldEffect) {
                    self._fightOption._magicShieldEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.magicShield, null, function (sender) {
                        sender.setMovementEventCallFunc(self._shieldMovementEventCallFunc, self);
                        sender.play(uw.Fight.ArmatureName.begin);
                        sender.setZOrder(uw.roleZOrder.BUFF + 1);
                    }, self);
                }
            }
            else {
                if (self._fightOption._magicShieldEffect) {
                    self._fightOption._magicShieldEffect.removeFromParent();
                    self._fightOption._magicShieldEffect = null;
                }
            }
        };
        //魔法盾
        __egretProto__.setMagicShield1 = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._physicsShield1Effect) {
                    self._fightOption._physicsShield1Effect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.magicShield1, null, function (sender) {
                        sender.setMovementEventCallFunc(self._onMovementBeginEvent, self);
                        sender.play(uw.Fight.ArmatureName.begin);
                        sender.setZOrder(uw.roleZOrder.BUFF + 1);
                    }, self);
                }
            }
            else {
                if (self._fightOption._physicsShield1Effect) {
                    self._fightOption._physicsShield1Effect.removeFromParent();
                    self._fightOption._physicsShield1Effect = null;
                }
            }
        };
        //真言盾
        __egretProto__.setMagicShield2 = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._physicsShield2Effect) {
                    self._fightOption._physicsShield2Effect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.magicShield2, null, function (sender) {
                        sender.setMovementEventCallFunc(self._onMovementBeginEvent, self);
                        sender.play(uw.Fight.ArmatureName.begin);
                        sender.setZOrder(uw.roleZOrder.BUFF + 1);
                    }, self);
                }
            }
            else {
                if (self._fightOption._physicsShield2Effect) {
                    self._fightOption._physicsShield2Effect.removeFromParent();
                    self._fightOption._physicsShield2Effect = null;
                }
            }
        };
        //物免盾
        __egretProto__.setPhysicsShield = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._physicsShieldEffect) {
                    self._fightOption._physicsShieldEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.physicalShield, null, function (sender) {
                        sender.setMovementEventCallFunc(self._shieldMovementEventCallFunc, self);
                        sender.play(uw.Fight.ArmatureName.begin);
                        sender.setZOrder(uw.roleZOrder.BUFF + 1);
                    }, self);
                }
            }
            else {
                if (self._fightOption._physicsShieldEffect) {
                    self._fightOption._physicsShieldEffect.removeFromParent();
                    self._fightOption._physicsShieldEffect = null;
                }
            }
        };
        //定身
        __egretProto__.setLimitMove = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._limitMoveEffect) {
                    self._fightOption._limitMoveEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.limitMove, null, function (sender) {
                        sender.setMovementEventCallFunc(self._shieldMovementEventCallFunc, self);
                        //sender.play(uw.Fight.ArmatureName.begin);
                        sender.setZOrder(uw.roleZOrder.SHADOW);
                    }, self);
                }
            }
            else {
                if (self._fightOption._limitMoveEffect) {
                    self._fightOption._limitMoveEffect.removeFromParent();
                    self._fightOption._limitMoveEffect = null;
                }
            }
        };
        //生命共享
        __egretProto__.setShareHp = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._shareHpEffect) {
                    self._fightOption._shareHpEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.shareHp, null, function (sender) {
                        sender.setMovementEventCallFunc(self._shieldMovementEventCallFunc, self);
                        sender.playWithIndex(0);
                        sender.setZOrder(uw.roleZOrder.SHADOW + 1);
                    }, self);
                }
            }
            else {
                if (self._fightOption._shareHpEffect) {
                    self._fightOption._shareHpEffect.removeFromParent();
                    self._fightOption._shareHpEffect = null;
                }
            }
        };
        //灼烧
        __egretProto__.setBurn = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._shareHpEffect) {
                    self._fightOption._shareHpEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.burn, null, function (sender) {
                        sender.setMovementEventCallFunc(self._shieldMovementEventCallFunc, self);
                        sender.playWithIndex(0);
                        sender.setZOrder(uw.roleZOrder.ARMATURE + 1);
                    }, self);
                }
            }
            else {
                if (self._fightOption._shareHpEffect) {
                    self._fightOption._shareHpEffect.removeFromParent();
                    self._fightOption._shareHpEffect = null;
                }
            }
        };
        __egretProto__._shieldMovementEventCallFunc = function (sender, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                movementID = mo.trimSpace(movementID);
                if (movementID == uw.Fight.ArmatureName.begin) {
                    sender.play(uw.Fight.ArmatureName.end);
                }
            }
        };
        //混乱
        __egretProto__.setChaos = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._chaosEffect) {
                    self._fightOption._chaosEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.chaos, null, function (sender) {
                        sender.playWithIndex(0);
                    }, self);
                    self._fightOption._chaosEffect.setPosition(mo.pAdd(self._fightOption._statePos, mo.p(0, -10)));
                    self._fightOption._chaosEffect.setZOrder(uw.roleZOrder.BUFF);
                }
            }
            else {
                if (self._fightOption._chaosEffect) {
                    self._fightOption._chaosEffect.removeFromParent();
                    self._fightOption._chaosEffect = null;
                }
            }
        };
        //诅咒
        __egretProto__.setCurse = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._curseEffect) {
                    self._fightOption._curseEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.curse, null, function (sender) {
                        sender.playWithIndex(0);
                    }, self);
                    self._fightOption._curseEffect.setPosition(mo.pAdd(self._fightOption._statePos, mo.p(0, -10)));
                    self._fightOption._curseEffect.setZOrder(uw.roleZOrder.BUFF);
                }
            }
            else {
                if (self._fightOption._curseEffect) {
                    self._fightOption._curseEffect.removeFromParent();
                    self._fightOption._curseEffect = null;
                }
            }
        };
        //中毒
        __egretProto__.setPoison = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._poisonEffect) {
                    self._fightOption._poisonEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.poison, null, function (sender) {
                        sender.playWithIndex(0);
                    }, self);
                    self._fightOption._poisonEffect.setPosition(mo.pAdd(self._fightOption._statePos, mo.p(0, -10)));
                    self._fightOption._poisonEffect.setZOrder(uw.roleZOrder.BUFF);
                }
                self._fightOption._heroArmature.colorTransform = ColorTransformUtils.getTransform(uw.Fight.ColorTransformType.poison);
            }
            else {
                if (self._fightOption._poisonEffect) {
                    self._fightOption._poisonEffect.removeFromParent();
                    self._fightOption._poisonEffect = null;
                }
                self._fightOption._heroArmature.colorTransform = null;
            }
        };
        //加攻持续
        __egretProto__.setAddAttack = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._addAttackEffect) {
                    self._fightOption._addAttackEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.addAttack, null, function (sender) {
                        sender.setMovementEventCallFunc(self._onMovementBeginEvent, self);
                        sender.play(uw.Fight.ArmatureName.begin);
                    }, self);
                    self._fightOption._addAttackEffect.setPosition(mo.pAdd(self._fightOption._statePos, mo.p(0, -100)));
                    self._fightOption._addAttackEffect.setZOrder(uw.roleZOrder.BUFF);
                }
            }
            else {
                if (self._fightOption._addAttackEffect) {
                    self._fightOption._addAttackEffect.removeFromParent();
                    self._fightOption._addAttackEffect = null;
                }
            }
        };
        //酒雾泡泡
        __egretProto__.setWine = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._curseEffect) {
                    self._fightOption._curseEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.wine, null, function (sender) {
                        sender.playWithIndex(0);
                    }, self);
                    self._fightOption._curseEffect.setPosition(mo.pAdd(self._fightOption._statePos, mo.p(0, -10)));
                    self._fightOption._curseEffect.setZOrder(uw.roleZOrder.BUFF);
                }
            }
            else {
                if (self._fightOption._curseEffect) {
                    self._fightOption._curseEffect.removeFromParent();
                    self._fightOption._curseEffect = null;
                }
            }
        };
        //镜像
        __egretProto__.setMirror = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                self._fightOption._heroArmature.colorTransform = ColorTransformUtils.getTransform(uw.Fight.ColorTransformType.mirror);
            }
            else {
                self._fightOption._heroArmature.colorTransform = null;
            }
        };
        //致盲
        __egretProto__.setBlind = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._blindEffect) {
                    self._fightOption._blindEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.blind, null, function (sender) {
                        sender.playWithIndex(0);
                    }, self);
                    self._fightOption._blindEffect.setPosition(mo.pAdd(self._fightOption._statePos, mo.p(0, -10)));
                    self._fightOption._blindEffect.setZOrder(uw.roleZOrder.BUFF);
                }
            }
            else {
                if (self._fightOption._blindEffect) {
                    self._fightOption._blindEffect.removeFromParent();
                    self._fightOption._blindEffect = null;
                }
            }
        };
        //地狱火焰
        __egretProto__.setHellFire = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._fightOption._hellFire) {
                    self._fightOption._hellFire = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.hellFire, null, function (sender) {
                        sender.playWithIndex(0);
                    }, self);
                    self._fightOption._hellFire.setPosition(mo.pAdd(self._fightOption._statePos, mo.p(0, -50)));
                    self._fightOption._hellFire.setZOrder(uw.roleZOrder.BUFF);
                }
            }
            else {
                if (self._fightOption._hellFire) {
                    self._fightOption._hellFire.removeFromParent();
                    self._fightOption._hellFire = null;
                }
            }
        };
        //背影
        __egretProto__.setBackShadow = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._backShadow) {
                    self._backShadow = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.backShadow, null, function (sender) {
                        sender.playWithIndex(0);
                    }, self);
                    self._backShadow.setPosition(mo.p(0, 0));
                    self._backShadow.setZOrder(uw.roleZOrder.ARMATURE - 1);
                }
            }
            else {
                if (self._backShadow) {
                    self._backShadow.removeFromParent();
                    self._backShadow = null;
                }
            }
        };
        //原力盾
        __egretProto__.setPowerShield = function () {
            var self = this;
            if (!self._powerShield) {
                self._powerShield = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.powerShield, null, function (sender) {
                    sender.playWithIndex(0);
                    sender.setMovementEventCallFunc(self._powerShieldCallFunc, self);
                }, self);
                self._powerShield.setPosition(0, 0);
                self._powerShield.setZOrder(uw.roleZOrder.BUFF);
            }
        };
        __egretProto__._powerShieldCallFunc = function (sender, movementType, movementID) {
            var self = this;
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                if (self._powerShield) {
                    self._powerShield.removeFromParent();
                    self._powerShield = null;
                }
            }
        };
        //DK盾
        __egretProto__.setDKShield = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._dkShieldEffect) {
                    self._dkShieldEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.dkShield, null, function (sender) {
                        sender.playWithIndex(0);
                        sender.setZOrder(uw.roleZOrder.BUFF);
                    }, self);
                }
            }
            else {
                if (self._dkShieldEffect) {
                    self._dkShieldEffect.removeFromParent();
                    self._dkShieldEffect = null;
                }
            }
        };
        //变羊
        __egretProto__.setSheep = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._sheepEffect) {
                    self._sheepEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.sheep, null, function (sender) {
                        sender.setMovementEventCallFunc(self._sheepMovementEventCallFunc, self);
                        sender.play(uw.Fight.ArmatureName.begin);
                        sender.setZOrder(uw.roleZOrder.BUFF);
                    }, self);
                    self._fightOption._heroArmature.setVisible(false);
                }
            }
            else {
                if (self._sheepEffect) {
                    self._sheepEffect.removeFromParent();
                    self._sheepEffect = null;
                    self._fightOption._heroArmature.setVisible(true);
                }
            }
        };
        __egretProto__._sheepMovementEventCallFunc = function (sender, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                movementID = mo.trimSpace(movementID);
                if (movementID == uw.Fight.ArmatureName.begin) {
                    sender.play(uw.Fight.ArmatureName.loop);
                }
            }
        };
        //反弹
        __egretProto__.setBounce = function () {
            var self = this;
            var isSelf = self._fightOption._isSelf;
            var x = isSelf ? 1 : -1;
            var bounceNode = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.bounce, null, function (sender) {
                sender.setMovementEventCallFunc(self._armatureEndMovementEventCallFunc, self);
                sender.playWithIndex(0);
            }, self);
            var pos = mo.pAdd(self._fightOption._bodyPos, mo.p(x * 100, 0));
            bounceNode.x = pos.x;
            bounceNode.y = pos.y;
            bounceNode.setScale(-x, 1);
            bounceNode.setZOrder(uw.roleZOrder.BUFF + 1);
        };
        __egretProto__._armatureEndMovementEventCallFunc = function (armature, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                armature.removeFromParent();
            }
        };
        //绝对防御
        __egretProto__.setDefend = function (isEnabled) {
            var self = this;
            if (isEnabled) {
                if (!self._defendEffect) {
                    self._defendEffect = uw.effectArmFactory.attachDynamicNodeTo4Recycle(self, res.cca_buff.shield, null, function (sender) {
                        sender.play(uw.Fight.ArmatureName.begin);
                    }, self);
                    self._defendEffect.setMovementEventCallFunc(self._onMovementBeginEvent, self);
                    self._defendEffect.setPosition(mo.pAdd(self._fightOption._statePos, mo.p(0, -40)));
                    self._defendEffect.zOrder = uw.roleZOrder.BUFF;
                }
            }
            else {
                if (self._defendEffect) {
                    self._defendEffect.play(uw.Fight.ArmatureName.end);
                    self._defendEffect = null;
                }
            }
        };
        __egretProto__._onMovementBeginEvent = function (sender, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                movementID = mo.trimSpace(movementID);
                if (movementID == uw.Fight.ArmatureName.begin) {
                    sender.play(uw.Fight.ArmatureName.loop);
                }
                else if (movementID == uw.Fight.ArmatureName.end) {
                    sender.removeFromParent();
                }
            }
        };
        //转身
        __egretProto__.forward = function (left) {
            var self = this;
            var scaleY = self._fightOption._heroArmature.getScaleY();
            if (left) {
                var scaleX = self._isNotInWhiteList(self._fightOption._tempId) ? -scaleY : scaleY;
                this._fightOption._heroArmature.setScaleX(scaleX);
            }
            else {
                var scaleX = self._isNotInWhiteList(self._fightOption._tempId) ? scaleY : -scaleY;
                this._fightOption._heroArmature.setScaleX(scaleX);
            }
        };
        //设置播放速率
        __egretProto__.setSpeedScale = function (scale) {
            this._fightOption._heroArmature.setSpeedScale(scale);
        };
        __egretProto__.setChangeBody = function (bool) {
            this._fightOption._isChangeBody = bool;
        };
        __egretProto__.playAnimation = function (name) {
            //变身
            if (this._fightOption._isChangeBody) {
                name += "_1";
            }
            this._fightOption._heroArmature.play(name);
        };
        __egretProto__.pauseAnimation = function () {
            //this._fightOption._heroArmature.pause();
            this.resumeSchedulerAndActions();
            //所有子元素也暂停
            var children = this.getChildren();
            for (var i = 0; i < children.length; i++) {
                var locChild = children[i];
                locChild.resumeSchedulerAndActions();
                if (locChild instanceof mo.Armature) {
                    locChild.pause();
                }
            }
            //次元空间是加到场景，要特殊做处理
            if (this._fightOption._spaceEffect) {
                this._fightOption._spaceEffect.pause();
            }
        };
        __egretProto__.resumeAnimation = function () {
            //this._fightOption._heroArmature.resume();
            this.resumeSchedulerAndActions();
            //所有子元素也继续
            var children = this.getChildren();
            for (var i = 0; i < children.length; i++) {
                var locChild = children[i];
                locChild.resumeSchedulerAndActions();
                if (locChild instanceof mo.Armature) {
                    locChild.resume();
                }
            }
            //次元空间是加到场景，要特殊做处理
            if (this._fightOption._spaceEffect) {
                this._fightOption._spaceEffect.resume();
            }
        };
        __egretProto__.getAnimationId = function () {
            var movementID = this._fightOption._heroArmature.name;
            if (!movementID) {
                uw.log("movementID==null");
                return null;
            }
            //变身，特殊处理
            movementID = movementID.replace("_1", "");
            return movementID;
        };
        __egretProto__.setMovementEventCallFunc = function (callFunc, target) {
            var self = this;
            self._fightOption._heroArmature.setMovementEventCallFunc(function (armature, movementType, movementID) {
                callFunc.call(target, self, movementType, movementID);
            }, self);
        };
        __egretProto__.setFrameEventCallFunc = function (callFunc, target) {
            var self = this;
            self._fightOption._heroArmature.setFrameEventCallFunc(function (bone, evt, originFrameIndex, currentFrameIndex) {
                callFunc.call(target, self, evt, originFrameIndex, currentFrameIndex);
            }, self);
        };
        __egretProto__.fadeOut = function () {
            var seq = mo.sequence(mo.fadeOut(0.4), mo.callFunc(function (sender) {
                sender.setVisible(false);
            }, this));
            this.runAction(seq);
        };
        __egretProto__.fadeIn = function () {
            this.setVisible(true);
            this.runAction(mo.fadeIn(0.4));
        };
        __egretProto__.dtor = function () {
            this._cb = null;
            //this._fightOption.doDtor();
            //this._fightOption = null;
            _super.prototype.dtor.call(this);
        };
        FightHeroRole.__className = "FightHeroRole";
        FightHeroRole.armatureWhiteList = [
            10000,
            10001,
            10013,
            10002,
            10011
        ];
        return FightHeroRole;
    })(mo.Node);
    uw.FightHeroRole = FightHeroRole;
    FightHeroRole.prototype.__class__ = "uw.FightHeroRole";
})(uw || (uw = {}));
