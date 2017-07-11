package com.yifan.demo.reflect.vo;

import com.yifan.demo.reflect.dto.ColumnMetaInfoDto;

import java.io.Serializable;
import java.util.List;

/**
 * Created by dengyin on 17-7-11.
 */
public class ColumnMetaInfoVo implements Serializable {
    private static final long serialVersionUID = -3447783997870999051L;

    private ColumnMetaInfoDto columnMetaInfoDto;
    private List<ColumnMetaInfoDto> columnMetaInfoDtoList;

    private int totalCount;
    private String tableName;

    private String dtoSignName;


    public ColumnMetaInfoDto getColumnMetaInfoDto() {
        return columnMetaInfoDto;
    }

    public void setColumnMetaInfoDto(ColumnMetaInfoDto columnMetaInfoDto) {
        this.columnMetaInfoDto = columnMetaInfoDto;
    }

    public List<ColumnMetaInfoDto> getColumnMetaInfoDtoList() {
        return columnMetaInfoDtoList;
    }

    public void setColumnMetaInfoDtoList(List<ColumnMetaInfoDto> columnMetaInfoDtoList) {
        this.columnMetaInfoDtoList = columnMetaInfoDtoList;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getDtoSignName() {
        return dtoSignName;
    }

    public void setDtoSignName(String dtoSignName) {
        this.dtoSignName = dtoSignName;
    }
}
