/**
 * Created by yifan on 17-7-12.
 */
Ext.define("reflectDemo.view.grid.view", {
    extend : "Ext.window.Window",
    alias : "widget.reflectDemoGridView",
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
                    defaultType : 'textfield',
                    defaults:{
                        margin:5
                    },
                    items : [
                        {
                            fieldLabel : '应用名',
                            name : 'appSignName',
                            emptyText:'应用名',
                            value: 'table'
                        }
                    ]
                },
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