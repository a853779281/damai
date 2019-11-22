
//配置
require.config({
    paths:{ // 模块和路径
        jquery:"./jquery.min",
        login:"./login",
        md5:"./lib/jquery.md5"
    },
    shim:{
        md5:['jquery']
    }
});
require(['jquery','login'],function($,login){
    login.login();
})