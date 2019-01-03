$(function(){
    //初始化博客类型查询下拉框
    loadBlogType();
    //初始化表格
    initTable("#blog_tab", "/blog/listBlog", [{
        checkbox: true
    }, {
        field: 'id',
        title: '编号'
    }, {
        field: 'title',
        title: '标题'
    }, {
        field: 'releasedate',
        title: '发布日期',
        class: 'releasedate',
        formatter: function (value, row, index) {
            return changeDateFormat(value)
        }
    }, {
        field: 'typename',
        title: '博客类别'
    }], function queryParams(params) {
        //设置查询参数
        var param = {
            pageNum: params.pageNumber,
            limit: params.pageSize,
            typeid: $(".blogtype option:selected").val(),
            title: $(".title").val()
        };
        return param;
        //return params;
    });
    //查询
    $('#btn-query').click(function () {
        $('#blog_tab').bootstrapTable('refresh');    //刷新表格
    });
    //修改
    $('#btn-edit').click(function () {
        var checkrow = $('#blog_tab').bootstrapTable('getSelections');
        if(checkrow.length==1){
            $('#show-page').attr('src','/admin/modifyBlog.htm?blogid='+checkrow[0].id);
            $('#editModal').modal('show');//弹出框
        }else if(checkrow.length==0){
            layer.msg('请勾选数据！', {icon: 2,time: 1000,anim:6});
        }else {
            layer.msg('只能勾选一条数据！', {icon: 2,time: 1000,anim:6});
        }
    });
    //删除
    $('#btn-del').click(function () {
        var checkrow = $('#blog_tab').bootstrapTable('getSelections');
        if(checkrow.length==0){
            layer.msg('请勾选数据！', {icon: 2,time: 1000,anim:6});
        }else {
            var ids = "";
            for(var i=0;i<checkrow.length;i++){
                ids += checkrow[i].id+",";
            }
            ids = ids.substring(0,ids.length-1);

            layer.confirm('确定删除'+ids+'吗？',{btn:["确定","取消"]},
                function(){
                    $.ajax({
                        type:"POST",
                        url:"/blog/delBlog",
                        data:"ids="+ids,
                        success:function (data) {
                            if(data.code==200){
                                layer.msg('删除成功！', {icon: 1,time: 500});
                                $('#blog_tab').bootstrapTable('refresh');
                            }else{
                                layer.alert('删除失败！'+data.msg, {icon: 2,time: 5000});
                            }
                        }
                    });
                },
                function(){
                    layer.closeAll();
                }
            );
        }
    });
});