package com.yifan.demo.reflect.controller;

import com.yifan.demo.base.config.Response;
import com.yifan.demo.reflect.dto.ColumnMetaInfoDto;
import com.yifan.demo.reflect.service.IMetaInfoService;
import com.yifan.demo.reflect.vo.ColumnMetaInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Collections;
import java.util.Comparator;

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

    @RequestMapping(value = "/dto",method = RequestMethod.POST)
    public ModelAndView dto(@RequestBody ColumnMetaInfoVo vo){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("reflect/ground/dto");
        mv.addObject("columnMetaInfoDtoList",vo.getColumnMetaInfoDtoList());
        mv.addObject("dtoClassName",vo.getDtoClassName());
        mv.addObject("packageName",vo.getPackageName());
        mv.addObject("containsDate",vo.isContainsDate());
        return mv;
    }

    @RequestMapping(value = "/model",method = RequestMethod.POST)
    public ModelAndView model(@RequestBody ColumnMetaInfoVo vo){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("reflect/ext/model");
        mv.addObject("columnMetaInfoDtoList",vo.getColumnMetaInfoDtoList());
        mv.addObject("modelSignName",vo.getModelSignName());
        return mv;
    }


    @RequestMapping(value = "/searchCode",method = RequestMethod.POST)
    public ModelAndView searchCode(@RequestBody ColumnMetaInfoVo vo){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("reflect/ext/search");
        mv.addObject("extFormFieldDtoList",vo.getExtFormFieldDtoList());
        mv.addObject("searchSignName",vo.getSearchSignName());
        mv.addObject("searchAlignName",vo.getSearchAlignName());
        return mv;
    }


    @RequestMapping(value = "/grid",method = RequestMethod.POST)
    public ModelAndView grid(@RequestBody ColumnMetaInfoVo vo){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("reflect/ext/grid");

        Collections.sort(vo.getColumnMetaInfoDtoList(), new Comparator<ColumnMetaInfoDto>() {
            @Override
            public int compare(ColumnMetaInfoDto o1, ColumnMetaInfoDto o2) {
                return o1.getOrder() - o2.getOrder();
            }
        });

        mv.addObject("columnMetaInfoDtoList",vo.getColumnMetaInfoDtoList());
        mv.addObject("gridSignName",vo.getGridSignName());
        mv.addObject("gridAlignName",vo.getGridAlignName());
        return mv;
    }

    public ColumnMetaInfoVo getVo() {
        return vo;
    }

    public void setVo(ColumnMetaInfoVo vo) {
        this.vo = vo;
    }
}
