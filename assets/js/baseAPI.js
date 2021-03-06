// 注意：每次调用$.get()或$.post()或$.ajax()的时候，会先调用ajaxPrefillter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url);

    // 统一为有权限的接口，设置headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载 complete 回调函数
    // 无论成功失败都会执行complete函数
    options.complete = function (res) {
        // console.log('res回调');
        // console.log(res);
        // 在 complete 回调函数中，可以使用 res.response.JSON 拿到服务器返回的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空假token
            localStorage.removeItem('token')
            // 2.跳转到登录页面
            if (window.parent) {
                window.parent.location.href = '/login.html'
            } else {
                location.href = '/login.html'
            }
            // location.href = '/login.html'
        }
    }

})