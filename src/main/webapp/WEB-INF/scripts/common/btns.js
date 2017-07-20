/**
 * Created by yifan on 17-7-20.
 */
/**
 * 字体图标按钮定义
 */
//新增按钮
Ext.define('squirrel.commonButton.CommonAddButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.addbutton',
    glyph : 0xf055,
    cls: 'add-btn-item'
});
//删除按钮
Ext.define('squirrel.commonButton.CommonDeleteButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.deletebutton',
    glyph : 0xf014,
    cls: 'delete-btn-item'
});
//修改编辑按钮
Ext.define('squirrel.commonButton.CommonUpdateButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.updatebutton',
    glyph : 0xf044,
    cls: 'update-btn-item'
});
//设置按钮
Ext.define('squirrel.commonButton.CommonSettingsButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.settingsbutton',
    glyph : 0xf085,
    cls: 'settings-btn-item'
});
//刷新
Ext.define('squirrel.commonButton.CommonRefreshButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.refreshbutton',
    glyph : 0xf021,
    cls: 'settings-btn-item'
});
//下载按钮
Ext.define('squirrel.commonButton.CommonDownloadButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.downloadbutton',
    glyph : 0xf08e,
    cls: 'download-btn-item'
});
//上传按钮
Ext.define('squirrel.commonButton.CommonUploadButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.uploadbutton',
    glyph : 0xf093,
    cls: 'upload-btn-item'
});
//查询按钮
Ext.define('squirrel.commonButton.CommonSearchButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.searchbutton',
    glyph : 0xf00e,
    cls: 'search-btn-item'
});
//关闭按钮
Ext.define('squirrel.commonButton.CommonCloseButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.closebutton',
    glyph : 0xf00d,
    cls: 'delete-btn-item'
});

//支付按钮
Ext.define('squirrel.commonButton.CommonPaypalButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.paypalbutton',
    glyph : 0xf1ed,
    cls: 'paypal-btn-item'
});

//人民币（金额处理）按钮
Ext.define('squirrel.commonButton.CommonRmbButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.rmbbutton',
    glyph : 0xf157,
    cls: 'rmb-btn-item'
});

//打印按钮
Ext.define('squirrel.commonButton.CommonPrintButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.printbutton',
    glyph : 0xf02f,
    cls: 'print-btn-item'
});

//图表按钮
Ext.define('squirrel.commonButton.CommonChartButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.chartbutton',
    glyph : 0xf080,
    cls: 'chart-btn-item'
});

//汽车按钮
Ext.define('squirrel.commonButton.CommonTruckButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.truckbutton',
    glyph : 0xf0d1,
    cls: 'truck-btn-item'
});

//拷贝（导入）按钮
Ext.define('squirrel.commonButton.CommonExportButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.exportbutton',
    glyph : 0xf0c5,
    cls: 'export-btn-item'
});
//导入开单
Ext.define('squirrel.commonButton.CommonLevelDownButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.develdownbutton',
    glyph : 0xf149,
    cls: 'export-btn-item'
});
//用户
Ext.define('squirrel.commonButton.CommonUserButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.userbutton',
    glyph : 0xf007,
    cls: 'export-btn-item'
});

//提交
Ext.define('squirrel.commonButton.CommonSubmitButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.submitbutton',
    glyph : 0xf00c,
    cls: 'export-btn-item'
});

//审核
Ext.define('squirrel.commonButton.CommonAuditButton', {
    extend : 'Ext.button.Button',
    alias: 'widget.auditbutton',
    glyph : 0xf14a,
    cls: 'export-btn-item'
});

//回复
Ext.define('squirrel.commonButton.CommonReplyButton',{
    extend:'Ext.button.Button',
    alias:'widget.replyButton',
    glyph: 0xf112,
    cls: 'export-btn-item'
});
//请求刷新
Ext.define('squirrel.commonButton.CommonRepeatButton',{
    extend:'Ext.button.Button',
    alias:'widget.repeatButton',
    glyph: 0xf021,
    cls: 'export-btn-item'
});
//图片上传
Ext.define('ty.commonButton.CommonImgUpButton',{
    extend:'Ext.button.Button',
    alias:'widget.imgUpButton',
    glyph: 0xf1c5,
    cls: 'upload-btn-item'
});