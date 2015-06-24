var mo;
(function (mo) {
    /**
     * 获取今天的时间。
     * @param {String} time 例如：11:00
     * @returns {Date}
     */
    function getTimeOfToday(time) {
        var today = Date.newDate();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var date = today.getDate();
        return Date.newDate(year + "/" + month + "/" + date + " " + time);
    }
    mo.getTimeOfToday = getTimeOfToday;
    function getDateTime(time, d, nextDays) {
        d = d || Date.newDate();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var newDateTime = Date.newDate(year + "/" + month + "/" + date + " " + time);
        if (nextDays) {
            newDateTime = Date.newDate(newDateTime.getTime() + (1000 * 60 * 60 * 24) * nextDays);
        }
        return newDateTime;
    }
    mo.getDateTime = getDateTime;
    /**
     * 格式化时间
     *  1、< 60s, 显示为“刚刚”
     *  2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
     *  3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
     *  4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
     *  5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
     * @param {String} time 如：Sun May 25 2014 12:36:12 GMT+0800 (CST)
     * @returns String
     */
    function timeFormat(time) {
        var date = Date.newDate(time), curDate = Date.newDate(), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(), hour = date.getHours(), minute = date.getMinutes(), curYear = curDate.getFullYear(), curHour = curDate.getHours(), timeStr;
        if (year < curYear) {
            timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
        }
        else {
            var pastTime = curDate.getTime() - date.getTime(), pastH = pastTime / 3600000;
            if (pastH > curHour) {
                timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
            }
            else if (pastH >= 1) {
                timeStr = '今天 ' + hour + ':' + minute + '分';
            }
            else {
                var pastM = curDate.getMinutes() - minute;
                if (pastM > 1) {
                    timeStr = pastM + '分钟前';
                }
                else {
                    timeStr = '刚刚';
                }
            }
        }
        return timeStr;
    }
    mo.timeFormat = timeFormat;
    /**
     * 毫秒转成 x时x分x秒格式
     * @param msd
     * @returns {number}
     */
    function millisecondToDate(msd) {
        var result;
        var time = parseFloat(msd) / 1000;
        if (null != time) {
            if (time > 60 && time < 60 * 60) {
                result = Math.floor(time / 60.0) + "分钟" + Math.floor((time / 60.0 - Math.floor(time / 60.0)) * 60) + "秒";
            }
            else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                result = Math.floor(time / 3600.0) + "小时" + Math.floor(((time / 3600.0) - Math.floor(time / 3600.0)) * 60) + "分钟" + Math.floor(((((time / 3600.0) - Math.floor(time / 3600.0)) * 60) - Math.floor(((time / 3600.0) - Math.floor(time / 3600.0)) * 60)) * 60) + "秒";
            }
            else {
                result = Math.floor(time) + "秒";
            }
        }
        else {
            result = "0时0分0秒";
        }
        return result;
    }
    mo.millisecondToDate = millisecondToDate;
    function formatWeekdayHour(date, isEveryDay) {
        date = Date.newDate(date);
        var day = date.getDay();
        var hour = date.getHours();
        var map = {
            1: "一",
            2: "二",
            3: "三",
            4: "四",
            5: "五",
            6: "六",
            7: "日"
        };
        return (isEveryDay ? "每天" : "星期" + map[day]) + " " + (hour > 10 ? hour : "0" + hour) + ":00:00";
    }
    mo.formatWeekdayHour = formatWeekdayHour;
    /**
     * 获取“周一、周二”这种字符串
     * @param weekday
     */
    function getWeekdayDesc(weekday) {
        if (typeof weekday == "string") {
            weekday = weekday.split(",");
        }
        var map = {
            1: "周一",
            2: "周二",
            3: "周三",
            4: "周四",
            5: "周五",
            6: "周六",
            7: "周日"
        };
        var tempArr = [];
        for (var i = 0, li = weekday.length; i < li; i++) {
            tempArr.push(map[weekday[i]]);
        }
        return tempArr.join("、");
    }
    mo.getWeekdayDesc = getWeekdayDesc;
    /**
     * 根据时间得到时间的字符串，时间单位为毫秒，得到的为 HH:MM:SS或者MM:SS 这种。
     * @param milliseconds
     * @returns {string}
     */
    function getTimeStr(milliseconds, locale) {
        var str = "";
        var hS = ":", mS = ":", sS = "";
        if (locale) {
            hS = "时";
            mS = "分";
            sS = "秒";
        }
        var seconds = Math.round(milliseconds / 1000);
        var h = Math.floor(seconds / (60 * 60));
        if (h) {
            str += ((h < 10 ? "0" : "") + h) + hS;
        }
        seconds = seconds % (60 * 60);
        var m = Math.floor(seconds / 60);
        var s = Math.floor(seconds % 60);
        return str + ((m < 10 ? "0" : "") + m) + mS + ((s < 10 ? "0" : "") + s) + sS;
    }
    mo.getTimeStr = getTimeStr;
    /**
     * 获得时间字符串
     * @param timeA
     * @param timeB
     * @returns {*}
     */
    function getBetweenTimeString(timeA, timeB) {
        var aTime = Date.newDate(timeA);
        var bTime = Date.newDate(timeB);
        if (aTime.isAfter(bTime)) {
            var tmpTime = Date.newDate(bTime);
            bTime = aTime;
            aTime = tmpTime;
        }
        var ret = null;
        var diffMinutes = aTime.getMinutesBetween(bTime);
        if (diffMinutes <= 0) {
            return "刚刚";
        }
        if (diffMinutes < 60) {
            return mo.formatStr("%s分钟前", diffMinutes);
        }
        var diffHours = aTime.getHoursBetween(bTime);
        if (diffHours < 24) {
            return mo.formatStr("%s小时前", diffHours);
        }
        var diffDays = aTime.getDaysBetween(bTime);
        var diffMonths = aTime.getMonthsBetween(bTime);
        if (diffDays < 7) {
            return mo.formatStr("%s天前", diffDays);
        }
        if (diffDays >= 7 && diffMonths < 1) {
            return mo.formatStr("%s周前", Math.floor(diffDays / 7));
        }
        if (diffMonths < 12) {
            return mo.formatStr("%s月前", Math.floor(diffMonths));
        }
        return mo.formatStr("%s年前", Math.floor(diffMonths / 12));
    }
    mo.getBetweenTimeString = getBetweenTimeString;
    function getNextTime(refreshTimeArr, time) {
        time = time || Date.newDate();
        var hours = time.getHours();
        var h;
        for (var i = 0, li = refreshTimeArr.length; i < li; i++) {
            var itemi = refreshTimeArr[i];
            if (itemi > hours) {
                h = itemi;
                break;
            }
        }
        time.clearTime();
        if (h == null) {
            h = refreshTimeArr[0];
            time.addDays(1);
        }
        time.setHours(h);
        return time;
    }
    mo.getNextTime = getNextTime;
})(mo || (mo = {}));
