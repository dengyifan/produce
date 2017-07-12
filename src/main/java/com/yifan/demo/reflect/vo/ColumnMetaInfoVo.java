package com.yifan.demo.reflect.vo;

import com.yifan.demo.reflect.dto.ColumnMetaInfoDto;
import com.yifan.demo.reflect.dto.ExtFormFieldDto;

import java.io.Serializable;
import java.util.List;

/**
 * Created by dengyin on 17-7-11.
 */
public class ColumnMetaInfoVo implements Serializable {
    private static final long serialVersionUID = -3447783997870999051L;

    private ColumnMetaInfoDto columnMetaInfoDto;
    private List<ColumnMetaInfoDto> columnMetaInfoDtoList;


    private String searchSignName;
    private String searchAlignName;
    private List<ExtFormFieldDto> extFormFieldDtoList;

    private int totalCount;
    private String tableName;

    private String dtoSignName;

    //Dto 类名 用于 点击 Dto 时使用
    private String dtoClassName;

    //涉及类时 需要填写包名 这里给一个默认值
    private String packageName = "com.yifan.demo.reflect.dto";

    //Model 签名
    private String modelSignName;

    //是否存在日期字段
    private boolean containsDate;


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

    public String getDtoClassName() {
        return dtoClassName;
    }

    public void setDtoClassName(String dtoClassName) {
        this.dtoClassName = dtoClassName;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getModelSignName() {
        return modelSignName;
    }

    public void setModelSignName(String modelSignName) {
        this.modelSignName = modelSignName;
    }

    public boolean isContainsDate() {
        return containsDate;
    }

    public void setContainsDate(boolean containsDate) {
        this.containsDate = containsDate;
    }

    public List<ExtFormFieldDto> getExtFormFieldDtoList() {
        return extFormFieldDtoList;
    }

    public void setExtFormFieldDtoList(List<ExtFormFieldDto> extFormFieldDtoList) {
        this.extFormFieldDtoList = extFormFieldDtoList;
    }

    public String getSearchSignName() {
        return searchSignName;
    }

    public void setSearchSignName(String searchSignName) {
        this.searchSignName = searchSignName;
    }

    public String getSearchAlignName() {
        return searchAlignName;
    }

    public void setSearchAlignName(String searchAlignName) {
        this.searchAlignName = searchAlignName;
    }
}
