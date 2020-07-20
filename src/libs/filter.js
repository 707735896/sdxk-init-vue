import Vue from 'vue';
// vue过滤器
Vue.filter('numbertoDate', function (value) {
    if (!value) {
        return '';
    }
    var t = new Date(value);
    var y = t.getFullYear();
    var m = t.getMonth() + 1;
    var d = t.getDate();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    return y + '/' + m + '/' + d;
});

function fixNum(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num.toString();
}

Vue.filter('timestampToDatetime', function (timestamp) {
    if (!timestamp) {
        return '';
    }

    let date = new Date(+timestamp);
    return [
        date.getFullYear(),
        fixNum(date.getMonth() + 1),
        fixNum(date.getDate())
    ].join('/') + ' ' + [
        fixNum(date.getHours()),
        fixNum(date.getMinutes()),
        fixNum(date.getSeconds())
    ].join(':');
});
