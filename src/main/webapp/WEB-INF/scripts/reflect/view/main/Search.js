/**
 * Created by yifan on 17-7-4.
 */
Ext.define("reflectDemo.view.main.Search", {
    extend : "Ext.form.Panel",
    alias : 'widget.reflectDemoSearch',
    region : 'north',
    height:120,
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
            title:'查询',
            layout : 'column',
            defaultType : 'textfield',
            items : [
                {
                    fieldLabel : '表名',
                    name : 'tableName'
                },{
                    fieldLabel : 'Dto签名',
                    name : 'dtoSignName'
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