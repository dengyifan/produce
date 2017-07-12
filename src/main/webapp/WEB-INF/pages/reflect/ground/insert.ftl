INSERT INTO ${tableName?upper_case}(
<#list columnMetaInfoDtoList as field>
    ${field.columnName}<#if !field?is_last>,</#if>
</#list>
) VALUES (
<#list columnMetaInfoDtoList as field>
    <!-- ${field.remark} -->
    ${"#{"}${field.columnName},jdbcType=${field.typeName}}<#if !field?is_last>,</#if>

</#list>
)