/**
 * Created by wander on 14-12-22.
 */
var egret;
(function (egret) {
    var action;
    (function (_action) {
        function arrayRemoveObject(arr, delObj) {
            for (var i = 0, l = arr.length; i < l; i++) {
                if (arr[i] == delObj) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        ;
        var Manager = (function () {
            function Manager() {
                this._hashTargets = {};
                this._arrayTargets = [];
                this._currentTarget = null;
                this._currentTargetSalvaged = false;
            }
            var __egretProto__ = Manager.prototype;
            Manager.getInstance = function () {
                if (Manager._manager == null) {
                    Manager._manager = new egret.action.Manager();
                    egret.Ticker.getInstance().register(function (dt) {
                        Manager._manager.update(dt / 1000);
                    }, this);
                }
                return Manager._manager;
            };
            /** Adds an action with a target.
             * If the target is already present, then the action will be added to the existing target.
             * If the target is not present, a new instance of this target will be created either paused or not, and the action will be added to the newly created target.
             * When the target is paused, the queued actions won't be 'ticked'.
             * @param {cc.Action} action
             * @param {cc.Node} target
             * @param {Boolean} paused
             */
            __egretProto__.addAction = function (target, action, paused) {
                if (!action)
                    throw "cc.ActionManager.addAction(): action must be non-null";
                if (!target)
                    throw "cc.ActionManager.addAction(): action must be non-null";
                //check if the action target already exists
                var element = this._hashTargets[target._hashCode];
                //if doesnt exists, create a hashelement and push in mpTargets
                if (!element) {
                    element = new _action.HashElement();
                    element.paused = paused;
                    element.target = target;
                    this._hashTargets[target._hashCode] = element;
                    this._arrayTargets.push(element);
                }
                //creates a array for that eleemnt to hold the actions
                this._actionAllocWithHashElement(element);
                element.actions.push(action);
                action.startWithTarget(target);
            };
            __egretProto__._actionAllocWithHashElement = function (element) {
                // 4 actions per Node by default
                if (element.actions == null) {
                    element.actions = [];
                }
            };
            /**
             * @param {Number} dt delta time in seconds
             */
            __egretProto__.update = function (dt) {
                var locTargets = this._arrayTargets, locCurrTarget;
                for (var elt = 0; elt < locTargets.length; elt++) {
                    this._currentTarget = locTargets[elt];
                    locCurrTarget = this._currentTarget;
                    //this._currentTargetSalvaged = false;
                    if (!locCurrTarget.paused) {
                        for (locCurrTarget.actionIndex = 0; locCurrTarget.actionIndex < locCurrTarget.actions.length; locCurrTarget.actionIndex++) {
                            locCurrTarget.currentAction = locCurrTarget.actions[locCurrTarget.actionIndex];
                            if (!locCurrTarget.currentAction)
                                continue;
                            locCurrTarget.currentActionSalvaged = false;
                            //use for speed
                            locCurrTarget.currentAction.step(dt * (locCurrTarget.currentAction._speedMethod ? locCurrTarget.currentAction._speed : 1));
                            if (locCurrTarget.currentActionSalvaged) {
                                // The currentAction told the node to remove it. To prevent the action from
                                // accidentally deallocating itself before finishing its step, we retained
                                // it. Now that step is done, it's safe to release it.
                                locCurrTarget.currentAction = null; //release
                            }
                            else if (locCurrTarget.currentAction.isDone()) {
                                locCurrTarget.currentAction.stop();
                                var action = locCurrTarget.currentAction;
                                // Make currentAction nil to prevent removeAction from salvaging it.
                                locCurrTarget.currentAction = null;
                                this.removeAction(action);
                            }
                            locCurrTarget.currentAction = null;
                        }
                    }
                    // elt, at this moment, is still valid
                    // so it is safe to ask this here (issue #490)
                    // only delete currentTarget if no actions were scheduled during the cycle (issue #481)
                    if (this._currentTargetSalvaged && locCurrTarget.actions.length === 0) {
                        this._deleteHashElement(locCurrTarget);
                    }
                }
            };
            /** Removes an action given an action reference.
             * @param {cc.Action} action
             */
            __egretProto__.removeAction = function (action) {
                // explicit null handling
                if (action == null)
                    return;
                var target = action.getOriginalTarget();
                var element = this._hashTargets[target._hashCode];
                if (element) {
                    for (var i = 0; i < element.actions.length; i++) {
                        if (element.actions[i] == action) {
                            element.actions.splice(i, 1);
                            break;
                        }
                    }
                }
            };
            __egretProto__._deleteHashElement = function (element) {
                if (element) {
                    delete this._hashTargets[element.target._hashCode];
                    arrayRemoveObject(this._arrayTargets, element);
                    element.actions = null;
                    element.target = null;
                }
            };
            /** Pauses the target: all running actions and newly added actions will be paused.
             * @param {object} target
             */
            __egretProto__.pauseTarget = function (target) {
                var element = this._hashTargets[target._hashCode];
                if (element)
                    element.paused = true;
            };
            /** Resumes the target. All queued actions will be resumed.
             * @param {object} target
             */
            __egretProto__.resumeTarget = function (target) {
                var element = this._hashTargets[target._hashCode];
                if (element)
                    element.paused = false;
            };
            /** Removes all actions from a certain target. <br/>
             * All the actions that belongs to the target will be removed.
             * @param {object} target
             * @param {boolean} forceDelete
             */
            __egretProto__.removeAllActionsFromTarget = function (target, forceDelete) {
                // explicit null handling
                if (target == null)
                    return;
                var element = this._hashTargets[target._hashCode];
                if (element) {
                    if (element.actions.indexOf(element.currentAction) !== -1 && !(element.currentActionSalvaged))
                        element.currentActionSalvaged = true;
                    element.actions.length = 0;
                    if (this._currentTarget == element && !forceDelete) {
                        this._currentTargetSalvaged = true;
                    }
                    else {
                        this._deleteHashElement(element);
                    }
                }
            };
            /**
             * Removes all actions from all the targets.
             */
            __egretProto__.removeAllActions = function () {
                var locTargets = this._arrayTargets;
                for (var i = 0; i < locTargets.length; i++) {
                    var element = locTargets[i];
                    if (element)
                        this.removeAllActionsFromTarget(element.target, true);
                }
            };
            /** Gets an action given its tag an a target
             * @param {Number} tag
             * @param {object} target
             * @return {egret.action.Action|Null}  return the Action with the given tag on success
             */
            __egretProto__.getActionByTag = function (tag, target) {
                var element = this._hashTargets[target._hashCode];
                if (element) {
                    if (element.actions != null) {
                        for (var i = 0; i < element.actions.length; ++i) {
                            var action = element.actions[i];
                            if (action && action.getTag() === tag)
                                return action;
                        }
                    }
                }
                return null;
            };
            /** Removes an action given its tag and the target
             * @param {Number} tag
             * @param {object} target
             */
            __egretProto__.removeActionByTag = function (tag, target) {
                var action = this.getActionByTag(tag, target);
                if (action) {
                    this.removeAction(action);
                }
            };
            /** Returns the numbers of actions that are running in a certain target. <br/>
             * Composable actions are counted as 1 action. <br/>
             * Example: <br/>
             * - If you are running 1 Sequence of 7 actions, it will return 1. <br/>
             * - If you are running 7 Sequences of 2 actions, it will return 7.
             * @param {object} target
             * @return {Number}
             */
            __egretProto__.numberOfRunningActionsInTarget = function (target) {
                var element = this._hashTargets[target._hashCode];
                if (element)
                    return (element.actions) ? element.actions.length : 0;
                return 0;
            };
            return Manager;
        })();
        _action.Manager = Manager;
        Manager.prototype.__class__ = "egret.action.Manager";
    })(action = egret.action || (egret.action = {}));
})(egret || (egret = {}));
var egret;
(function (egret) {
    var action;
    (function (action) {
        var HashElement = (function () {
            function HashElement() {
            }
            var __egretProto__ = HashElement.prototype;
            /**
             * Constructor
             */
            __egretProto__.constractor = function () {
                this.actions = [];
                this.target = null;
                this.actionIndex = 0;
                this.currentAction = null; //CCAction
                this.currentActionSalvaged = false;
                this.paused = false;
                this.hh = null; //ut hash handle
            };
            return HashElement;
        })();
        action.HashElement = HashElement;
        HashElement.prototype.__class__ = "egret.action.HashElement";
    })(action = egret.action || (egret.action = {}));
})(egret || (egret = {}));
