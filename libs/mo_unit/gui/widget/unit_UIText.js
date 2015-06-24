/**
 * Created by SmallAiTT on 2015/3/6.
 */
var unit;
(function (unit) {
    unit.curRegisterModule = "mo_ui";
    var actFunc = function () {
        return mo.sequence(mo.spawn(mo.scaleTo(0.3, 1).setEase(mo.Ease.backOut), mo.fadeIn(0.3)), mo.delayTime(0.35), mo.moveBy(1.5, mo.p(0, -300)), mo.spawn(mo.moveBy(0.5, mo.p(0, -100)), mo.fadeOut(0.5)), mo.callFunc(function (sender) {
            unit.testContainer.removeChild(sender);
        }, null));
    };
    var allText = "可以创建一个新的分支，也可以查看当前仓库里所有的分支。git branch test创建名为test的分支，可以用git checkout test切换到test分支工作。如果仓库下的某分支不用了，可以用“git branch -d”命令把这个分支删掉。如果你想要删除的分支还没有被合并到其它分支中去，那么就不能用“git branch -d”来删除它，需要改用“git branch -D”来强制删除。从暂存区恢复文件到工作区git checkout  --  <file>；有可以把Git 仓库（隐藏目录中的那些文件）导出到工作目录中；可以切换到某分支进行工作。Git把所有的历史提交信息全部存储在“Git目录”里，它就是一个Git项目的仓库；你对本地的源代码进行编辑修改后创建的提交也都会先保存在这里面，然后再推送到远端的服务器。当我们把项目目录和“Git目录”一起拷到其它电脑里，它能马上正常的工作（所有的提交信息全都保存在Git目录里）；甚至可以只把“Git目录”拷走也行，但是要再签出（checkout）一次。git checkout -- filename 这个是恢复到某文件修改前的版本，这样你做的本地修改都忽略不见了；如果不带具体文件名，只会提示更改记录，并不会做任何更新。git-checkout -f ，可以使用 -f 选项导出文件，覆盖本地修改，这样就可以将您带回到一个干净的状态。";
    var getTextStr = function () {
        var rand1 = mo.random(10, 20);
        var result = "";
        for (var i = 0; i < rand1; ++i) {
            var rand2 = mo.random(0, allText.length - 1);
            result += allText.substring(rand2, rand2 + 1);
        }
        return result;
    };
    unit.registerTestBtn("Text act", function () {
        tm.setInterval(function () {
            var act = actFunc();
            var uiText = new mo.UIText();
            uiText.setText(getTextStr());
            uiText.setAnchorPoint(0.5, 0.5);
            uiText.setFontSize(60);
            uiText.setPosition(unit.testContainer.width / 2, unit.testContainer.height * 4 / 5);
            unit.testContainer.addChild(uiText);
            uiText.runAction(act);
        }, null, 50);
    });
    unit.registerTestBtn("TextField act", function () {
        tm.setInterval(function () {
            var act = actFunc();
            var uiText = new egret.TextField();
            uiText.text = getTextStr();
            uiText.anchorX = 0.5;
            uiText.anchorY = 0.5;
            uiText.size = 60;
            uiText.x = unit.testContainer.width / 2;
            uiText.y = unit.testContainer.height * 4 / 5;
            unit.testContainer.addChild(uiText);
            egret.action.Manager.getInstance().addAction(uiText, act);
        }, null, 50);
    });
    unit.registerTestBtn("定时不同UIText", function () {
        var textCount = 0;
        tm.setInterval(function () {
            textCount++;
            var uiText = new mo.UIText();
            uiText.setText(getTextStr());
            uiText.setFontSize(60);
            uiText.anchorX = 0.5;
            uiText.anchorY = 0.5;
            uiText.x = unit.testContainer.width * Math.random();
            uiText.y = unit.testContainer.height * Math.random();
            unit.testContainer.addChild(uiText);
            console.log("textCount------>" + textCount);
        }, null, 50);
    });
    unit.registerTestBtn("定时不同TextField", function () {
        var textCount = 0;
        tm.setInterval(function () {
            textCount++;
            var uiText = new egret.TextField();
            uiText.text = getTextStr();
            uiText.size = 60;
            uiText.anchorX = 0.5;
            uiText.anchorY = 0.5;
            uiText.x = unit.testContainer.width * Math.random();
            uiText.y = unit.testContainer.height * Math.random();
            unit.testContainer.addChild(uiText);
            console.log("textCount------>" + textCount);
        }, null, 50);
    });
    unit.registerTestBtn("定时相同UIText", function () {
        var textCount = 0;
        var text;
        tm.setInterval(function () {
            textCount++;
            if (!text)
                text = getTextStr();
            var uiText = new mo.UIText();
            uiText.setText(text);
            uiText.setFontSize(60);
            uiText.anchorX = 0.5;
            uiText.anchorY = 0.5;
            uiText.x = unit.testContainer.width * Math.random();
            uiText.y = unit.testContainer.height * Math.random();
            unit.testContainer.addChild(uiText);
            console.log("textCount------>" + textCount);
        }, null, 50);
    });
    unit.registerTestBtn("定时相同TextField", function () {
        var textCount = 0;
        var text;
        tm.setInterval(function () {
            textCount++;
            if (!text)
                text = getTextStr();
            var uiText = new egret.TextField();
            uiText.text = text;
            uiText.size = 60;
            uiText.anchorX = 0.5;
            uiText.anchorY = 0.5;
            uiText.x = unit.testContainer.width * Math.random();
            uiText.y = unit.testContainer.height * Math.random();
            unit.testContainer.addChild(uiText);
            console.log("textCount------>" + textCount);
        }, null, 50);
    });
    unit.registerTestBtn("一次性添加UIText", function () {
        var count = 400;
        for (var i = 0; i < count; ++i) {
            var uiText = new mo.UIText();
            uiText.setText(getTextStr());
            uiText.setFontSize(60);
            uiText.anchorX = 0.5;
            uiText.anchorY = 0.5;
            uiText.x = unit.testContainer.width * Math.random();
            uiText.y = unit.testContainer.height * Math.random();
            unit.testContainer.addChild(uiText);
        }
    });
    unit.registerTestBtn("一次性添加TextField", function () {
        var count = 400;
        for (var i = 0; i < count; ++i) {
            var uiText = new egret.TextField();
            uiText.text = getTextStr();
            uiText.size = 60;
            uiText.anchorX = 0.5;
            uiText.anchorY = 0.5;
            uiText.x = unit.testContainer.width * Math.random();
            uiText.y = unit.testContainer.height * Math.random();
            unit.testContainer.addChild(uiText);
        }
    });
    unit.registerTestBtn("定时添加删除UIText", function () {
        var textCount = 0;
        function create() {
            egret.setTimeout(function () {
                textCount++;
                var uiText = new mo.UIText();
                uiText.setText(getTextStr());
                uiText.setFontSize(60);
                uiText.anchorX = 0.5;
                uiText.anchorY = 0.5;
                uiText.x = unit.testContainer.width * Math.random();
                uiText.y = unit.testContainer.height * Math.random();
                unit.testContainer.addChild(uiText);
                console.log("textCount------>" + textCount);
                if (unit.testContainer.numChildren > 5) {
                    textCount--;
                    unit.testContainer.removeChildAt(0);
                }
                create();
            }, this, 500);
        }
        create();
    });
    unit.registerTestBtn("定时添加删除400UIText", function () {
        var textCount = 0;
        function create() {
            egret.setTimeout(function () {
                if (unit.testContainer.numChildren) {
                    unit.testContainer.removeChildren();
                }
                textCount++;
                console.log("textCount------>" + textCount);
                var count = 400;
                for (var i = 0; i < count; ++i) {
                    var uiText = new egret.TextField();
                    uiText.text = getTextStr();
                    uiText.size = 60;
                    uiText.anchorX = 0.5;
                    uiText.anchorY = 0.5;
                    uiText.x = unit.testContainer.width * Math.random();
                    uiText.y = unit.testContainer.height * Math.random();
                    unit.testContainer.addChild(uiText);
                }
                create();
            }, this, 500);
        }
        create();
    });
})(unit || (unit = {}));
