package com.zwq.blog.controller;

import com.zwq.blog.domain.User;
import com.zwq.blog.util.CodeMsg;
import com.zwq.blog.util.RedisService;
import com.zwq.blog.util.Result;
import com.zwq.blog.vo.MenuVo;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.spring4.context.SpringWebContext;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;
import java.util.List;

/**
 * @author zwq
 * @date 2018/12/5.
 */
@Controller
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
    @Autowired
    ApplicationContext applicationContext;
    @Autowired
    ThymeleafViewResolver thymeleafViewResolver;
    @Autowired
    RedisService redisService;
    /**
     * 后台登录程序
     * @param username
     * @param password
     * @param rememberMe
     * @return
     */
    @PostMapping("/subLogin")
    @ResponseBody
    public Result subLogin(@RequestParam(name = "username") String username,
                           @RequestParam(name = "password") String password, @RequestParam(name = "rememberMe",required = false) String rememberMe){
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username,password);
        try {
            if("on".equals(rememberMe)){
                token.setRememberMe(true);
            }else {
                token.setRememberMe(false);
            }
            subject.login(token);
        } catch (AuthenticationException e) {
            e.printStackTrace();
            return Result.error(CodeMsg.LOGIN_FAIL);
        }
        return Result.success("登录成功！");
    }

    /**
     * 登出
     */
    @GetMapping("/logout")
    @ResponseBody
    public void logout(){
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
    }

    /**
     * 加载后台首页
     * @param request
     * @param response
     * @param model
     * @return
     */
    @RequestMapping(value = "/admin/home",produces = "text/html")
    @ResponseBody
    public String toHome(HttpServletRequest request, HttpServletResponse response,Model model){
        //取缓存
        String html = redisService.get("view-","admin-home",String.class);
        if (!StringUtils.isEmpty(html)){
            logger.info("缓存中获取的页面");
           // return html;
        }
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("currUser");
        List<MenuVo> menu = (List<MenuVo>) session.getAttribute("menus");
        model.addAttribute("user",user);
        model.addAttribute("menus",menu);

        //手动渲染页面
        SpringWebContext springWebContext =
                new SpringWebContext(request,response,request.getServletContext(),request.getLocale(),model.asMap(),applicationContext);
        html = thymeleafViewResolver.getTemplateEngine().process("admin/home",springWebContext);
        if(!StringUtils.isEmpty(html)){
            redisService.set("view-","admin-home",30 * 60,html);
        }
        return html;
    }


}
