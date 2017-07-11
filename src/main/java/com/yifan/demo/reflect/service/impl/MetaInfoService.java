package com.yifan.demo.reflect.service.impl;

import com.yifan.demo.base.config.FieldMeta;
import com.yifan.demo.reflect.dto.ColumnMetaInfoDto;
import com.yifan.demo.reflect.service.IMetaInfoService;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by dengyin on 17-7-11.
 */
@Service
public class MetaInfoService implements IMetaInfoService {


    @Resource
    private BasicDataSource dataSource;


    @Override
    public List<ColumnMetaInfoDto> getMetaInfo(String tableName) {
        List<ColumnMetaInfoDto> list = new ArrayList<ColumnMetaInfoDto>();

        Connection connection = null;
        try {

            connection = dataSource.getConnection();
            DatabaseMetaData metaData = connection.getMetaData();
            ResultSet rs = metaData.getColumns(connection.getCatalog(), null, tableName, null);
            while(rs.next()){
                String curColumnName = rs.getString("COLUMN_NAME");
                String curDataType = rs.getString("TYPE_NAME");
                String curRemark = rs.getString("REMARKS");
                ColumnMetaInfoDto curDto = new ColumnMetaInfoDto(curColumnName,curDataType,curRemark);
                list.add(curDto);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if(!connection.isClosed()){
                    connection.close();
                }
            }catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return list;
    }

    @Override
    public List<ColumnMetaInfoDto> getClassInfo(String dtoSignName) {
        List<ColumnMetaInfoDto> dtoList = new ArrayList<ColumnMetaInfoDto>();
        try {
            Class<?> targetClass = Class.forName(dtoSignName);
            Field[] declaredFields = targetClass.getDeclaredFields();
            for(Field curField : declaredFields){
                String curFieldName = curField.getName();
                String curFieldTypeName = curField.getType().getSimpleName();
                System.out.println(curFieldName + " " + curFieldTypeName);

                //获取字段上的注释
                FieldMeta meta = curField.getAnnotation(FieldMeta.class);
                String curRemark = curFieldName;

                if(meta != null){
                    curRemark = meta.name();
                }

                dtoList.add(new ColumnMetaInfoDto(curFieldName,curFieldTypeName,curRemark));
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return dtoList;
    }
}
