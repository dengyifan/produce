/**
 * Created by yifan on 17-7-12.
 */
Ext.define("reflectDemo.view.grid.view2", {
    extend : "Ext.window.Window",
    alias : "widget.reflectDemoGridView2",
    width : 300,
    height : 500,
    title :' Grid使用',
    layout : "fit",
    modal : true,
    buttons : [{
        text : 'Grid',
        action : 'executeGrid'
    }],
    constructor: function(config) {
        var me = this,
            cfg = Ext.apply({},config);

        var fieldOrderArr = cfg['fieldOrderArr'];

        me.items = [{
            xtype : "form",
            layout : "column",
            items : [
                {
                    layout : 'column',
                    title:'展示顺序设置',
                    defaultType : 'textfield',
                    autoScroll:true,
                    defaults:{
                        margin:5
                    },
                    items : fieldOrderArr
                }
            ]
        }];
        me.callParent([cfg]);
    }
});