/**
 * Created by yifan on 17-7-11.
 */
Ext.define("reflectDemo.view.dto.view", {
    extend : "Ext.window.Window",
    alias : "widget.reflectDemoDtoView",
    width : 300,
    height : 200,
    title:'Dto使用',
    layout : "fit",
    modal : true,
    items : {
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
                        fieldLabel : '包名',
                        name : 'packageName',
                        emptyText:'涉及类时请填写包名'
                    },{
                        fieldLabel : 'Dto类名',
                        name : 'dtoClassName',
                        emptyText:'点击DTO时使用'
                    }
                ]
            }
        ]
    },
    buttons : [{
        text : 'Dto',
        action : 'executeDto'
    }]
});