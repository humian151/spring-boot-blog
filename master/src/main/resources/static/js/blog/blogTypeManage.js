//初始化表格
initTable("#blogtype_tab", "/blogType/listBlogType", [{
    checkbox: true
}, {
    field: 'id',
    title: '编号'
}, {
    field: 'typename',
    title: '类型名称'
}, {
    field: 'orderno',
    title: '排序'
}], function queryParams(params) {
    //设置查询参数
    var param = {
        pageNum: params.pageNumber,
        limit: params.pageSize,
        typename: $(".typename").val()
    };
    return param;
});

//查询
$('#btn-query').click(function () {
    $('#blogtype_tab').bootstrapTable('refresh');    //刷新表格
});
$('#btn-add').click(function () {
    $('.edit-typename').val('');
    $('.edit-orderno').val('');
    $('.edit-id').val('');
    $('#editModal').modal('show');//弹出框
});
//修改
$('#btn-edit').click(function () {
    var checkrow = $('#blogtype_tab').bootstrapTable('getSelections');
    if(checkrow.length==1){
        $('.edit-typename').val(checkrow[0].typename);
        $('.edit-id').val(checkrow[0].id);
        $('.edit-orderno').val(checkrow[0].orderno);
        $('#editModal').modal('show');//弹出框
    }else if(checkrow.length==0){
        layer.msg('请勾选数据！', {icon: 2,time: 1000,anim:6});
    }else {
        layer.msg('只能勾选一条数据！', {icon: 2,time: 1000,anim:6});
    }
});
//提交修改
$('#btn-submit').click(function () {
    var BlogType = {};
    if($('.edit-id').val()!="" && $('.edit-id').val() !=null){
        BlogType.id = $('.edit-id').val();
    }
    //flavr弹出层比遮挡问题修改flavr.css 将flavr-container.modal添加上：z-index:99999　即可。
    if($('.edit-typename').val()=='' || $('.edit-typename').val()==null){
        layer.msg('请输入类型名称！', {icon: 2,time: 1000,anim:6});
        return;
    }
    BlogType.typename = $('.edit-typename').val();
    BlogType.orderno = $('.edit-orderno').val();
    var url = "/blogType/modifyBlogType";
    if($('.edit-id').val()==null || $('.edit-id').val()==''){
        url = "/blogType/saveBlogType";
    }

    layer.confirm('确定保存吗？',{btn:["确定","取消"]},
        function(){
            $.ajax({
                type:"POST",
                url:url,
                data:JSON.stringify(BlogType),
                contentType:"application/json;charset=utf-8",
                success:function (data) {
                    if(data.code==200){
                        layer.msg('保存成功！', {icon: 1,time: 500});
                        $('#editModal').modal('hide');
                        $('#blogtype_tab').bootstrapTable('refresh');
                    }else{
                        layer.alert('保存失败！'+data.msg, {icon: 2,time: 5000});
                    }
                }
            });
        },
        function(){
            layer.closeAll();
        }
    );
});
//删除
$('#btn-del').click(function () {
    var checkrow = $('#blogtype_tab').bootstrapTable('getSelections');
    if(checkrow.length==0){
        new $.flavr({ content : '请勾选数据',autoclose : false});
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
                    url:"/blogType/delBlogType",
                    data:"ids="+ids,
                    success:function (data) {
                        if(data.code==200){
                            layer.msg('删除成功！', {icon: 1,time: 500});
                            $('#blogtype_tab').bootstrapTable('refresh');
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