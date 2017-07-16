package com.yifan.demo.reflect.controller;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;

/**
 * Created by dengyin on 17-7-14.
 */
@Controller
@RequestMapping("/file")
public class FileController {
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);


    @RequestMapping("/download")
    public void download(@RequestParam(value = "path", required = false) String path,
                         @RequestParam(value = "fileName", required = false) String fileName, HttpServletRequest request,
                         HttpServletResponse response) throws UnsupportedEncodingException {

        //path = "/home/dengyin/IdeaProjects/produce/src/main/webapp/WEB-INF/aaa.rar";
        //fileName = "aaa.rar";

        logger.info("name is :{}", path);
        if (StringUtils.isBlank(path) && StringUtils.isBlank(fileName)) {
            return;
        }


        //1.设置文件ContentType类型，这样设置，会自动判断下载文件类型
        response.setContentType("multipart/form-data");
        //2.设置文件头
        String userAgent = request.getHeader("User-Agent");
        if (StringUtils.isBlank(userAgent)) {
            fileName = URLEncoder.encode(fileName, "UTF-8");
        } else {
            if (userAgent.indexOf("MSIE") != -1) {
                // IE使用URLEncoder
                fileName = URLEncoder.encode(fileName, "UTF-8");
            } else {
                // FireFox使用ISO-8859-1
                fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
            }
        }
        response.setHeader("Content-Disposition", "attachment;fileName=" + fileName);
        response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
        response.setHeader("Pragma", "public");
        response.setDateHeader("Expires", (System.currentTimeMillis() + 1000));


        File file = new File(path);


        OutputStream out = null;


        InputStream inputStream = null;
        try {
            inputStream = new FileInputStream(file);


            out = response.getOutputStream();


            byte[] buffer = new byte[1024];
            int count = 0;
            while ((count = inputStream.read(buffer)) != -1) {
                out.write(buffer, 0, count);
            }


            out.close();
            out.flush();


        } catch (IOException e) {
            logger.error("文件下载异常:{}", e);
        } finally {

            IOUtils.closeQuietly(inputStream);
        }
    }
}
