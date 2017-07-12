package com.yifan.demo.reflect.dto;

import com.yifan.demo.base.config.FieldMeta;

import java.io.Serializable;

/**
 * Created by dengyin on 17-7-12.
 */
public class ExtFormFieldDto implements Serializable {
    private static final long serialVersionUID = -3707560229655495352L;

    @FieldMeta(name = "类型")
    private String xtype;

    @FieldMeta(name = "标签")
    private String fieldLabel;

    @FieldMeta(name = "属性")
    private String name;

    public String getXtype() {
        return xtype;
    }

    public void setXtype(String xtype) {
        this.xtype = xtype;
    }

    public String getFieldLabel() {
        return fieldLabel;
    }

    public void setFieldLabel(String fieldLabel) {
        this.fieldLabel = fieldLabel;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
