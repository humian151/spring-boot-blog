package com.zwq.blog.exception;

import com.zwq.blog.util.CodeMsg;
import com.zwq.blog.util.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 全局异常捕获类
 * @author zwq
 * @date 2018/12/5.
 */
@RestControllerAdvice
public class GlobalExceptionHandlerAdvice {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandlerAdvice.class);
    @ExceptionHandler(value=Exception.class)
    public Result<String> exceptionHandler(HttpServletRequest request, Exception e){
        log.error(e.getMessage());
        if(e instanceof BusinessException) {
            BusinessException ex = (BusinessException)e;
            return Result.error(ex.getCm());
        }else if(e instanceof BindException) {
            BindException ex = (BindException)e;
            List<ObjectError> errors = ex.getAllErrors();
            ObjectError error = errors.get(0);
            String msg = error.getDefaultMessage();
            return Result.error(CodeMsg.BIND_ERROR.fillArgs(msg));
        }else {
            return Result.error(CodeMsg.SERVER_ERROR);
        }
    }
}
