package com.yifan.demo.waybill.dao;

import com.yifan.demo.waybill.dto.StudentDto;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
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

    @Insert("insert into t_demo_student(name,gender,age,address,birthday) values (#{name},#{gender},#{age},#{address},#{birthday})")
    public int insert(StudentDto dto);

    @Delete("delete from t_demo_student where id = #{id}")
    int remove(StudentDto dto);
}
