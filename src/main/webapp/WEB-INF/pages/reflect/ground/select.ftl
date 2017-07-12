SELECT
<#list columnMetaInfoDtoList as field>
   T.${field.columnName}<#if !field?is_last>,</#if>
</#list>
FROM ${tableName?upper_case} T
WHERE 1=1

<#list columnMetaInfoDtoList as field>

<!-- ${field.remark} -->
<if test="${field.columnName} != null and ${field.columnName} != "">
    AND T.${field.columnName} = ${"#{"}${field.columnName},jdbcType=${field.typeName}}
</if>

</#list>