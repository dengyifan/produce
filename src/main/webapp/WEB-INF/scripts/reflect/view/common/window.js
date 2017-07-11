/**
 * Created by yifan on 17-7-5.
 */

Ext.define("reflectDemo.view.common.window", {
    extend : "Ext.window.Window",
    alias : "widget.reflectDemoCommonWin",
    width : 500,
    height : 500,
    layout : "fit",
    modal : true,
    items : {
        xtype : "form",
        margin : 5,
        border : false,
        layout : "column",
        items : [{
            xtype:'textareafield',
            name: 'sqlCnt',
            width:'100%',
            height:'100%'
        }]
    }
});
