package com.zwq.blog.domain;

import java.io.Serializable;
import java.util.Date;

public class Comment  implements Serializable {

    private Long id;
    private Long blogid;
    private String userip;
    private String content;
    private Date commentdate;
    private Long state; //0未审核，1审核通过，2审核拒绝

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBlogid() {
        return blogid;
    }

    public void setBlogid(Long blogid) {
        this.blogid = blogid;
    }

    public String getUserip() {
        return userip;
    }

    public void setUserip(String userip) {
        this.userip = userip;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCommentdate() {
        return commentdate;
    }

    public void setCommentdate(Date commentdate) {
        this.commentdate = commentdate;
    }

    public Long getState() {
        return state;
    }

    public void setState(Long state) {
        this.state = state;
    }
}
