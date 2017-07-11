package com.yifan.demo.base.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 *
 * ComponentScan的属性
 * basePackageClasses：对basepackages()指定扫描注释组件包类型安全的替代。
 * excludeFilters：指定不适合组件扫描的类型。
 * includeFilters：指定哪些类型有资格用于组件扫描。
 * lazyInit：指定是否应注册扫描的beans为lazy初始化。
 * nameGenerator：用于在Spring容器中的检测到的组件命名。
 * resourcePattern：控制可用于组件检测的类文件。
 * scopedProxy：指出代理是否应该对检测元件产生，在使用过程中会在代理风格时尚的范围是必要的。
 * scopeResolver：用于解决检测到的组件的范围。
 * useDefaultFilters：指示是否自动检测类的注释 @Component@Repository, @Service, or @Controller 应启用。
 * value：basePackages()别名
 */
@Configuration
@ComponentScan(basePackages = {"com.yifan.**.service"},
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ANNOTATION, value = EnableWebMvc.class)})
@Import({
        PropertiesConfig.class,
        DataConfig.class
})
public class RootConfig {
}
