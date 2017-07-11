package com.yifan.demo.reflect.controller;

import com.yifan.demo.base.config.Response;
import com.yifan.demo.reflect.service.IMetaInfoService;
import com.yifan.demo.reflect.vo.ColumnMetaInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by dengyin on 17-7-11.
 */
@Controller
@RequestMapping("/ext")
public class ExtReflectController {

    @Autowired
    private IMetaInfoService metaInfoService;

    private ColumnMetaInfoVo vo;

    @RequestMapping("/init")
    public ModelAndView init(){
        ModelAndView mv = new ModelAndView("hello");
        mv.addObject("title","标题");
        mv.addObject("content","Ext 代码生成");
        return mv;
    }


    @RequestMapping("/meta")
    @ResponseBody
    public Response metaInfo(@ModelAttribute("vo") ColumnMetaInfoVo vo){
        if(vo.getTableName() == null || "".equals(vo.getTableName())){
            vo.setColumnMetaInfoDtoList(metaInfoService.getClassInfo(vo.getDtoSignName()));
        } else {
            vo.setColumnMetaInfoDtoList(metaInfoService.getMetaInfo(vo.getTableName()));
        }

        vo.setTotalCount(vo.getColumnMetaInfoDtoList().size());

        Response response = new Response();
        response.setResult(vo);
        return response;
    }


    public ColumnMetaInfoVo getVo() {
        return vo;
    }

    public void setVo(ColumnMetaInfoVo vo) {
        this.vo = vo;
    }
}
