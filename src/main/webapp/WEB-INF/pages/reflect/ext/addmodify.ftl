Ext.define("${appSignName}.view.main.${appSignName}AddModify", {
    extend : "Ext.window.Window",
    alias : "widget.${appSignName}AddModify",
    title : "新增",
    width : 400,
    height : 320,
    layout : "fit",
    modal : true,
    items : {
        xtype : "form",
        margin : 5,
        border : false,
        layout : "column",
        fieldDefaults : {
            msgTarget : 'qtip',
            margin : '5 0 5 30 ',
            labelWidth : 100,
            columnWidth : 0.99,
            labelAlign: 'left',
            regex : /^\S*$/,
            regexText : '不能含有空格',
            labelSeparator:''
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
                    xtype : '${field.xtype}'
                }<#if !field?is_last>,</#if>
            </#list>
            ]
        },
        </#list>

        ],

        buttons : [ {
            text : '重置',
            action : 'reset'
        },{
            text : '保存',
            action : 'submit'
        }]
    }
});
