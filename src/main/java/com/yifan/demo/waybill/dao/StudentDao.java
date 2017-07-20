package com.yifan.demo.waybill.dao;

import com.yifan.demo.waybill.dto.StudentDto;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by dengyin on 17-7-20.
 */
@Repository
public interface StudentDao {

    @Select("select * from t_demo_student")
    public List<StudentDto> mainQuery();
}