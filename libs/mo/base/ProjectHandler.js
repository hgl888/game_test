var mo;
(function (mo) {
    var Project = (function () {
        function Project() {
            this.logLvl = {};
            this.renderMode = 0;
            this.showFPS = false;
            this.frameRate = 60;
            this.version = "0.1.0";
            this.logServer = false;
            this.isDev = false;
            this.resLimit = 100;
            this.audioEnabled = false;
            this.guideEnabled = false;
            this.isSandBox = true;
            this.isValidIAP = false;
            this.armatureDemoEnabled = 0;
            this.fightAreaEnabled = false;
            this.fightSimulateEnabled = true;
            this.ccaContentScale = 0.85;
            this.fightDebugMode = false;
            this.openRecharge = false;
            this.option = {};
            //以后可能删除的
            this.isScatterMode = false;
        }
        var __egretProto__ = Project.prototype;
        Project.setData = function (project, data) {
            project.logLvl = data["logLvl"] || project.logLvl;
            project.renderMode = data["renderMode"] || project.renderMode;
            project.showFPS = data["showFPS"] != null ? data["showFPS"] : project.showFPS;
            project.frameRate = data["frameRate"] || project.frameRate;
            project.version = data["version"] || project.version;
            project.assetsHost = data["assetsHost"] || project.assetsHost;
            project.assetsPort = data["assetsPort"] || project.assetsPort;
            project.httpHost = data["httpHost"] || project.httpHost;
            project.httpPort = data["httpPort"] || project.httpPort;
            project.logServer = data["logServer"] != null ? data["logServer"] : project.logServer;
            project.isDev = data["isDev"] != null ? data["isDev"] : project.isDev;
            if (data["design"])
                project.design = mo.size(data["design"]["width"], data["design"]["height"]);
            if (data["resolution"])
                project.resolution = mo.size(data["resolution"]["width"], data["resolution"]["height"]);
            project.resLimit = data["resLimit"] != null ? data["resLimit"] : project.resLimit;
            project.audioEnabled = data["audioEnabled"] != null ? data["audioEnabled"] : project.audioEnabled;
            project.guideEnabled = data["guideEnabled"] != null ? data["guideEnabled"] : project.guideEnabled;
            project.isSandBox = data["isSandBox"] != null ? data["isSandBox"] : project.isSandBox;
            project.isValidIAP = data["isValidIAP"] != null ? data["isValidIAP"] : project.isValidIAP;
            project.armatureDemoEnabled = data["armatureDemoEnabled"] != null ? data["armatureDemoEnabled"] : project.armatureDemoEnabled;
            project.fightAreaEnabled = data["fightAreaEnabled"] != null ? data["fightAreaEnabled"] : project.fightAreaEnabled;
            project.fightSimulateEnabled = data["fightSimulateEnabled"] != null ? data["fightSimulateEnabled"] : project.fightSimulateEnabled;
            project.ccaContentScale = data["ccaContentScale"] || project.ccaContentScale;
            project.channelId = data["channelId"] != null ? data["channelId"] : project.channelId;
            project.option = data["option"] || project.option;
            project.fightDebugMode = data["fightDebugMode"] || project.fightDebugMode;
            project.openRecharge = data["openRecharge"] || project.openRecharge;
            project.isScatterMode = data["isScatterMode"] != null ? data["isScatterMode"] : project.isScatterMode;
        };
        return Project;
    })();
    mo.Project = Project;
    Project.prototype.__class__ = "mo.Project";
    mo.project;
    var _projectHandler = new egret.EventDispatcher();
    function onProjectJsonOnce(listener, ctx) {
        var func = function () {
            _projectHandler.removeEventListener("projectJson", func, null);
            listener.call(ctx);
        };
        _projectHandler.addEventListener("projectJson", func, null);
    }
    mo.onProjectJsonOnce = onProjectJsonOnce;
    function loadProject(cb, ctx) {
        var resArr = ["resource/project.json"];
        if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5) {
            var resCfgItem = new res.ResCfgItem();
            resCfgItem.url = "resource/myProject.json";
            resArr.push(resCfgItem);
        }
        res.load(resArr, function (err, results) {
            mo.project = new Project();
            Project.setData(mo.project, results[0]);
            if (results[1])
                Project.setData(mo.project, results[1]);
            if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5) {
                Project.setData(mo.project, global["project"]);
            }
            if (_projectHandler.willTrigger("projectJson")) {
                var event = new mo.Event("projectJson");
                _projectHandler.dispatchEvent(event);
            }
            var logLvl = mo.project.logLvl;
            if (typeof logLvl == "number") {
                logger.setLvl("default", logLvl);
            }
            else {
                var logLvlDefault = logLvl["default"];
                if (logLvlDefault != null)
                    logger.setLvl("default", logLvlDefault);
                for (var mName in logLvl) {
                    if (mName == "all")
                        continue;
                    logger.setLvl(mName, logLvl[mName]);
                }
            }
            cb.call(ctx, mo.project);
        });
    }
    mo.loadProject = loadProject;
})(mo || (mo = {}));
