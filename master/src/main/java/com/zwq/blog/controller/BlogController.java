package com.zwq.blog.controller;

import com.zwq.blog.domain.Blog;
import com.zwq.blog.service.BlogService;
import com.zwq.blog.service.BlogTypeService;
import com.zwq.blog.util.RedisService;
import com.zwq.blog.util.Result;
import com.zwq.blog.vo.BlogTypeFrontVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.spring4.context.SpringWebContext;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 为前端展示页面服务的Controller
 * @author zwq
 * @date 2018/12/25.
 */
@RestController
@RequestMapping("/front")
public class BlogController {
    @Autowired
    BlogTypeService blogTypeService;

    @Autowired
    ApplicationContext applicationContext;
    @Autowired
    ThymeleafViewResolver thymeleafViewResolver;
    @Autowired
    RedisService redisService;
    @Autowired
    BlogService blogService;


    /**
     * 加载侧边博客类别汇总
     * @return
     */
    @GetMapping("/showBlogTypeMenu")
    public Result<List<BlogTypeFrontVo>> showBlogTypeMenu(){
        List<BlogTypeFrontVo> list =  blogTypeService.showBlogTypeMenu();
        return Result.success(list);
    }

    /**
     * 加载博客详情页
     */
    @RequestMapping(value = "/view/{id}",produces = "text/html")
    public String loadPage(HttpServletRequest request, HttpServletResponse response, Model model,@PathVariable Long id){
        //取缓存
        String html = redisService.get("view-","blogpage-"+id,String.class);
        if (!StringUtils.isEmpty(html)){
            System.out.println("取缓存的页面....");
            // return html;
        }
        Blog blog = blogService.queryBlog(id);
        model.addAttribute("blog",blog);
        //手动渲染页面
        SpringWebContext springWebContext =
                new SpringWebContext(request,response,request.getServletContext(),request.getLocale(),model.asMap(),applicationContext);
        html = thymeleafViewResolver.getTemplateEngine().process("front/page",springWebContext);
        if(!StringUtils.isEmpty(html)){
            redisService.set("view-","blogpage-"+id,30 * 60,html);
        }
        return html;
    }

}
