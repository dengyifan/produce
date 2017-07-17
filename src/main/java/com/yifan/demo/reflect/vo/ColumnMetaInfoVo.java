package com.yifan.demo.reflect.vo;

import com.yifan.demo.reflect.dto.ColumnMetaInfoDto;
import com.yifan.demo.reflect.dto.ExtFormFieldDto;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Created by dengyin on 17-7-11.
 */
public class ColumnMetaInfoVo implements Serializable {
    private static final long serialVersionUID = -3447783997870999051L;

    private ColumnMetaInfoDto columnMetaInfoDto;

    //应用模块名
    private String appModuleName;

    //应用名
    private String appSignName;

    //controller 默认文件名
    private String defaultControllerName;

    //model 默认文件名
    private String defaultModelName;

    //store 默认文件名
    private String defaultStoreName;

    private String defaultGridName;


    //store 请求 url
    private String storeProxyUrl;

    //store 响应数据属性名 默认 mainDtoList;
    private String storeProxyRootProperty;

    //查询条件字段集合
    private List<ExtFormFieldDto> extFormFieldDtoList;

    //查询结果字段集合
    private List<ColumnMetaInfoDto> columnMetaInfoDtoList;


    private Map<String,List<ExtFormFieldDto>> extFormListMap;



    private String searchSignName;
    private String searchAlignName;

    private String gridSignName;
    private String gridAlignName;

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

    private String downloadFilePath;
    private String downloadFileName;


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

    public Map<String, List<ExtFormFieldDto>> getExtFormListMap() {
        return extFormListMap;
    }

    public void setExtFormListMap(Map<String, List<ExtFormFieldDto>> extFormListMap) {
        this.extFormListMap = extFormListMap;
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

    public String getGridSignName() {
        return gridSignName;
    }

    public void setGridSignName(String gridSignName) {
        this.gridSignName = gridSignName;
    }

    public String getGridAlignName() {
        return gridAlignName;
    }

    public void setGridAlignName(String gridAlignName) {
        this.gridAlignName = gridAlignName;
    }

    public String getAppModuleName() {
        return appModuleName;
    }

    public void setAppModuleName(String appModuleName) {
        this.appModuleName = appModuleName;
    }

    public String getAppSignName() {
        return appSignName;
    }

    public void setAppSignName(String appSignName) {
        this.appSignName = appSignName;
    }

    public String getDefaultControllerName() {
        return defaultControllerName;
    }

    public void setDefaultControllerName(String defaultControllerName) {
        this.defaultControllerName = defaultControllerName;
    }

    public String getDefaultModelName() {
        return defaultModelName;
    }

    public void setDefaultModelName(String defaultModelName) {
        this.defaultModelName = defaultModelName;
    }

    public String getDefaultStoreName() {
        return defaultStoreName;
    }

    public void setDefaultStoreName(String defaultStoreName) {
        this.defaultStoreName = defaultStoreName;
    }

    public String getStoreProxyUrl() {
        return storeProxyUrl;
    }

    public void setStoreProxyUrl(String storeProxyUrl) {
        this.storeProxyUrl = storeProxyUrl;
    }

    public String getStoreProxyRootProperty() {
        return storeProxyRootProperty;
    }

    public void setStoreProxyRootProperty(String storeProxyRootProperty) {
        this.storeProxyRootProperty = storeProxyRootProperty;
    }


    public String getDownloadFilePath() {
        return downloadFilePath;
    }

    public void setDownloadFilePath(String downloadFilePath) {
        this.downloadFilePath = downloadFilePath;
    }

    public String getDownloadFileName() {
        return downloadFileName;
    }

    public void setDownloadFileName(String downloadFileName) {
        this.downloadFileName = downloadFileName;
    }

    public String getDefaultGridName() {
        return defaultGridName;
    }

    public void setDefaultGridName(String defaultGridName) {
        this.defaultGridName = defaultGridName;
    }
}
