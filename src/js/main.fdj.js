require.config({
    paths:{
        jquery:"./jquery.min",
        fdj:"./public2"
    },
    shim:{}
});

require(['public2','fdj'],function($,fdj){
    fdj.render();
});