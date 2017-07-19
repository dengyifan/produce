package com.yifan.demo.reflect.service.impl;

import com.alibaba.druid.sql.SQLUtils;
import com.alibaba.druid.sql.ast.SQLStatement;
import com.alibaba.druid.sql.ast.statement.*;
import com.alibaba.druid.sql.dialect.mysql.visitor.MySqlSchemaStatVisitor;
import com.alibaba.druid.stat.TableStat;
import com.alibaba.druid.util.JdbcConstants;
import com.yifan.demo.base.config.FieldMeta;
import com.yifan.demo.reflect.dao.ReflectDao;
import com.yifan.demo.reflect.dto.ColumnMetaInfoDto;
import com.yifan.demo.reflect.service.IMetaInfoService;
import com.yifan.demo.reflect.vo.ColumnMetaInfoVo;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import javax.annotation.Resource;
import java.io.BufferedWriter;
import java.io.IOException;
import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

/**
 * Created by dengyin on 17-7-11.
 */
@Service
public class MetaInfoService implements IMetaInfoService {


    @Resource
    private BasicDataSource dataSource;

    @Resource
    private ReflectDao reflectDao;

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


    @Override
    public String ftlParse(String viewName, ColumnMetaInfoVo vo){
        return null;
    }


    @Override
    public List<ColumnMetaInfoDto> queryMetaInfo(String tableName) {
        return reflectDao.queryMetaInfo(tableName);
    }



    /**
     * 根据一个 select sql 返回其查询的字段的信息集合
     * @param sqlCnt
     * @return
     */
    @Override
    public List<ColumnMetaInfoDto> getColumnInfoFromSql(String sqlCnt) {


        /********** 根据 sql parser 解析器 解析 select sql begin *************/

        List<SQLStatement> stmtList = SQLUtils.parseStatements(sqlCnt, JdbcConstants.MYSQL);

        //解析出的独立语句的个数
        //System.out.println("size is:" + stmtList.size());


        /**
         * 表名--List[Column]
         */
        Map<String,List<String>> tableColumnMap = new HashMap<>();

        Map<String,String> fieldAlignMap = new HashMap<>();

        //这边实际只会运行一次
        for (int i = 0; i < stmtList.size(); i++) {

            SQLStatement stmt = stmtList.get(i);
            MySqlSchemaStatVisitor visitor = new MySqlSchemaStatVisitor();
            stmt.accept(visitor);



            SQLSelect sqlSelect = ((SQLSelectStatement) stmt).getSelect();
            SQLSelectQuery sqlSelectQuery = sqlSelect.getQuery();

            /**
             * 这里面才是包含 查询 select 的字段 如
             * t.id
             * t.name
             * g.cnt as genderName
             */

            List<SQLSelectItem> sqlSelectItemList = ((SQLSelectQueryBlock) sqlSelectQuery).getSelectList();



            //获取字段名称
            Collection<TableStat.Column> columns = visitor.getColumns();
            //System.out.println("fields : " + columns);


            for (TableStat.Column column : columns) {
                String curTable = column.getTable();
                String curFieldName = column.getName();

                for(SQLSelectItem selectItem : sqlSelectItemList){
                    //只有 在查询字段列表里 有包含的字段 才处理
                    if(selectItem.getExpr().toString().indexOf(curFieldName) != -1){

                        //String aliasFieldName = getAliasFieldName(curFieldName,visitor);

                        String aliasFieldName = selectItem.getAlias();

                        //保存别名
                        if(aliasFieldName != null){
                            fieldAlignMap.put(curFieldName,aliasFieldName);
                        }

                        //取不出来 为空
                        //String curDataType = column.getDataType();

                        if(tableColumnMap.containsKey(curTable)){
                            List<String> collection = tableColumnMap.get(curTable);
                            collection.add(curFieldName);
                        } else {
                            List<String> strList = new ArrayList<>();
                            strList.add(curFieldName);
                            tableColumnMap.put(curTable,strList);
                        }


                    }
                }


            }
        }


        /********** 根据 sql parser 解析器 解析 select sql end *************/


        /************ 根据字段 表名 找到其 字段元数据信息 begin *******************/

        List<ColumnMetaInfoDto> realColumnMetaList = new ArrayList<>();

        for(String tableName : tableColumnMap.keySet()){
            List<ColumnMetaInfoDto> curTableColumnMeta = queryMetaInfo(tableName);

            List<String> curTableFiledNameList = tableColumnMap.get(tableName);

            if(curTableFiledNameList != null && curTableFiledNameList.size() > 0){

                for(String curField : curTableFiledNameList){

                    for (ColumnMetaInfoDto infoDto : curTableColumnMeta) {
                        if(curField.equals(infoDto.getColumnName())){

                            //将 cnt --> genderName
                            String aliasName = fieldAlignMap.containsKey(curField) ? fieldAlignMap.get(curField) : curField;
                            infoDto.setColumnName(aliasName);

                            realColumnMetaList.add(infoDto);
                            break;
                        }
                    }
                }
            }
        }

        /************ 根据字段 表名 找到其 字段元数据信息 end *******************/

        System.out.println(realColumnMetaList.size());

        return realColumnMetaList;
    }

    /**
     * 这个方法不再使用了 sql parser 里默认有提供 映射
     *
     * curFieldName  == cnt  ==> (g.cnt ==> gendername)
     * @param curFieldName
     * @param visitor
     * @return
     */
    private String getAliasFieldName(String curFieldName, MySqlSchemaStatVisitor visitor) {

        Map<String, String> aliasMap = visitor.getAliasMap();

        for (String key : aliasMap.keySet()) {
            String val = aliasMap.get(key);

            if(val != null && ! "".equals(val)){
                String fieldAlignName = "." + curFieldName;
                if(val.indexOf(fieldAlignName) != -1){
                    //String prefix = val.trim().split(".")[0];  //g.cnt -> g
                    return key;
                }
            }
        }

        return null;
    }
}
