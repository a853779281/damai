let baseUrl = "http://127.0.0.1:8080/day/xiangmu";
define(['jquery','cookie'],function($,cookie){
    return {
        render:function(){
            let shop = cookie.get('shop');
            if(shop) {
                shop = JSON.parse(shop);
                let idList = shop.map(elm=>elm.id).join(); //取id并且用,连接
                $.ajax({
                    url:`${baseUrl}/php/shop.php`,
                    type:'get',
                    data:{
                        idlist:idList
                    },
                    dataType:'json',
                    success:function(res){

                        let tempstr = '';
                        res.forEach(elm=>{
                            let pic = JSON.parse(elm.pic);
                            let arr = shop.filter((val,i)=>{
                                // 从购物车cookie数据中取出于本条遍历数据相同id的元素
                                return val.id == elm.id;
                            });
                          
                            tempstr+=`
                                <li class="item">
                                    <div class="c-box">
                                        <input type="checkbox" id="p1">
                                    </div>
                                    <div class="p-img">
                                        <img src="${baseUrl}/src/${pic[0].src}" alt="${pic[0].title}">
                                    </div>
                                    <div class="p-title">
                                       ${elm.title}
                                    </div>
                                    <div class="p-num">
                                        数量：<input type="number" value="${arr[0].num}" min="1" max="${elm.num}">
                                    </div>
                                    <div class="p-price">
                                        单价:${elm.price}
                                    </div>
                                    <div class="p-sum">
                                        总价:￥${(arr[0].num*elm.price).toFixed(2)}
                                    </div>
                                    <div class="del"><a href="javascript:;" class="del1">删除</a></div>
                                </li>
                            `;
                        });
                        $('.itemlist').append(tempstr);
                    }
                });
            }
            

                
            
            
        }
    }
});