package com.yifan.demo.reflect.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by dengyin on 17-7-11.
 */
@Controller
@RequestMapping("/ext")
public class ExtReflectController {

    @RequestMapping("/init")
    public ModelAndView init(){
        ModelAndView mv = new ModelAndView("hello");
        mv.addObject("title","标题");
        mv.addObject("content","Ext 代码生成");
        return mv;
    }
}
