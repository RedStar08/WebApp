function ajax(options) {
    // 默认配置项
    let defaults = {
        type: 'get',
        url: '',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {},
        success: function() {},
        error: function() {}
    };
    // 将配置项赋值，可以覆盖响应的默认配置
    Object.assign(defaults, options);

    // 1.创建ajax对象
    let xhr = new XMLHttpRequest();
    let params = '';
    // 拼接defaults.data中的数据作为参数
    for (let attr in defaults.data) {
        params += (attr + '=' + defaults.data[attr] + '&');
    }
    params = params.substring(0, params.length - 1);
    // 判断请求类型，如果是get则在url后添加参数
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
    }

    // 2.初始化ajax对象
    xhr.open(defaults.type, defaults.url);

    // 3.发送请求
    if (defaults.type == 'post') {
        // 设置请求参数的格式类型
        const contentType = defaults.header['Content-Type'];
        xhr.setRequestHeader('Content-Type', contentType);
        // 请求参数的类型
        if (contentType.includes('application/json')) {
            // 请求参数类型为json直接send(data)
            xhr.send(JSON.stringify(defaults.data));
        } else {
            xhr.send(params);
        }
    } else {
        xhr.send();
    }

    // 4.获取服务器响应的数据
    xhr.onload = function() {
        let response = xhr.responseText;
        // 响应参数类型为json时，解析成json对象
        if (xhr.getResponseHeader('Content-Type').includes('application/json')) {
            response = JSON.parse(response);
        }
        // 响应结束后执行相关的函数
        if (xhr.status == 200) {
            defaults.success(response, xhr);
        } else {
            defaults.error(response, xhr);
        }
    };
    // 当网络中断时
    xhr.onerror = function() {
        // 调用失败回调函数并且将xhr对象传递给回调函数
        defaults.error(response, xhr);
    }
}

// 创建ajax实例
ajax({
    // type: 'get',
    // type: 'post',
    url: 'http://localhost:3000/ajax',
    // header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //         // 'Content-Type': 'application/json;charset=utf8'
    // },
    // data: {
    //     name: 'redstar',
    //     age: 23,
    //     sex: 'male'
    // },
    success: function(response, xhr) {
        console.log('ajax请求成功');
        console.log(response);
    },
    error: function(response, xhr) {
        console.log('ajax请求失败');
        console.log(response);
        console.log(xhr);
    }
});