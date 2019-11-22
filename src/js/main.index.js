require.config({
    paths:{
        jquery:"./jquery.min",
        index:"./index",

    },
    shim:{}
});

require(['jquery','index'],function($,index){
    index.render();
});
