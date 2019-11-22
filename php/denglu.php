<?php
    include('./conn.php');

   
    $password = $_REQUEST['password'];
    $phone = $_REQUEST['phone'];
    //验证用户名
    $sql="select * from reg where user_phone='$phone' and user_pass='$password'";
    $result=$mysqli->query($sql);
    if($result->num_rows>0){
        echo '{"msg":"登录成功"}';
    }else{
        echo '{"msg":"请重新检查用户名和密码"}';
    }
    $mysqli->close();
?>
