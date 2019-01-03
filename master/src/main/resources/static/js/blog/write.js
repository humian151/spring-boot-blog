
$(document).ready(function() {
    //初始化博客类型查询下拉框
    loadBlogType();

    $('#blog-content').summernote({
        height: 150,
        tabsize: 2
    });
    //$('#blog-content').summernote('code','hello,world');
    $('#btn-save').click(function(){
        var Blog = {};
        Blog.title = $(".title").val();
        Blog.typeid =$(".typeId option:selected").val();
        Blog.content =$('#blog-content').summernote('code');
        Blog.summary = "摘要："+stringHtml(Blog.content).substr(0,100);
        Blog.keyword=$(".keyword").val();
        $.ajax({
            async:false,
            url:"/blog/saveBlog",
            data:JSON.stringify(Blog),
            contentType:"application/json;charset=utf-8",
            type:"POST",
            success:function (data) {
                console.log(data);
                if(data.code==200){
                    layer.msg('添加成功', {icon: 1,time: 500},function () {
                        $('#show-page', window.parent.document)
                            .attr('src', $('#show-page', window.parent.document).attr('src'));
                    });
                }else{
                    layer.msg('添加失败！'+data.data.msg, {icon: 2});
                }
            }
        });

        return false;
    });
});