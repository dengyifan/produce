UPDATE ${tableName?upper_case}
<set>

<#list columnMetaInfoDtoList as field>

    <!-- ${field.remark} -->
    <if test="${field.columnName} != null and ${field.columnName} != "">
        ${field.columnName} = ${"#{"}${field.columnName},jdbcType=${field.typeName}}<#if !field?is_last>,</#if>
    </if>
</#list>

</set>
<where>
   id = ${"#{"}id,jdbcType=VARCHAR}
</where>