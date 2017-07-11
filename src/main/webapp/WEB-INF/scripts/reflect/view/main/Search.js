/**
 * Created by yifan on 17-7-4.
 */
Ext.define("reflectDemo.view.main.Search", {
    extend : "Ext.form.Panel",
    alias : 'widget.reflectDemoSearch',
    width : '100%',
    height : 120,
    layout : 'column',
    region : 'north',
    defaults : {
        msgTarget : 'qtip',
        margin: '15 10 5 0',
        labelWidth : 100,
        columnWidth : 0.25,
        labelAlign : 'right'
    },
    defaultType : 'textfield',
    items : [{
        fieldLabel : '表名',
        name : 'tableName'
    },{
        fieldLabel : 'Dto签名',
        name : 'dtoSignName'
    },{
        fieldLabel : '包名',
        name : 'packageName',
        emptyText:'涉及类时请填写包名'
    },{
        fieldLabel : 'Dto类名',
        name : 'dtoClassName',
        emptyText:'点击DTO时使用'
    }],
    buttons : [{
        text : '查询',
        action : 'query'
    }]
});