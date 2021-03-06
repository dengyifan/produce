package com.yifan.demo.reflect.controller;

import com.alibaba.druid.sql.SQLUtils;
import com.alibaba.druid.sql.ast.SQLStatement;
import com.alibaba.druid.sql.dialect.mysql.visitor.MySqlSchemaStatVisitor;
import com.alibaba.druid.stat.TableStat;
import com.alibaba.druid.util.JdbcConstants;
import com.google.common.io.Files;
import com.yifan.demo.base.config.Response;
import com.yifan.demo.common.CompactAlgorithm;
import com.yifan.demo.reflect.dto.ColumnMetaInfoDto;
import com.yifan.demo.reflect.dto.ExtFormFieldDto;
import com.yifan.demo.reflect.service.IMetaInfoService;
import com.yifan.demo.reflect.vo.ColumnMetaInfoVo;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.*;

import static com.yifan.demo.common.FileUtils.createDir;
import static com.yifan.demo.common.FileUtils.createFile;

/**
 * Created by dengyin on 17-7-11.
 */
@Controller
@RequestMapping("/ext")
public class ExtReflectController {

    @Autowired
    private IMetaInfoService metaInfoService;


    @Resource
    private FreeMarkerConfigurer configurer;

    private ColumnMetaInfoVo vo;

    @RequestMapping("/init")
    public ModelAndView init(){
        ModelAndView mv = new ModelAndView("hello");
        return mv;
    }



    @RequestMapping("/preview")
    public ModelAndView preview(){
        ModelAndView mv = new ModelAndView("preview");
        return mv;
    }


    @RequestMapping("/meta")
    @ResponseBody
    public Response metaInfo(@ModelAttribute("vo") ColumnMetaInfoVo vo){

        if(vo.getDtoSignName() != null && !"".equals(vo.getDtoSignName())){
            vo.setColumnMetaInfoDtoList(metaInfoService.getClassInfo(vo.getDtoSignName()));

        } else if(vo.getTableName() != null && !vo.getTableName().equals("")){
            vo.setColumnMetaInfoDtoList(metaInfoService.getMetaInfo(vo.getTableName()));

        } else {
            vo.setColumnMetaInfoDtoList(metaInfoService.getColumnInfoFromSql(vo.getSqlCnt()));
        }

        vo.setTotalCount(vo.getColumnMetaInfoDtoList().size());

        Response response = new Response();
        response.setResult(vo);
        return response;
    }

    @RequestMapping(value = "/sqlParse",method = RequestMethod.POST)
    @ResponseBody
    public Response sqlParse(@RequestBody ColumnMetaInfoVo vo){
        vo.setColumnMetaInfoDtoList(metaInfoService.getColumnInfoFromSql(vo.getSqlCnt()));
        Response resp = new Response();
        resp.setResult(vo);
        return resp;
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

        extFormList2Map(vo);

        mv.addObject("extFormListMap",vo.getExtFormListMap());
        mv.addObject("appSignName",vo.getAppSignName());
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


        fileNameInit(vo);

        mv.addObject("columnMetaInfoDtoList",vo.getColumnMetaInfoDtoList());

        mv.addObject("appSignName",vo.getAppSignName());
        mv.addObject("defaultGridName",vo.getDefaultGridName());
        mv.addObject("gridAlignName",vo.getGridAlignName());
        mv.addObject("defaultStoreName",null);
        return mv;
    }



    @RequestMapping(value = "/selectSql",method = RequestMethod.POST)
    public ModelAndView selectSql(@RequestBody ColumnMetaInfoVo vo){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("reflect/ground/select");
        mv.addObject("columnMetaInfoDtoList",vo.getColumnMetaInfoDtoList());
        mv.addObject("tableName",vo.getTableName());
        return mv;
    }

    @RequestMapping(value = "/insertSql",method = RequestMethod.POST)
    public ModelAndView insertSql(@RequestBody ColumnMetaInfoVo vo){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("reflect/ground/insert");
        mv.addObject("columnMetaInfoDtoList",vo.getColumnMetaInfoDtoList());
        mv.addObject("tableName",vo.getTableName());
        return mv;
    }

    @RequestMapping(value = "/updateSql",method = RequestMethod.POST)
    public ModelAndView updateSql(@RequestBody ColumnMetaInfoVo vo){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("reflect/ground/update");
        mv.addObject("columnMetaInfoDtoList",vo.getColumnMetaInfoDtoList());
        mv.addObject("tableName",vo.getTableName());
        return mv;
    }

    @RequestMapping(value = "/oneStep",method = RequestMethod.POST)
    @ResponseBody
    public Response oneStep(@RequestBody ColumnMetaInfoVo vo,
                                          HttpSession session,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        extFormList2Map(vo);

        fileNameInit(vo);
        templdateParseAndCreate(vo, session);

        Response resp = new Response();
        resp.setResult(vo);
        return resp;
    }




    private void extFormList2Map(ColumnMetaInfoVo vo) {
        List<ExtFormFieldDto> extFormFieldDtoList = vo.getExtFormFieldDtoList();

        Map<String,List<ExtFormFieldDto>> extFormListMap = new HashMap<>();

        if(extFormFieldDtoList != null && extFormFieldDtoList.size() > 0){

            List<ExtFormFieldDto> subList = new ArrayList<>();

            for(int i = 0; i < extFormFieldDtoList.size(); i++){
                if((i+1) % 5 == 0){
                    extFormListMap.put(i+"",subList);
                    subList = new ArrayList<>();
                    subList.add(extFormFieldDtoList.get(i));
                } else {
                    subList.add(extFormFieldDtoList.get(i));
                }
            }

            if(subList != null && subList.size() > 0){
                extFormListMap.put((extFormFieldDtoList.size() + 1)+"",subList);
            }
        }

        vo.setExtFormListMap(extFormListMap);
    }

    private void fileNameInit(ColumnMetaInfoVo vo) {
        String appSignName = vo.getAppSignName();
        vo.setDefaultControllerName(appSignName+"Controller");
        vo.setDefaultGridName(appSignName+"List");
        vo.setGridSignName(appSignName+"List");
        vo.setGridAlignName(appSignName+"List");
        vo.setModelSignName(appSignName+"Model");
        vo.setSearchSignName(appSignName+"Search");
        vo.setSearchAlignName(appSignName+"Search");
        vo.setDefaultStoreName(appSignName+"Store");
    }


    /**
     * 解析模板 并生成对应的文件目录和文件
     * @param vo
     * @param session
     */
    private void templdateParseAndCreate(ColumnMetaInfoVo vo, HttpSession session) {
        String appCnt = ftlParse(configurer, "reflect/ext/app.ftl", vo);
        String viewPortCnt = ftlParse(configurer, "reflect/ext/viewport.ftl", vo);
        String searchCnt = ftlParse(configurer,"reflect/ext/search.ftl",vo);
        String listCnt = ftlParse(configurer,"reflect/ext/grid.ftl",vo);

        String addModifyCnt = ftlParse(configurer,"reflect/ext/addmodify.ftl",vo);

        String modelCnt = ftlParse(configurer,"reflect/ext/model.ftl",vo);
        String storeCnt = ftlParse(configurer,"reflect/ext/store.ftl",vo);
        String controllerCnt = ftlParse(configurer,"reflect/ext/controller.ftl",vo);


        //webapp/tmp/
        String tmpPath = session.getServletContext().getRealPath(File.separator + "temp");

        //webapp/tmp/extFtl/
        String extFtlPath = tmpPath + File.separator + "extFtl";

        //webapp/tmp/extFtl/appSginName
        String appDirPath = extFtlPath + File.separator + vo.getAppSignName();
        createDir(appDirPath);


        //webapp/tmp/extFtl/appSginName/controller
        String controllerDirPath = appDirPath + File.separator + "controller";
        createDir(controllerDirPath);

        //webapp/tmp/extFtl/appSginName/controller/main.js
        String controllerMainPath = controllerDirPath + File.separator + vo.getDefaultControllerName() + ".js";
        createFile(controllerMainPath);


        //webapp/tmp/extFtl/appSginName/store
        String storeDirPath = appDirPath + File.separator + "store";
        createDir(storeDirPath);

        //webapp/tmp/extFtl/appSginName/store/main.js
        String storeMainPath = storeDirPath + File.separator + vo.getDefaultStoreName() +".js";
        createFile(storeMainPath);


        //webapp/tmp/extFtl/appSginName/model
        String modelDirPath = appDirPath + File.separator + "model";
        createDir(modelDirPath);

        //webapp/tmp/extFtl/appSginName/model/main.js
        String modelMainPath = modelDirPath + File.separator + vo.getModelSignName() +".js";
        createFile(modelMainPath);


        //webapp/tmp/extFtl/appSginName/view
        String viewDirPath = appDirPath + File.separator + "view";
        createDir(viewDirPath);

        //webapp/tmp/extFtl/appSginName/view/main
        String viewMainDirPath = viewDirPath + File.separator + "main";
        createDir(viewMainDirPath);


        //webapp/tmp/extFtl/appSginName/app.js
        String appPath = appDirPath + File.separator + vo.getAppSignName() + "App.js";
        createFile(appPath);

        //webapp/tmp/extFtl/appSginName/view/Viewport.js
        String viewportPath = viewDirPath + File.separator + "Viewport.js";
        createFile(viewportPath);


        //webapp/tmp/extFtl/appSginName/view/main/search.js
        String searchPath = viewMainDirPath + File.separator + vo.getSearchAlignName() + ".js";
        createFile(searchPath);

        //webapp/tmp/extFtl/appSginName/view/main/list.js
        String listPath = viewMainDirPath + File.separator + vo.getGridAlignName() + ".js";
        createFile(listPath);


        //webapp/tmp/extFtl/appSginName/view/main/*AddModify.js
        String addModifyWinPath = viewMainDirPath + File.separator + vo.getAppSignName() + "AddModify.js";
        createFile(addModifyWinPath);


        try {
            Files.write(appCnt.getBytes(),new File(appPath));
            Files.write(viewPortCnt.getBytes(),new File(viewportPath));
            Files.write(searchCnt.getBytes(),new File(searchPath));
            Files.write(listCnt.getBytes(),new File(listPath));

            Files.write(addModifyCnt.getBytes(),new File(addModifyWinPath));


            Files.write(controllerCnt.getBytes(),new File(controllerMainPath));
            Files.write(modelCnt.getBytes(),new File(modelMainPath));
            Files.write(storeCnt.getBytes(),new File(storeMainPath));


            //压缩
            String downloadFileName = vo.getAppSignName() + ".zip";
            String downloadFilePath = extFtlPath + File.separator + downloadFileName;

            File appDirFile = new File(appDirPath);
            File extFtlFile = new File(downloadFilePath);

            new CompactAlgorithm(new File( downloadFilePath)).zipFiles(appDirFile);

            vo.setDownloadFilePath(downloadFilePath);
            vo.setDownloadFileName(downloadFileName);

        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 模板解析 返回 解析后的字符内容 用于生成文件
     * @param configurer
     * @param ftlPath
     * @param vo
     * @return
     */
    public String ftlParse(FreeMarkerConfigurer configurer,String ftlPath,ColumnMetaInfoVo vo){

        String fileContent = null;
        Configuration configuration = configurer.getConfiguration();
        StringWriter out = new StringWriter();
        try {

            Template template = configuration.getTemplate(ftlPath);
            template.process(vo,out);

            StringBuffer stringBuffer = out.getBuffer();

            fileContent = stringBuffer.toString();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TemplateException e) {
            e.printStackTrace();
        }

        return fileContent;
    }

    public ColumnMetaInfoVo getVo() {
        return vo;
    }

    public void setVo(ColumnMetaInfoVo vo) {
        this.vo = vo;
    }
}
