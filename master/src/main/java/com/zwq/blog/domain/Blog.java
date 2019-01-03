package com.zwq.blog.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Blog implements Serializable{
    private Long id;
    private String title;
    private String summary;
    private Date releasedate;
    private Long chickhit;
    private Long replyhit;
    private String content;
    private Long typeid;
    private String keyword;
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

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Date getReleasedate() {
        return releasedate;
    }

    public void setReleasedate(Date releasedate) {
        this.releasedate = releasedate;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getTypeid() {
        return typeid;
    }

    public void setTypeid(Long typeid) {
        this.typeid = typeid;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
