package com.yifan.demo.reflect.dao;

import com.yifan.demo.reflect.dto.ColumnMetaInfoDto;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by dengyin on 17-7-19.
 */

@Repository
public interface ReflectDao {

    @Select("SELECT COLUMN_NAME as columnName, " +
            "DATA_TYPE as typeName," +
            "column_comment as remark" +
            " FROM  INFORMATION_SCHEMA.Columns " +
            " WHERE table_name = '${tableName}' AND table_schema = 'test'")
    public List<ColumnMetaInfoDto> queryMetaInfo(@Param("tableName") String tableName);
}
