function fn(zhangsan,lisi,wangwu){
    return zhangsan;
}
//1.随机数的方法
function rannum(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
//2.自定义函数
function double(n) {
    return n < 10 ? '0' + n : n;
}
//3.兼容获取任意的css属性的值
function getstyle(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
//4.事件绑定的方法
function addEvent(obj, etype, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(etype, fn, false);
    } else {
        obj.attachEvent('on' + etype, fn);
    }
}

function removeEvent(obj, etype, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(etype, fn, false);
    } else {
        obj.detachEvent('on' + etype, fn);
    }
}
