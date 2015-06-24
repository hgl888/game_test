/**
 * Created by lihex on 3/5/15.
 */
var uiHelper;
(function (uiHelper) {
    function setLayoutType(panel, layoutType /*mo.LayoutType*/) {
        //panel.layoutType = mo.LayoutType.linearHorizontal;
        panel.layoutType = layoutType;
    }
    uiHelper.setLayoutType = setLayoutType;
    function setLinearLayoutParameter(widget, gravity, margin) {
        var parameter = mo.LinearLayoutParameter.create();
        //var gravity = mo.LinearGravity.centerVertical;
        var gravity = gravity;
        parameter.setGravity(gravity);
        parameter.setMargin(margin);
        widget.setLayoutParameter(parameter);
    }
    uiHelper.setLinearLayoutParameter = setLinearLayoutParameter;
    function createBubble(container, text, pos, bpSrcW, txtHAlgin) {
        if (pos === void 0) { pos = mo.p(0, 0); }
        if (bpSrcW === void 0) { bpSrcW = 600; }
        if (txtHAlgin === void 0) { txtHAlgin = "center"; }
        var txtSrcH = 130;
        var bpSrcH = 202;
        var bubblePanel = mo.createS9GPanel(bpSrcW, bpSrcH, res.ui_panel.blk9_babble4_png);
        bubblePanel.anchorX = 0.5;
        bubblePanel.anchorY = 1;
        bubblePanel.layoutType = mo.LayoutType.relative;
        //相对居中对齐
        var parameter = mo.RelativeLayoutParameter.create();
        parameter.align = mo.RelativeAlign.centerInParent;
        var labelText = mo.UIText.create();
        labelText.setAreaSize(bpSrcW - 60, txtSrcH);
        labelText.setLayoutParameter(parameter);
        labelText.setFontSize(50);
        labelText.setHAlign(txtHAlgin);
        labelText.setAutoSizeHeight(true);
        labelText.color = mo.BLACK;
        bubblePanel.addChild(labelText);
        labelText.setText(text);
        var size = labelText.getSize();
        bubblePanel.height = bpSrcH + (size.height > txtSrcH ? (size.height - txtSrcH) : 0);
        bubblePanel.doLayout();
        var pointer = mo.UIImage.create();
        pointer.loadTexture(res.ui_common.ico_arw_png);
        pointer.anchorX = 0.5;
        pointer.anchorY = 1;
        pointer.x = pos.x;
        pointer.y = pos.y;
        bubblePanel.x = pointer.width / 2;
        pointer.addChild(bubblePanel);
        container.addChild(pointer);
        return pointer;
    }
    uiHelper.createBubble = createBubble;
    /**
     * 将UIPanel的锚点转到0.5,0.5
     * @param panel
     */
    function apTransform(panel) {
        var srcPos = panel.getPosition();
        var srcAp = panel.getAnchorPoint();
        var targetAp = mo.p(0.5, 0.5);
        var newPos = mo.p(srcPos.x + (targetAp.x - srcAp.x) * panel.width, srcPos.y + (targetAp.y - srcAp.y) * panel.height);
        panel.setAnchorPoint(targetAp);
        panel.setPosition(newPos);
    }
    uiHelper.apTransform = apTransform;
})(uiHelper || (uiHelper = {}));
