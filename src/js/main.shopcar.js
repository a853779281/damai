require.config({
    paths:{
        jquery:"./jquery.min",
        cookie:"./lib/cookie",
        shopcar:"./shopcar"
    },
    shim:{}
});

require(['jquery','shopcar'],function($,shopcar){
    shopcar.render();
});
