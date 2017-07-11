package com.yifan.demo.reflect.service;

import com.yifan.demo.reflect.dto.ColumnMetaInfoDto;
import com.yifan.demo.reflect.vo.ColumnMetaInfoVo;

import java.util.List;

/**
 * Created by dengyin on 17-7-11.
 */
public interface IMetaInfoService {

    public List<ColumnMetaInfoDto> getMetaInfo(String tableName);

    public List<ColumnMetaInfoDto> getClassInfo(String dtoSignName);

    public String ftlParse(String viewName, ColumnMetaInfoVo vo);

}
