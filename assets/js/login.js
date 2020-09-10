$(function () {
    // 点击去注册
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登陆
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从layui获取form对象
    var form = layui.form

    var layer = layui.layer
    form.verify({

        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 通过形参拿到确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });



    // 监听注册表单的提交时间
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('.reg-box [name = username]').val(),
            password: $('.reg-box [name = password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            // 模拟点击去登陆
            $('#link-login').click()
        })
    })


    // 监听登录表单提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token)
                location.href = "/index.html"
            }
        })
    })
})