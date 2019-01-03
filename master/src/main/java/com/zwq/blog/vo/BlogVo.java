package com.zwq.blog.vo;

import java.io.Serializable;
import java.util.Date;

/**
 * @author zwq
 * @date 2018/12/11.
 */
public class BlogVo implements Serializable{
    private Long id;
    private String title;
    private Date releasedate;
    private String typename;
    private String content;
    private String summary;
    private String keyword;
    private Long chickhit;
    private Long replyhit;
    private Long typeid;
    private String author;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getReleasedate() {
        return releasedate;
    }

    public void setReleasedate(Date releasedate) {
        this.releasedate = releasedate;
    }

    public String getTypename() {
        return typename;
    }

    public void setTypename(String typename) {
        this.typename = typename;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Long getChickhit() {
        return chickhit;
    }

    public void setChickhit(Long chickhit) {
        this.chickhit = chickhit;
    }

    public Long getReplyhit() {
        return replyhit;
    }

    public void setReplyhit(Long replyhit) {
        this.replyhit = replyhit;
    }

    public Long getTypeid() {
        return typeid;
    }

    public void setTypeid(Long typeid) {
        this.typeid = typeid;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
