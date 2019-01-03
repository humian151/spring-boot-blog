package com.zwq.blog.vo;

import java.io.Serializable;

/**
 * @author zwq
 * @date 2018/12/11.
 */
public class BlogConditionVo implements Serializable{
    private Long typeid;
    private String title;

    public Long getTypeid() {
        return typeid;
    }

    public void setTypeid(Long typeid) {
        this.typeid = typeid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
