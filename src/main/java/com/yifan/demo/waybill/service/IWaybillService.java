package com.yifan.demo.waybill.service;

import com.yifan.demo.waybill.dto.StudentDto;
import com.yifan.demo.waybill.vo.StudentVO;

import java.util.List;

/**
 * Created by dengyin on 17-7-20.
 */
public interface IWaybillService {

    public List<StudentDto> mainQuery(StudentVO vo);

    public int insert(StudentDto dto);

    int remove(List<StudentDto> studentDtoList);
}
