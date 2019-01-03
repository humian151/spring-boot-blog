//初始化表格
initTable("#data_tab", "/user/listUser", [{
    checkbox: true
}, {
    field: 'id',
    title: '编号'
}, {
    field: 'username',
    title: '登录名'
}, {
    field: 'name',
    title: '用户名称'
}, {
    field: 'password',
    title: '密码'
}, {
    field: 'avatar',
    title: '头像'
}, {
    field: 'nickname',
    title: '昵称'
}, {
    field: 'sign',
    title: '用户签名'
}, {
    field: 'prifile',
    title: '用户说明'
}], function queryParams(params) {
    //设置查询参数
    var param = {
        pageNum: params.pageNumber,
        limit: params.pageSize,
        name: $(".name").val()
    };
    return param;
});
//隐藏列
$('#data_tab').bootstrapTable('hideColumn', 'avatar');
$('#data_tab').bootstrapTable('hideColumn', 'password');

//查询
$('#btn-query').click(function () {
    $('#data_tab').bootstrapTable('refresh');    //刷新表格
});
//新增
$('#btn-add').click(function () {
    $('.edit-password').val('');
    $('.edit-avatar').val('');
    $('.edit-username').val('');
    $('.edit-name').val('');
    $('.edit-nickname').val('');
    $('.edit-sign').val('');
    $('.edit-prifile').val('');
    $('.edit-id').val('');
    $('#editModal').modal('show');//弹出框
});
//修改
$('#btn-edit').click(function () {
    var checkrow = $('#data_tab').bootstrapTable('getSelections');
    if(checkrow.length==1){
        $('.edit-password').val(checkrow[0].password);
        $('.edit-avatar').val(checkrow[0].avatar);
        $('.edit-username').val(checkrow[0].username);
        $('.edit-name').val(checkrow[0].name);
        $('.edit-nickname').val(checkrow[0].nickname);
        $('.edit-sign').val(checkrow[0].sign);
        $('.edit-prifile').val(checkrow[0].prifile);
        $('.edit-id').val(checkrow[0].id);
        $('#editModal').modal('show');//弹出框
    }else if(checkrow.length==0){
        layer.msg('请勾选数据！', {icon: 2,time: 1000,anim:6});
    }else {
        layer.msg('只能勾选一条数据！', {icon: 2,time: 1000,anim:6});
    }
});
//提交
$('#btn-submit').click(function () {

    layer.confirm('确定保存吗？',{btn:["确定","取消"]},
        function(){
            var User = {};
            User.id = $('.edit-id').val();
            User.password =  $('.edit-password').val();
            User.avatar =$('.edit-avatar').val();
            User.username =  $('.edit-username').val();
            User.name = $('.edit-name').val();
            User.nickname = $('.edit-nickname').val();
            User.sign = $('.edit-sign').val();
            User.prifile = $('.edit-prifile').val();
            var url = "/user/modifyUser";
            if($('.edit-id').val() ==null || $('.edit-id').val() ==""){
                url = "/user/saveUser";
            }
            $.ajax({
                type:"POST",
                url:url,
                data:JSON.stringify(User),
                contentType:"application/json;charset=utf-8",
                success:function (data) {
                    if(data.code==200){
                        layer.msg('保存成功！', {icon: 1,time: 500});
                        $('#data_tab').bootstrapTable('refresh');
                        $('#editModal').modal('hide');
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
                    url:"/user/delUser",
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