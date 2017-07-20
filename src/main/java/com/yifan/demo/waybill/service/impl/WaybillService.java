package com.yifan.demo.waybill.service.impl;

import com.yifan.demo.waybill.dao.StudentDao;
import com.yifan.demo.waybill.dto.StudentDto;
import com.yifan.demo.waybill.service.IWaybillService;
import com.yifan.demo.waybill.vo.StudentVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by dengyin on 17-7-20.
 */
@Service
public class WaybillService implements IWaybillService {

    @Resource
    private StudentDao studentDao;

    @Override
    public List<StudentDto> mainQuery(StudentVO vo) {
        List<StudentDto> studentDtoList = studentDao.mainQuery();
        return studentDtoList;
    }

    @Override
    public int insert(StudentDto dto) {
        return studentDao.insert(dto);
    }
}
