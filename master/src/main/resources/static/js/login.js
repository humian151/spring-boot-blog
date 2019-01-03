$(function () {
    $('#login-form').submit(function () {
        var password = $('#password').val();
        var salt = g_passsword_salt;
        password = md5(password+salt);
        try{
            g_showLoading();
            $.ajax({
                type:"post",
                url:"/subLogin",
                data:{
                    username:$('#username').val(),
                    password:password,
                    rememberMe:$('#rememberMe').val()
                },
                success:function(data){
                    layer.closeAll();
                    if(data.code == 200){
                        layer.msg(data.data,{icon:1,time:500},function(){
                            window.location.href="/admin/home";
                        });
                    }else{
                        layer.msg(data.msg,{icon:2,time:1000});
                    }
                },
                error:function(){
                    layer.closeAll();
                }
            });
        }finally {
            return false;
        }
    });
});