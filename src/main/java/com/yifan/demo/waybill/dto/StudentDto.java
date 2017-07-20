package com.yifan.demo.waybill.dto;

import com.yifan.demo.base.config.FieldMeta;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by dengyin on 2017-07-20 10:14:50
 */
public class StudentDto implements Serializable{

    @FieldMeta(serialno = true,name = "序列号")
    private static final long serialVersionUID = 3493049152770942221L;

    @FieldMeta(name = "编号")
    private int id;

    @FieldMeta(name = "姓名")
    private String name;

    @FieldMeta(name = "性别")
    private String gender;

    @FieldMeta(name = "年龄")
    private int age;

    @FieldMeta(name = "地址")
    private String address;

    @FieldMeta(name = "出生日期")
    private Date birthday;



    public void setId(int id){
        this.id = id;
    }

    public int getId(){
        return this.id;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }

    public void setGender(String gender){
        this.gender = gender;
    }

    public String getGender(){
        return this.gender;
    }

    public void setAge(int age){
        this.age = age;
    }

    public int getAge(){
        return this.age;
    }

    public void setAddress(String address){
        this.address = address;
    }

    public String getAddress(){
        return this.address;
    }

    public void setBirthday(Date birthday){
        this.birthday = birthday;
    }

    public Date getBirthday(){
        return this.birthday;
    }


}
