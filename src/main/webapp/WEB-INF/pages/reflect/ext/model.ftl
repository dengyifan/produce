Ext.define('${appSignName}.model.${modelSignName}', {
    extend: 'Ext.data.Model',
    fields: [
        <#list columnMetaInfoDtoList as meta>
        { name: '${meta.columnName}' <#if meta.typeName == 'DATETIME'>,type:'date',dateFormat : 'time'</#if>}<#if !meta?is_last>,</#if>
        </#list>
    ]
});