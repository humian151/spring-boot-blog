package com.zwq.blog.domain;

import java.io.Serializable;

public class BlogType  implements Serializable {

    private Long id;
    private String typename;
    private Long orderno;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypename() {
        return typename;
    }

    public void setTypename(String typename) {
        this.typename = typename;
    }

    public Long getOrderno() {
        return orderno;
    }

    public void setOrderno(Long orderno) {
        this.orderno = orderno;
    }
}
