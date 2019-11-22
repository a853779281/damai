! function ($) {
    $('.close').on('click', function () {
        $fotterbg = $('.footerbg').slideUp(800)

   $('ul').on('click',function(){
       
   })
   $('.del1').on('click',function(){
    // $('.item').remove();
    console.log(1);
})
    })
        }(jQuery)
function Taobao() {
    this.banner = document.querySelector('.banner');
    this.moveul = document.querySelector('.banner ul');
    this.picli = document.querySelectorAll('.banner ul li');
    this.btnli = document.querySelectorAll('.banner ol li');
    this.left = document.querySelector('#left');
    this.right = document.querySelector('#right');
    this.index = 0;
    this.timer = null;
    this.flag = true;
}
Taobao.prototype.init = function () {
    let _this = this;
    let firstpic = this.picli[0].cloneNode(true);
    let lastpic = this.picli[this.picli.length - 1].cloneNode(true);
    this.moveul.appendChild(firstpic);
    this.moveul.insertBefore(lastpic, this.moveul.children[0]);
    //给ul赋值宽度和位置。
    this.liwidth = this.picli[0].offsetWidth; 
    this.moveul.style.width = this.moveul.children.length * this.liwidth + 'px';
    this.moveul.style.left = -this.liwidth + 'px';
    //按钮添加点击事件
    for (let i = 0; i < this.btnli.length; i++) {
        this.btnli[i].onclick = function () {
            _this.index = i;
            _this.tabswitch(_this.index);
            _this.btnli[_this.index].className = 'active';
        }
    }
    //显示隐藏箭头
    this.banner.onmouseover = function () {
        _this.left.style.display = 'block';
        _this.right.style.display = 'block';
        clearInterval(_this.timer);
    };
    this.banner.onmouseout = function () {
        _this.left.style.display = 'none';
        _this.right.style.display = 'none';
        _this.timer = setInterval(function () {
            _this.right.onclick();
        }, 2000);
    }
    //点击箭头切换图片
    this.right.onclick = function () {
        if (_this.flag) {
            _this.rightmove();
            _this.flag = false;
        }

    }
    this.left.onclick = function () {
        if (_this.flag) {
            _this.leftmove();
            _this.flag = false;
        }
    }

    //自动切换
    this.timer = setInterval(function () {
        _this.right.onclick();
    }, 3000);

};
//left事件
Taobao.prototype.leftmove = function () {
    this.index--;
    this.tabswitch(this.index);
    if (this.index < 0) {
        this.btnli[this.btnli.length - 1].className = 'active';
    } else {
        this.btnli[this.index].className = 'active';
    }
}
//right事件
Taobao.prototype.rightmove = function () {
    this.index++;
    this.tabswitch(this.index);
    if (this.index > this.btnli.length - 1) {
        this.btnli[0].className = 'active';
    } else {
        this.btnli[this.index].className = 'active';
    }
}
//切换运动的过程
Taobao.prototype.tabswitch = function (index) {
    let _this = this;
    for (let j = 0; j < this.btnli.length; j++) {
        this.btnli[j].className = '';
    }
    buffermove(this.moveul, {
        left: -this.liwidth * (this.index + 1)
    }, function () {

        if (_this.index > _this.btnli.length - 1) {
            _this.moveul.style.left = -_this.liwidth + 'px';
            _this.index = 0;
        }
        if (_this.index < 0) {
            _this.moveul.style.left = -_this.liwidth * 2 + 'px';
            _this.index = 1;
        }

        _this.flag=true;
    });
}
new Taobao().init();


