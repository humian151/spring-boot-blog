//初始化表格
initTable("#data_tab", "/comment/listComment", [{
    checkbox: true
}, {
    field: 'id',
    title: '编号'
}, {
    field: 'userip',
    title: '用户登录ip'
}, {
    field: 'title',
    title: '博客标题'
}, {
    field: 'blogid',
    title: '博客id'
}, {
    field: 'content',
    title: '评论内容'
}, {
    field: 'commentdate',
    title: '评论时间',
    formatter: function (value, row, index) {
        return changeDateFormat(value)
    }
}, {
    field: 'state',
    title: '审核状态',
    formatter: function (value, row, index) {
        if(value =="0"){
            return "未审核";
        }else if(value =="1"){
            return "审核通过";
        }else if(value =="2"){
            return "审核不通过";
        }
    }
}], function queryParams(params) {
    //设置查询参数
    var param = {
        pageNum: params.pageNumber,
        limit: params.pageSize,
        content: $(".content").val(),
        title: $(".title").val(),
        state: $(".state option:selected").val()
    };
    return param;
});
//隐藏列
$('#data_tab').bootstrapTable('hideColumn', 'blogid');

//查询
$('#btn-query').click(function () {
    $('#data_tab').bootstrapTable('refresh');    //刷新表格
});
//修改
$('#btn-edit').click(function () {
    var checkrow = $('#data_tab').bootstrapTable('getSelections');
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
//审核
function  auditComment(_state) {
    var checkrow = $('#data_tab').bootstrapTable('getSelections');
   if(checkrow.length==0){
       layer.msg('请勾选数据！', {icon: 2,time: 1000,anim:6});
    }else {
       var msg = _state==1?'确定审核通过吗？':'确定审核拒绝吗？';

       layer.confirm(msg,{btn:["确定","取消"]},
           function(){
               for(var i=0;i<checkrow.length;i++){
                   var Comment = {};
                   var row = checkrow[i];
                   Comment.id = row.id;
                   Comment.userip = row.userip;
                   Comment.content = row.content;
                   Comment.commentdate = row.commentdate;
                   Comment.state = _state;
                   Comment.blogid = row.blogid;
                   $.ajax({
                       type:"POST",
                       url:"/comment/modifyComment",
                       data:JSON.stringify(Comment),
                       contentType:"application/json;charset=utf-8",
                       success:function (data) {
                           if(data.code==200){
                               layer.msg('保存成功！', {icon: 1,time: 500});
                               $('#data_tab').bootstrapTable('refresh');
                           }else{
                               layer.alert('保存失败！'+data.msg, {icon: 2,time: 5000});
                           }
                       }
                   });

               }
           },
           function(){
               layer.closeAll();
           }
       );
    }
}
//删除
$('#btn-del').click(function () {
    var checkrow = $('#data_tab').bootstrapTable('getSelections');
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
                    url:"/comment/delComment",
                    data:"ids="+ids,
                    success:function (data) {
                        if(data.code==200){
                            layer.msg('删除成功！', {icon: 1,time: 500});
                            $('#data_tab').bootstrapTable('refresh');
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