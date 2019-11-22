(function() {
    var base = function(selector, context) {

        if (typeof selector == 'function') {
            ready(selector);
            return; //终止函数执行
        }
        // 调用构造函数
        return new Base(selector, context);
    }

    function Base(selector, context) {
        var elms;
        // var elms = document.querySelectorAll(selector);

        if (selector.nodeType === 1) { //如果传入的是一个DOM元素
            // 将dom元素 放入新创建的对象中
            // 将dom元素变成Base构造函数创建的对象
            this[0] = selector;
            Object.defineProperty(this, 'length', { value: 1 });
        } else {
            // node.querySelectorAll()
            // context 上下文  缩小查找范围
            elms = context ? context.querySelectorAll(selector) : document.querySelectorAll(selector);
            Object.assign(this, elms);
            Object.defineProperty(this, 'length', { value: elms.length });
        }

    }


    // 重置原型 使用一个新对象替换原有的原型对象
    Base.prototype = {
        // constructor: Base, // 丢失的constructor
        each: function(callback) {
            for (var i = 0; i < this.length; i++) {
                callback(this[i], i);
            }
        },
        on: function(type, callback) {
            if (typeof type === 'string' && callback) { //保存一定有2个参数
                this.each(function(elm, i) {
                    elm.addEventListener(type, callback);
                });
            } else if (typeof type === 'object') {
                this.each(function(elm, i) { // 此循环 是遍历被选元素
                    Base.each(type, function(key, value) { //此循环遍历 传入对象参数
                        elm.addEventListener(key, value);
                    });
                })
            }
        },
        css: function(style, value) {
            // 设置行内样式
            var str = '';
            if (typeof style === "string" && value) {
                this.each(function(elm, i) { //遍历被选元素
                    elm.style = `${elm.style.cssText}${style}:${value};`;
                });
            } else if (typeof style === "object") {
                Base.each(style, function(key, value) {
                    str += `${key}:${value};`;
                });
                this.each(function(elm, i) { //遍历被选元素
                    elm.style = `${elm.style.cssText}${str}`;
                });
            }
            // 链式调用的原理 在原型函数中 return this
            return this; //this指向Base构建的新的对象
        },
        addClass: function(className) { // 加类名
            this.each(function(elm, i) { //遍历被选元素
                elm.classList.add(className); //为每个被选元素  加类名
            });

            return this;
        },
        removeClass: function(className) {
            this.each(function(elm, i) {
                elm.classList.remove(className);
            });
            return this;
        },
        index: function(elm) {
            // 在this中找elm的索引
            // console.log(elm);
            // console.log(this);
            var arr = Array.from(this);
            // console.log(arr.indexOf(elm));
            return arr.findIndex(val => val == elm);
        },
        tabs: function(options) {
            var defaults = { //默认参数
                ev: 'click',
                active: 'actived',
                display: 'show'
            }
            Object.assign(defaults, options);
            // console.log(this[0]);
            var btns = $('#' + this[0].id + '>ul>li', this[0]); //选择所有的按钮
            var oDiv = $('#' + this[0].id + '>div[data-type="tabs"]', this[0]); //选择所有div

            btns.on(defaults.ev, function() {
                var index = btns.index(this);
                btns.removeClass(defaults.active);
                $(this).addClass(defaults.active);

                oDiv.removeClass(defaults.display);
                $(oDiv[index]).addClass(defaults.display);
            });
        },
        animate: function(style, callback) { //多属性缓存运动
            // 想要改变元素的位置 获取当前元素的位置(计算后样式)
            // 需要目标位置(样式)
            this.each(function(elm, i) {
                clearInterval(elm.timer);
                elm.timer = setInterval(function() {
                    var flag = true; // 开关 判断动画是否可以停止 为true时才可以停止动画
                    var currentStyle = 0; //当前样式
                    for (var attr in style) {
                        if (attr === 'opacity') {
                            currentStyle = Math.ceil(getStyle(elm, attr) * 100);
                        } else {
                            currentStyle = parseInt(getStyle(elm, attr));
                        }

                        var speed = (style[attr] - currentStyle) / 10; // 速度计算
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                        if (currentStyle != style[attr]) { //当前没有到达目标
                            flag = false;
                        }

                        if (attr === 'opacity') {
                            elm.style[attr] = (currentStyle + speed) / 100;
                        } else {
                            elm.style[attr] = currentStyle + speed + 'px';
                        }

                        if (flag) {
                            clearInterval(elm.timer);
                            callback && callback();
                        }
                    }
                }, 20);
            });
            return this;
        },
        html: function(html) {
            if (typeof html === "function") {
                this.each(function(elm, i) {
                    elm.innerHTML = html(elm.innerHTML, i);
                });
            } else if (typeof html === 'string') {
                this.each(function(elm) {
                    elm.innerHTML = html;
                });
            }

        },
        offset: function() {
            // 获得第一个被选元素的值
            return {
                left: this[0].offsetLeft,
                top: this[0].offsetTop,
                width: this[0].offsetWidth,
                height: this[0].offsetHeight
            }
        }
    };

    // 将constructor 设置成不可枚举 不可修改 不可删除
    Object.defineProperty(Base.prototype, 'constructor', {
        value: Base
    });


    // 遍历对象
    Base.each = function(obj, callback) {
        for (var key in obj) {
            callback(key, obj[key]);
        }
    }

    function ready(callback) {
        document.addEventListener('DOMContentLoaded', function() {
            // 就绪事件 执行后就移除事件
            document.removeEventListener('DOMContentLoaded', arguments.callee);
            callback();
        });
    }

    function getStyle(elm, style) {
        if (typeof getComputedStyle === 'function') {
            return getComputedStyle(elm)[style];
        } else {
            return elm.currentStyle[style];
        }
    }


    window.$ = base;
})()