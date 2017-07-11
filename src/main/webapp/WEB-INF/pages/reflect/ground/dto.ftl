package ${packageName};

import com.yifan.demo.base.config.FieldMeta;

import java.io.Serializable;

/**
* Created by dengyin on ${.now}
*/
public class ${dtoClassName} implements Serializable{

    @FieldMeta(serialno = true,name = "序列号")
    private static final long serialVersionUID = 5980925856053925754L;

    <#list columnMetaInfoDtoList as meta>
    @FieldMeta(name = "${meta.remark}")
    private ${meta.typeName} ${meta.columnName};

    </#list>



    <#list columnMetaInfoDtoList as meta>
    public void set${meta.upperColumnName}(${meta.typeName} ${meta.columnName}){
        this.${meta.columnName} = ${meta.columnName};
    }

    public ${meta.typeName} get${meta.upperColumnName}(){
        return this.${meta.columnName};
    }

    </#list>

}
