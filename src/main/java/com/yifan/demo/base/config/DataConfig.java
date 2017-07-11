package com.yifan.demo.base.config;

import org.apache.commons.dbcp.BasicDataSource;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

/**
 * Created by dengyin on 17-7-11.
 */
@Configuration
@MapperScan(basePackages = "com.yifan.**.dao")
@Import(PropertiesConfig.class)
public class DataConfig {

    @Autowired
    private Environment env;

    @Bean
    public BasicDataSource dataSource(){
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(env.getProperty("db_driverClassName"));
        dataSource.setUrl(env.getProperty("db_url"));//防止乱码
        dataSource.setUsername(env.getProperty("db_username"));

        //MyNewPass4!
        dataSource.setPassword(env.getProperty("db_password"));
        dataSource.setInitialSize(Integer.valueOf(env.getProperty("db_initialSize")));
        dataSource.setMaxActive(Integer.valueOf(env.getProperty("db_maxActive")));
        return dataSource;
    }

    @Bean
    public DataSourceTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }

    @Bean
    public SqlSessionFactoryBean sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());
        sessionFactory.setTypeAliasesPackage("com.yifan.**.domain");

        //后面的路径必须存在 不存在会报错
        sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:com/yifan/**/dao/*.xml"));
        return sessionFactory;
    }
}