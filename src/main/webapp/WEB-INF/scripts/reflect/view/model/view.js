/**
 * Created by yifan on 17-7-11.
 */
Ext.define("reflectDemo.view.model.view", {
    extend : "Ext.window.Window",
    alias : "widget.reflectDemoModelView",
    width : 300,
    height : 200,
    title:'Model使用',
    layout : "fit",
    modal : true,
    items : {
        xtype : "form",
        margin : 5,
        border : false,
        layout : "column",
        items : [
            {
                layout : 'column',
                defaultType : 'textfield',
                items : [
                    {
                        fieldLabel : 'Model签名',
                        name : 'modelSignName',
                        emptyText:'Model签名'
                    }
                ]

            }
        ]
    },
    buttons : [{
        text : 'Model',
        action : 'executeModel'
    }]
});
