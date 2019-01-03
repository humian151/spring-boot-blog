package com.zwq.blog.exception;

import com.zwq.blog.util.CodeMsg;

/**
 * 自定义业务异常类
 * @author zwq
 * @date 2018/12/5.
 */
public class BusinessException extends RuntimeException{
    private CodeMsg cm;

    public BusinessException(CodeMsg cm) {
        super(cm.toString());
        this.cm = cm;
    }

    public CodeMsg getCm() {
        return cm;
    }
}
