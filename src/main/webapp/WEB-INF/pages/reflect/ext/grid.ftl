Ext.define('${appSignName}.view.main.${defaultGridName}', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.${gridAlignName}',
    <#if defaultStoreName != null>
    store:'${defaultStoreName}',
    </#if>
    region: 'center',
    width: '100%',
    emptyText: '查询结果为空',
    viewConfig: {
        enableTextSelection: true
    },
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns: {
        defaults: {
            align: 'center'
        },
        items: [
            {
                text:'序号',
                width:50,
                xtype: 'rownumberer',
            },

            <#list columnMetaInfoDtoList as meta>
            {
                text:'${meta.remark}',
                width:80,
                dataIndex:'${meta.columnName}'
            }<#if !meta?is_last>,</#if>
            </#list>

        ]
    },
    dockedItems:[
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                '->',
                {xtype:'addbutton',text:'新增',action:'add'},
                {xtype:'updatebutton',text:'修改',action:'modify'},
                {xtype:'deletebutton',text:'删除',action:'remove'},
                {xtype:'exportbutton',text:'导出',action:'export'}
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
