var mo;
(function (mo) {
    mo.__resCfg = {};
    mo.runningScene;
    var SceneMgr = (function (_super) {
        __extends(SceneMgr, _super);
        function SceneMgr() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SceneMgr.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._scenesStack = [];
        };
        __egretProto__.registerLoadingLayerClass = function (LoadingLayerClass) {
            this._LoadingLayerClass = LoadingLayerClass;
        };
        /**
         * 推送场景，还会保留原来的scene在内存里
         * @param sceneClass
         * @param loadingType
         * @param reqTask
         * @param cb
         */
        __egretProto__.runScene = function (sceneClass, loadingType, reqTask, cb) {
            var self = this, layer;
            if (!cb) {
                cb = reqTask;
                reqTask = function (cb1) {
                    cb1(null);
                };
            }
            if (loadingType == SceneMgr.LOADING_TYPE_CIRCLE) {
                mo.playWaiting();
            }
            else {
                layer = self._LoadingLayerClass.getInstance();
                layer.show();
            }
            res.mgr.runModule(sceneClass.__className); //资源模块推入
            reqTask(function (err) {
                if (err) {
                    res.mgr.popModule(sceneClass.__className); //资源模块推出
                    res.mgr.releaseModule(); //进行释放
                    return;
                }
                var resArr = res.getResArr(sceneClass.__className); //获取资源列表
                res.load(resArr, function () {
                    res.info("模块【%s】加载完毕！", sceneClass.__className);
                    sceneClass.preload(function (err) {
                        if (err) {
                            res.mgr.popModule(sceneClass.__className); //资源模块推出
                            res.mgr.releaseModule(); //进行释放
                            return;
                        }
                        var preScene = mo.runningScene;
                        var scene = sceneClass.create(); //创建scene
                        var eventType = egret.Event.ADDED_TO_STAGE;
                        var releaseModuleFunc = function () {
                            scene.removeEventListener(eventType, releaseModuleFunc, self); //记得移除监听
                            res.mgr.releaseModule();
                        };
                        scene.addEventListener(eventType, releaseModuleFunc, self); //在新场景进入时进行释放
                        //添加新的scene视图可见的监听
                        mo.dispatchEvent([[mo.actionDispatcher, gEventType.newSceneVisible]], function () {
                            mo.runningScene = scene;
                            var stage = mo.clearStage();
                            if (preScene) {
                                self._dispatchVisibleLayerInvisible(preScene);
                            }
                            //释放原来的Scene
                            if (preScene && !preScene._isInstance) {
                                preScene.doDtor();
                            }
                            if (loadingType == SceneMgr.LOADING_TYPE_CIRCLE) {
                                mo.stopWaiting();
                            }
                            else {
                                if (layer)
                                    layer.close();
                            }
                            stage.addChildAt(scene, 0);
                            scene.show();
                            cb(null, scene);
                        }, self);
                    });
                });
            });
        };
        /**
         * 推送场景，还会保留原来的scene在内存里
         * @param sceneClass
         * @param loadingType
         * @param cb
         * @param reqTask
         */
        __egretProto__.pushScene = function (sceneClass, loadingType, reqTask, cb) {
            var self = this, layer;
            if (!cb) {
                cb = reqTask;
                reqTask = function (cb1) {
                    cb1(null);
                };
            }
            if (loadingType == SceneMgr.LOADING_TYPE_CIRCLE) {
                mo.playWaiting();
            }
            else {
                layer = self._LoadingLayerClass.getInstance();
                layer.show();
            }
            res.mgr.pushModule(sceneClass.__className); //资源模块推入
            reqTask(function (err) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (err) {
                    res.mgr.popModule(sceneClass.__className); //资源模块推出
                    res.mgr.releaseModule(); //进行释放
                    return;
                }
                var resArr = res.getResArr(sceneClass.__className); //获取资源列表
                res.load(resArr, function () {
                    res.info("模块【%s】加载完毕！", sceneClass.__className);
                    sceneClass.preload(function (err) {
                        if (err) {
                            res.mgr.popModule(sceneClass.__className); //资源模块推出
                            res.mgr.releaseModule(); //进行释放
                            return;
                        }
                        var preScene = mo.runningScene;
                        var scene = sceneClass.create.apply(sceneClass, args); //创建scene
                        if (preScene && self._scenesStack.indexOf(preScene) == -1) {
                            preScene.isAutoDtor = false; //设置成不自动释放
                            self._scenesStack.push(preScene);
                            //需要触发所有这个scene下面的所有可见的layer的invisible监听
                            self._dispatchVisibleLayerInvisible(preScene);
                        }
                        //添加新的scene视图可见的监听
                        mo.dispatchEvent([[mo.actionDispatcher, gEventType.newSceneVisible]], function () {
                            mo.runningScene = scene;
                            var stage = mo.clearStage();
                            if (loadingType == SceneMgr.LOADING_TYPE_CIRCLE) {
                                mo.stopWaiting();
                            }
                            else {
                                if (layer)
                                    layer.close();
                            }
                            stage.addChildAt(scene, 0);
                            scene.show();
                            cb(null, scene);
                        }, self);
                    });
                });
            });
        };
        /**
         * 回到上一个scene哦亲
         * @param sceneClass
         * @param cb
         */
        __egretProto__.popScene = function (sceneClass, cb) {
            res.mgr.popModule(mo.runningScene.__className);
            var self = this, scene, preScene;
            if (sceneClass) {
                for (var i = self._scenesStack.length; i > 0; i--) {
                    scene = self._scenesStack.pop();
                    if (scene.__className != sceneClass.__className) {
                        res.mgr.popModule(scene.__className);
                        //释放原来的Scene
                        if (!scene._isInstance) {
                            scene.doDtor();
                        }
                    }
                    else {
                        preScene = scene;
                        break;
                    }
                }
            }
            else {
                preScene = self._scenesStack.pop();
            }
            if (preScene) {
                var eventType = egret.Event.ADDED_TO_STAGE;
                var releaseModuleFunc = function () {
                    preScene.removeEventListener(eventType, releaseModuleFunc, self); //记得移除监听
                    res.mgr.releaseModule();
                };
                preScene.addEventListener(eventType, releaseModuleFunc, self); //在新场景进入时进行释放
            }
            //添加新的scene视图可见的监听
            mo.dispatchEvent([[mo.actionDispatcher, gEventType.newSceneVisible]], function () {
                var oldRunningScene = mo.runningScene;
                mo.runningScene = preScene;
                var stage = mo.clearStage();
                //释放原来的Scene
                if (oldRunningScene && !oldRunningScene._isInstance) {
                    oldRunningScene.doDtor();
                }
                if (preScene) {
                    stage.addChildAt(preScene, 0);
                    //这时候，还需要触发所有layer的visible监听
                    self._dispatchVisibleLayerVisible(preScene);
                }
                if (cb)
                    cb(null, preScene);
            }, self);
        };
        __egretProto__._dispatchVisibleLayerVisible = function (parent) {
            var children = parent.getChildren();
            for (var i = 0; i < children.length; ++i) {
                var child = children[i];
                if (child && child.visible && child instanceof mo.Layer) {
                    //                    if((<Layer>child).__className == "CopyLayer"){
                    //                        debugger;
                    //                    }
                    mo.dispatchEvent([
                        [mo.visibleDispatcher, child.__className],
                        [child, gEventType.visible]
                    ], child._onShowReady, child);
                    this._dispatchVisibleLayerVisible(child);
                }
            }
        };
        __egretProto__._dispatchVisibleLayerInvisible = function (parent) {
            var children = parent.getChildren();
            for (var i = 0; i < children.length; ++i) {
                var child = children[i];
                if (child && child.visible && child instanceof mo.Layer) {
                    mo.dispatchEvent([
                        [mo.invisibleDispatcher, child.__className],
                        [child, gEventType.invisible]
                    ], function () {
                    }, child);
                    this._dispatchVisibleLayerInvisible(child);
                }
            }
        };
        __egretProto__.purge = function () {
            var self = this;
            self.clear();
            self._scenesStack.length = 0;
            mo.runningScene = null;
        };
        __egretProto__.isInStack = function (scene) {
            return this._scenesStack.indexOf(scene) >= 0;
        };
        __egretProto__.clear = function () {
            var self = this, stack = self._scenesStack;
            var scene = mo.runningScene;
            mo.clearStage(); //清空画布
            if (scene) {
                res.mgr.popModule(scene.__className);
                res.mgr.releaseModule();
                if (scene._isInstance)
                    scene.__class.purgeInstance();
                else
                    scene.doDtor();
            }
            while (stack.length > 0) {
                scene = stack.pop();
                res.mgr.popModule(scene.__className);
                res.mgr.releaseModule();
                if (scene._isInstance)
                    scene.__class.purgeInstance();
                else
                    scene.doDtor();
            }
        };
        SceneMgr.__className = "SceneMgr";
        SceneMgr.LOADING_TYPE_CIRCLE = 0;
        SceneMgr.LOADING_TYPE_ARMATURE = 1;
        return SceneMgr;
    })(mo.Class);
    mo.SceneMgr = SceneMgr;
    SceneMgr.prototype.__class__ = "mo.SceneMgr";
    mo.sceneMgr = SceneMgr.create();
})(mo || (mo = {}));
