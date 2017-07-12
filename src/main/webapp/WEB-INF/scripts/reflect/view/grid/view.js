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
                            fieldLabel : '签名',
                            name : 'gridSignName',
                            emptyText:'完整签名'
                        },{
                            fieldLabel : '别名',
                            name : 'gridAlignName',
                            emptyText:'别名'
                        }
                    ]
                },
                {
                    layout : 'column',
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