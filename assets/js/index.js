$(function () {
    // 调用getUserInfo
    getUserInfo()
    // 点击按钮，实现退出功能
    $('#btn_Logout').on('click', function () {
        layer.confirm('确认退出登录?', { icon: 5, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储token
            localStorage.removeItem('token')
            // 2.跳到登录页面
            location.href = '/login.html'

            // 关闭confirm框
            layer.close(index);
        });

    })





})
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')

            }
            // 调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },

    })
}



// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}