let util = {};

/**
 * 根据年月字符串获得该月份的起始结束的时间戳(按月份筛选)
 * date_string:年月字符串，如：'2018-8'
 * @param date_string
 */
util.getMonthStartAndEndTimestamp = function (date_string) {
    if (!date_string) {
        return ['', ''];
    }
    let char = date_string.charAt(4);//获取分隔符
    let year = date_string.split(char)[0];
    let month = date_string.split(char)[1];
    let d = new Date(year, month, 0);
    let days = d.getDate();
    let start = new Date(year, month - 1, 1).getTime();
    let end = new Date(year, month - 1, days, 23, 59, 59).getTime();
    return [start, end];
};

function fixNum(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num.toString();
}

util.formatDateTime = function (timestamp) {
    if (!timestamp) {
        return '';
    }

    let date = new Date(+timestamp);
    return [
        date.getFullYear(),
        fixNum(date.getMonth() + 1),
        fixNum(date.getDate())
    ].join('-') + ' ' + [
        fixNum(date.getHours()),
        fixNum(date.getMinutes()),
        fixNum(date.getSeconds())
    ].join(':');
};

export default util;
