package com.zwq.blog.vo;

import java.io.Serializable;
import java.util.Date;

/**
 * @author zwq
 * @date 2018/12/12.
 */
public class CommentVo implements Serializable{

    private Long id;
    private String userip;
    private String title; //博客标题
    private Long blogid;
    private String content; //评论内容
    private Date commentdate;
    private Long state;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserip() {
        return userip;
    }

    public void setUserip(String userip) {
        this.userip = userip;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getBlogid() {
        return blogid;
    }

    public void setBlogid(Long blogid) {
        this.blogid = blogid;
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
