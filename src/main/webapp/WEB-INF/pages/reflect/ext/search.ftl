Ext.define("${appSignName}.view.main.${searchAlignName}", {
    extend : "Ext.form.Panel",
    alias : 'widget.${searchAlignName}',
    width : '100%',
    height : 200,
    region : 'north',
    fieldDefaults: {
        labelWidth: 95,
        margin: '8 5 5 5',
        labelAlign : 'right',
        labelSeparator:'',
        width:210
    },
    items : [


<#list extFormListMap?keys as curMapKey>
    {
        layout : 'column',
        defaults : {
            labelWidth : 40,
            labelAlign : "right",
        },
        defaults : {
            margins : '10 10 10 10'
        },
        items : [

            <#assign item = extFormListMap[curMapKey]>
            <#list item as field>
                {
                    fieldLabel : '${field.fieldLabel}',
                    name : '${field.name}',
                    xtype : '${field.xtype}'<#if field.xtype == 'datefield'>,format : 'Y-m-d'</#if>
                }<#if !field?is_last>,</#if>
            </#list>
        ]
    },

</#list>


    ],
    buttons : [{
        xtype:'button',
        text: '查询',
        action: 'mainQuery'
    },{
        xtype:'button',
        text: '重置',
        action: 'reset'
    }]
});