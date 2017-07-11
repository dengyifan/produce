package com.yifan.demo.base.config;

import java.io.Serializable;

/**
 * Created by dengyin on 17-7-11.
 */
public class Response implements Serializable{
    private static final long serialVersionUID = 8098852618189887112L;

    public Object result;

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }
}
