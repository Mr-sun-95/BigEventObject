$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nikname: function (value) {
            if (value.length > 6) {
                return '用户名称长度1~6位'
            }
        }
    })
    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res.data);
                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }


    // 重置表单的数据
    $('#btnRset').on('click', function (e) {
        // 组织默认清除表单行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单提交时间
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        // 发起Ajax数据请求
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                //  调用父页面的方法，更新渲染侧边栏内容
                window.parent.getUserInfo()
            }
        })
    })

})