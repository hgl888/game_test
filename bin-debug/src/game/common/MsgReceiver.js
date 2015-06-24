var uw;
(function (uw) {
    function initMsgReceiver() {
        pomelo.on(uw.c_prop.receiverKey.onTaskChanged, function (result) {
            var taskEntity = result[uw.RESP_VALUE];
            uw.debug("通知任务更新：uw.c_prop.receiverKey.onTaskChanged--->", taskEntity);
            uw.userDataCtrl._updateTasks(taskEntity);
        });
        //神秘商店出现的通知
        pomelo.on(uw.c_prop.receiverKey.onSecretShopChanged, function (result) {
            var shopAppearData = result[uw.RESP_VALUE];
            var shopEntity = shopAppearData[uw.dsConsts.SecretShopAppearData.shopEntity];
            var shopFlag = shopAppearData[uw.dsConsts.SecretShopAppearData.shopFlag]; //1:神秘1、2：神秘2、3：全部
            uw.shopDataCtrl.reset(shopEntity);
            uw.shopDataCtrl.updateTraderStatus();
            uw.shopDataCtrl.pushNotify(uw.ShopDataCtrl.ON_SECRET_SHOP_APPEAR, shopFlag);
        });
    }
    uw.initMsgReceiver = initMsgReceiver;
})(uw || (uw = {}));
