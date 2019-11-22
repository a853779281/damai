! function () {
    class magnifying {
        constructor() {
            this.wrap = $('.wrap');
            this.spic = $('#spic'); //小图
            this.sf = $('#sf'); //小放
            this.bf = $('#bf'); //大放
            this.bpic = $('#bpic'); //大图
            this.ullist = $('#list ul');
            this.list = $('#list li'); //10个li
            this.left = $('#left');
            this.right = $('#right');
        }

        init() {
            let _this = this;
            //1.鼠标移入小图，显示小放和大放。移出同理
            this.spic.hover(function () {
                $('#sf,#bf').css('visibility', 'visible');

                //3.鼠标移动，小放跟随
                _this.spic.on('mousemove', function (ev) {
                    _this.spicmove(ev);
                });

            }, function () {
                $('#sf,#bf').css('visibility', 'hidden');
            });

            //2.求小放的尺寸。
            this.sf.css({
                width: this.spic.width() * this.bf.width() / this.bpic.width(),
                height: this.spic.height() * this.bf.height() / this.bpic.height(),
            });
            //4.求比例
            this.bili = this.bpic.width() / this.spic.width();

            //5.给下面的列表li添加点击事件
            this.list.on('click', function () {
                _this.changepicurl($(this));
            });

            //6.给right按钮添加事件
            this.num = 6; //可视的图片长度
            //返回值:eq(index|-index)获取第N个元素
            this.liwidth = this.list.eq(0).outerWidth(); //1个li的宽度

            //长度小于6，无需显示左右按钮
            if (this.list.length <= 6) {
                this.right.css('color', '#fff');
            }

            this.right.on('click', function () {
                _this.rightclick();
            });

            //7.给left按钮添加事件
            this.left.on('click', function () {
                _this.leftclick();
            });
        }
        spicmove(ev) {
            let l = ev.pageX - this.wrap.offset().left - this.sf.width() / 2;
            let t = ev.pageY - this.wrap.offset().top - this.sf.height() / 2;
            if (l < 0) {
                l = 0;
            } else if (l >= this.spic.width() - this.sf.width()) {
                l = this.spic.width() - this.sf.width();
            }
            if (t < 0) {
                t = 0;
            } else if (t >= this.spic.height() - this.sf.height()) {
                t = this.spic.height() - this.sf.height();
            }

            this.sf.css({
                left: l,
                top: t
            });

            this.bpic.css({
                left: -l * this.bili,
                top: -t * this.bili
            })
        }


        changepicurl(obj) {
            let $imgurl = obj.find('img').attr('src');
            this.spic.find('img').attr('src', $imgurl);
            this.bpic.attr('src', $imgurl);
        }


        rightclick() {
            if (this.list.length > this.num) {
                this.num++;
                this.left.css('color', '#333');
                if (this.num === this.list.length) {
                    this.right.css('color', '#fff');
                }
                this.ullist.animate({
                    left: -this.liwidth * (this.num - 6)
                });
            }
        }

        leftclick() {
            if (this.num > 6) {
                this.num--;
                this.right.css('color', '#333');
                if (this.num === 6) {
                    this.left.css('color', '#fff');
                }
                this.ullist.animate({
                    left: -this.liwidth * (this.num - 6)
                });
            }
        }

    }
    new magnifying().init();
}();