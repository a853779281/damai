define(['jquery','md5'],function($){
    return {
        login :function(selector){
            $('#dl-btn').on('click',function(){

                $.ajax({
                    url:'http://127.0.0.1:8080/day/xiangmu/php/denglu.php',
                    // url:"../php/denglu.php",
                    type:'post',
                    dataType:"json",
                    data:{
                        password:$.md5($('#password').val()),
                        // password:$('#password').val(),
                        
                        phone:$('#phone').val()
                    },
                    success:function(res){
                       if((res.msg) == "登录成功"){
                          alert('登录成功');
                          location.href='http://127.0.0.1:8080/day/xiangmu/src/index.html';
                        localStorage.setItem(username.value);
                       }else{

                       }
                    }
                })
            })
        }
    }
})