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
    }],
    buttons : [{
        text : '查询',
        action : 'query'
    }]
});