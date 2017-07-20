package com.yifan.demo.waybill.vo;

import com.yifan.demo.waybill.dto.StudentDto;

import java.io.Serializable;
import java.util.List;

/**
 * Created by dengyin on 17-7-20.
 */
public class StudentVO implements Serializable{

    private static final long serialVersionUID = 5452151712359943720L;

    private StudentDto studentDto;
    private List<StudentDto> studentDtoList;

    public StudentDto getStudentDto() {
        return studentDto;
    }

    public void setStudentDto(StudentDto studentDto) {
        this.studentDto = studentDto;
    }

    public List<StudentDto> getStudentDtoList() {
        return studentDtoList;
    }

    public void setStudentDtoList(List<StudentDto> studentDtoList) {
        this.studentDtoList = studentDtoList;
    }
}
