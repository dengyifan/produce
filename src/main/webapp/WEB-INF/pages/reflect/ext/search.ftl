Ext.define("${searchSignName}", {
    extend : "Ext.form.Panel",
    alias : 'widget.${searchAlignName}',
    width : '100%',
    height : 80,
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
    items : [

        <#list extFormFieldDtoList as field>
        {
            fieldLabel : '${field.fieldLabel}',
            name : '${field.name}'<#if field.xtype != 'textfield'>,</#if>
            <#if field.xtype != 'textfield'>xtype : '${field.xtype}'</#if>
        },
        </#list>
    ],
    buttons : [{
        xtype:'button',
        text: '查询',
        action: 'search'
    },{
        xtype:'button',
        text: '重置',
        action: 'reset'
    }]
});