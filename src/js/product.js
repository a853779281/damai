let baseUrl = "http://127.0.0.1:8080/day/xiangmu";

define(['jquery','cookie'],function($,cookie){
    return {
        render:function(callback){
            let id = location.search.split('=')[1];
            $.ajax({
                url:`${baseUrl}/php/getitem.php`,
                type:'get',
                data:{
                    id:id
                },
                dataType:'json',
                success:function(res){
                    let pic = JSON.parse(res.pic);
                    let tempstr = `
                    <div class="xiangqingye">
                        <h1>${res.title}</h1>
                        <div>
                            <img src="${baseUrl}/src/${pic[1].src}" alt="${pic[1].title}">
                            <div class="movebox"></div>
                        </div>
                        <div class="time">
                            <span>${res.time}</span>
                        </div>
                        <div class="venue">
                        <span>${res.venue}</span>
                        </div>
                        <div class="Ticketfile">
                          场次<span>${res.Ticketfile}</span>
                        </div>
                        <div class="num-box">
                        <span>数量</span><input class="num" type="number" min="1" max="${res.num}" value="1">
                        </div>
                        <div class="num-jg">
                            价格：<span class="yuan">￥</span>${res.price}
                        </div>
                        
                        <input type="button" value="加入购物车" class="add" style="cursor: pointer;">
                        <div>${res.details}</div>
                        </div>
                    `;
                    $('.xiangqingye-zj').append(tempstr);
                    callback&&callback(res.id,res.price);
                }
            })
        },
        addItem:function(id,price,num){
            let shop = cookie.get('shop'); // 获取cookie数据 判断是否存在
            // 如果有cookie  修改cookie
            // 如果有cookie  添加cookie

            let product = {
                id:id,
                price:price,
                num:num
            };

            if(shop){
                shop = JSON.parse(shop);
                if(shop.some(elm=>elm.id==id)){
                    shop.forEach(elm=>{
                        elm.id==id?elm.num = num:null;
                    });
                }else{
                    shop.push(product);
                }
            }else{
                shop = []; // 购物车没有内容 新建一个购物车
                shop.push(product); //将商品放入购物车
            }
            cookie.set('shop',JSON.stringify(shop),1);
        }
    }
});