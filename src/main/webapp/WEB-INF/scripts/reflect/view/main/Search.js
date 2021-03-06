/**
 * Created by yifan on 17-7-4.
 */
Ext.define("reflectDemo.view.main.Search", {
    extend : "Ext.form.Panel",
    alias : 'widget.reflectDemoSearch',
    region : 'north',
    title:'查询',
    height:200,
    fieldDefaults: {
        labelWidth: 80,
        margin: '8 5 5 5',
        labelAlign : 'right',
        labelSeparator:'',
        width:200
    },
    constructor: function(config) {
        var me = this,
            cfg = Ext.apply({}, config);
        me.items = [{
            layout : 'column',
            defaultType : 'textfield',
            items : [
                {
                    fieldLabel : '表名',
                    name : 'tableName'
                },{
                    fieldLabel : 'Dto签名',
                    name : 'dtoSignName'
                },{
                    fieldLabel : 'select SQL',
                    name: 'sqlCnt'
                }
            ],
            buttons : [{
                text : '查询',
                action : 'query'
            }]
        }];

        me.callParent([cfg]);
    }
});