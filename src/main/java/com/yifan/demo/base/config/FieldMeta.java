package com.yifan.demo.base.config;

import java.lang.annotation.*;

/**
 * 在使用工具读取字段时 像于获取注释内容 因此添加该注解类
 * Created by dengyin on 17-7-11.
 */
@Retention(RetentionPolicy.RUNTIME) // 注解会在class字节码文件中存在，在运行时可以通过反射获取到
@Target({ElementType.FIELD, ElementType.METHOD})//定义注解的作用目标**作用范围字段、枚举的常量/方法
@Documented//说明该注解将被包含在javadoc中
public @interface FieldMeta {

    /**
     * 是否为序列号
     * @return
     */
    boolean serialno() default false;

    /**
     * 字段名称
     * @return
     */
    String name() default "";
}
