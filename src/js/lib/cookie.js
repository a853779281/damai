define([],function(){
    return {
        get: function(key) {
            if (document.cookie) { //判断是否有cookie
                let arr = document.cookie.split('; '); //拆分cookie
                for (let i = 0; i < arr.length; i++) {
                    let item = arr[i].split('='); //拆分cookie，获得key和value
                    // 遍历寻找key 返回值
                    if (item[0] === key) return item[1];
                }
                return ''; //如果遍历结束 都没有找到  返回空字符串
            }
        },
        set: function(key, value, day) {
            if (day) {
                var d = new Date();
                d.setDate(d.getDate() + day);
                document.cookie = `${key}=${value};expires=${d};path=/`;
            } else {
                document.cookie = `${key}=${value};path=/`;
            }
        },
        remove: function(key) {
            this.set(key, '', -1);
        }
    };
})
 