package com.yifan.demo.waybill.controller;

import com.yifan.demo.base.config.Response;
import com.yifan.demo.waybill.dto.StudentDto;
import com.yifan.demo.waybill.service.IWaybillService;
import com.yifan.demo.waybill.vo.StudentVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by dengyin on 17-7-20.
 */
@Controller
@RequestMapping("/table/waybill")
public class WaybillController {

    private StudentVO studentVO;

    @Resource
    private IWaybillService waybillService;

    @RequestMapping(value = "/mainQuery")
    @ResponseBody
    public Response mainQuery(@ModelAttribute("vo")  StudentVO vo){
        Response response = new Response();
        List<StudentDto> studentDtoList = waybillService.mainQuery(vo);
        vo.setStudentDtoList(studentDtoList);
        response.setResult(vo);
        return response;
    }

    @RequestMapping(value = "/addOrUpdate",method = RequestMethod.POST)
    @ResponseBody
    public Response addOrUpdate(@RequestBody  StudentVO vo){
        Response response = new Response();
        waybillService.insert(vo.getStudentDto());
        return response;
    }

    @RequestMapping(value = "/remove",method = RequestMethod.POST)
    @ResponseBody
    public Response remove(@RequestBody  StudentVO vo){
        Response response = new Response();
        waybillService.remove(vo.getStudentDtoList());
        return response;
    }

    public StudentVO getStudentVO() {
        return studentVO;
    }

    public void setStudentVO(StudentVO studentVO) {
        this.studentVO = studentVO;
    }
}
