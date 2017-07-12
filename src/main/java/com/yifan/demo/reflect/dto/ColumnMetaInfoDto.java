package com.yifan.demo.reflect.dto;

import com.yifan.demo.base.config.FieldMeta;

import java.io.Serializable;

/**
 * Created by dengyin on 17-7-11.
 */
public class ColumnMetaInfoDto implements Serializable{

    @FieldMeta(serialno = true,name = "序列号")
    private static final long serialVersionUID = 5980925856053925754L;


    @FieldMeta(name = "列名")
    private String columnName;

    @FieldMeta(name = "首字母大写列名")
    private String upperColumnName;

    @FieldMeta(name = "类型")
    private String typeName;

    @FieldMeta(name = "备注")
    private String remark;

    @FieldMeta(name = "原始备注")
    private String oldRemark;

    @FieldMeta(name = "展示顺序")
    private int order;

    public ColumnMetaInfoDto(){}

    public ColumnMetaInfoDto(String columnName, String typeName,String remark) {
        this.columnName = columnName;
        this.typeName = typeName;
        this.remark = remark;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getOldRemark() {
        return oldRemark;
    }

    public void setOldRemark(String oldRemark) {
        this.oldRemark = oldRemark;
    }

    public String getUpperColumnName() {
        return upperColumnName;
    }

    public void setUpperColumnName(String upperColumnName) {
        this.upperColumnName = upperColumnName;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
