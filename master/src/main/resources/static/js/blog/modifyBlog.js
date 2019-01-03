$(document).ready(function() {
    $('#blog-content').summernote({
        height: 100,
        tabsize: 2
    });
    //渲染数据
    loadBlogType();
    var blogid = g_getQueryString("blogid");
    g_showLoading();
    $.ajax({
       url:"/blog/queryBlog/"+blogid,
        type:"get",
        async:false,
        success:function (data) {
            layer.closeAll();
            if(data.code==200){
                var blog = data.data;
                $('.title').val(blog.title);
                $('#r-typeid option[value='+blog.typeid+']').attr('selected',"selected");
                $('#blog-content').summernote('code',blog.content);
                $(".keyword").val(blog.keyword);
            }else{
                layer.msg("访问错误");
            }
        }
    });

    $('#btn-save').click(function(){
        var Blog = {};
        Blog.id = blogid;
        Blog.title = $(".title").val();
        Blog.typeid =$(".typeId option:selected").val();
        Blog.content =$('#blog-content').summernote('code');
        Blog.summary = "摘要："+stringHtml(Blog.content).substr(0,100);
        Blog.keyword=$(".keyword").val();

        $.ajax({
            async:false,
            url:"/blog/modifyBlog",
            data:JSON.stringify(Blog),
            contentType:"application/json;charset=utf-8",
            type:"POST",
            success:function (data) {
                if(data.code==200){
                    layer.msg('保存成功！', {icon: 1,time: 500},function () {
                        window.parent.$('#editModal').modal('hide');
                        window.parent.$('#blog_tab').bootstrapTable('refresh');
                    });
                }else{
                    layer.msg('添加失败！'+data.data.msg, {icon: 2});
                }

            }
        });
        return false;
    });
});