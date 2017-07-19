/**
 * Created by yifan on 17-7-4.
 */
/**
 * 客户信息GRID
 */
Ext.define("reflectDemo.view.main.List", {
    extend: "Ext.grid.Panel",
    alias: 'widget.reflectDemoGrid',
    store: "main",
    region: 'center',
    width: '100%',
    emptyText: '查询结果为空',
    viewConfig: {
        enableTextSelection: true
    },
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns: {
        defaults: {
            align: 'left'
        },
        items: [
            {text: '序号', width: 50, xtype: 'rownumberer', align: 'center'},
            {text: '字段名', dataIndex: 'columnName', flex: 2},
            {text: '类型', dataIndex: 'typeName', flex: 1.5},
            {text: '注释', dataIndex: 'remark', flex: 1},
        ]
    },
    dockedItems:[
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                '->',
                {xtype:'button',text:'Model',action:'model'},
                {xtype:'button',text:'Search',action:'search'},
                {xtype:'button',text:'Grid',action:'grid'},
                {xtype:'button',text:'Dto',action:'dto'},
                {xtype:'button',text:'SelectSql',action:'selectSql'},
                {xtype:'button',text:'InsertSql',action:'insertSql'},
                {xtype:'button',text:'UpdateSql',action:'updateSql'},
                {xtype:'button',text:'OneStep',action:'oneStep'},
                {xtype:'button',text:'sqlParse',action:'sqlParse'},
                {xtype:'button',text:'说明',action:'introduce'}
            ]
        }
    ],
    pagingToolbar: null,
    getPagingToolbar: function () {
        if (this.pagingToolbar == null) {
            this.pagingToolbar = Ext.create('Ext.toolbar.Paging', {
                store: this.store,
                dock: 'bottom',
                displayInfo: true
            });
        }
        return this.pagingToolbar;
    },
    constructor: function (config) {
        var me = this, cfg = Ext.apply({}, config);
        me.bbar = me.getPagingToolbar();
        me.callParent([cfg]);
    }
});
