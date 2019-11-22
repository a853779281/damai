define(['jquery','md5'],function($,md5){
    return {
        regEv:function(selector){
            $('.reg').on('click',function(){

                $.ajax({
                    // url:'http://127.0.0.1:8080/day/xiangmu/php/reg.php',
                    url:"../php/reg.php",
                    type:'post',
                    dataType:"json",
                    data:{
                        password:$.md5($('#password').val()),
                        phone:$('#phone').val()
                    },
                    success:function(res){
                        if(res){
                            alert('注册成功');
                            location.href='http://127.0.0.1:8080/day/xiangmu/src/denglu.html';
                        }
                    }
                })
            })
        }
    }
})