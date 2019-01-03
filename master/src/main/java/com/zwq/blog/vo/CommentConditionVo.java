package com.zwq.blog.vo;

import java.io.Serializable;

/**
 * @author zwq
 * @date 2018/12/12.
 */
public class CommentConditionVo implements Serializable{
    private String title;
    private String content;
    private Long state;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getState() {
        return state;
    }

    public void setState(Long state) {
        this.state = state;
    }
}
