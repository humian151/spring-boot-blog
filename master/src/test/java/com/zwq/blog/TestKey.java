package com.zwq.blog;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

/**
 * @author zwq
 * @date 2018/12/6.
 */
public class TestKey<T> {
    public TestKey(){
      /*  Type genericSuperclass = getClass().getGenericSuperclass();
        ParameterizedType type = (ParameterizedType) genericSuperclass;
        Type[] actualTypeArguments = type.getActualTypeArguments();*/
    }
    public static void main(String[] args) {
        TestKey<String> t =  new TestKey<String>();
        System.out.println(((ParameterizedType)t.getClass().getGenericSuperclass()));
    }
}
