package com.yifan.demo.base.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * Created by dengyin on 17-7-11.
 */
@Configuration
@PropertySource("classpath:log4j.properties")
public class LoggingConfig {
}
