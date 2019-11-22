let baseUrl = "http://127.0.0.1:8080/day/xiangmu";

define(['jquery'],function($){
    return {
        render:function(){
            $.ajax({
                url:`${baseUrl}/php/getall.php`,
                type:'get',
                dataType:'json',
                success:function(res){
                    let temp = '';
                    res.forEach(elm=>{
                        let pic = JSON.parse(elm.pic);
                        temp+=`
                            
                        <li class="item">
                        <a href="${baseUrl}/src/product.html?id=${elm.id}">                    
                            <div class="p-pic">
                                <img src="${baseUrl}/src/${pic[0].src}" alt="${pic[0].title}">
                            </div>
                            <div class="xr-right">
                            <div class="p-title">
                                ${elm.title}
                            </div>
                            <div class="p-price">
                                <span class="yuan">￥</span>${elm.price}
                            </div>
                            </div>
                        </a>
                    </li>`;
                            
                    });
                    $('.list').append(temp);
                }
            })
        }
    }
});