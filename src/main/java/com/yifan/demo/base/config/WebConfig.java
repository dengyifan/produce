package com.yifan.demo.base.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;
import org.springframework.web.util.UrlPathHelper;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import static java.util.Arrays.asList;

/**
 * Created by dengyin on 17-7-11.
 */
@Configuration
@EnableWebMvc
@ComponentScan("com.yifan.**.controller")
public class WebConfig extends WebMvcConfigurerAdapter {
    Logger logger = LoggerFactory.getLogger(WebConfig.class);


    /**
     * Freemarker 视图解析配置
     * @return
     */
    @Bean
    public ViewResolver viewResolver(){
        FreeMarkerViewResolver viewResolver = new FreeMarkerViewResolver();
        viewResolver.setPrefix("");
        viewResolver.setSuffix(".ftl");
        viewResolver.setCache(true);
        viewResolver.setContentType("text/html;charset=UTF-8");
        return viewResolver;
    }

    /**
     * Freemarker 基础配置
     * @return
     */
    @Bean
    public FreeMarkerConfigurer freeMarkerConfigurer(){
        FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();
        configurer.setTemplateLoaderPath("/WEB-INF/pages/");

        Properties properties = new Properties();
        properties.setProperty("template_update_delay","0");
        properties.setProperty("default_encoding","UTF-8");
        properties.setProperty("number_format","0.##########");
        properties.setProperty("datetime_format","yyyy-MM-dd HH:mm:ss");
        properties.setProperty("classic_compatible","true");
        properties.setProperty("template_exception_handler","ignore");
        configurer.setFreemarkerSettings(properties);
        return configurer;
    }


    @Bean
    public CommonsMultipartResolver multipartResolver(){
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        resolver.setDefaultEncoding("utf-8");
        resolver.setMaxUploadSize(10485760);

        //配置上传文件的缓存 ，单位为字节
        resolver.setMaxInMemorySize(4096);

        //属性启用是为了推迟文件解析，以便在UploadAction 中捕获文件大小异常
        resolver.setResolveLazily(true);
        return resolver;
    }



    /**
     * 配置静态资源处理
     * 将静态资源的请求转发到servlet容器中默认的servlet上
     * @param configurer
     */
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    /**
     * 静态资源处理
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        logger.info("addResourceHandlers");

        registry.addResourceHandler("/scripts/**").addResourceLocations("/WEB-INF/scripts/");
        registry.addResourceHandler("/images/**").addResourceLocations("/WEB-INF/images/");
        registry.addResourceHandler("/css/**").addResourceLocations("/WEB-INF/css/");
    }


    /**
     * 解析json返回数据
     * @param converters
     */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        List<MediaType> mediaTypes = new ArrayList(converter.getSupportedMediaTypes());
        converter.setSupportedMediaTypes(mediaTypes);
        mediaTypes.addAll(asList(MediaType.TEXT_PLAIN, MediaType.TEXT_HTML, MediaType.TEXT_XML));
        converters.add(converter);
    }


    /**
     * 启用 matrix variable
     * @param configurer
     */
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        UrlPathHelper urlPathHelper = new UrlPathHelper();
        urlPathHelper.setRemoveSemicolonContent(false);
        configurer.setUrlPathHelper(urlPathHelper);
        configurer.setUseRegisteredSuffixPatternMatch(true);
    }


}
