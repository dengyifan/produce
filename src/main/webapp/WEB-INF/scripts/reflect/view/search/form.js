/**
 * Created by yifan on 17-7-6.
 */
Ext.define("reflectDemo.view.search.form", {
    extend:'Ext.form.Panel',
    alias: 'widget.reflectDemoViewSearchForm',
    title:'字段标签选择',
    collapsible:false,
    region:'north',
    defaults:{
        labelWidth:70,
        labelAlign:'right'
    },
    height:'80%',
    autoScroll:true,
    dockedItems:[{
        xtype:'toolbar',
        dock:'bottom',
        items:[
            '->',
            {xtype:'button',text:'预览',action:'searchPreview'},
            {xtype:'button',text:'源码',action:'searchCode'},
            {xtype:'button',text:'Params',action:'params'}
        ]
    }
    ],
    constructor: function(config) {
        var me = this,
            cfg = Ext.apply({}, config);
        me.items = cfg.columnArr;
        me.callParent([cfg]);
    }
});