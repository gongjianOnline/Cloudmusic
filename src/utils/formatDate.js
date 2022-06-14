/**
 * splitValue 获取当前时间
 * @param value
 * @returns {array}
 */

export function showTime(val) {
  if (val < 60) {
    return `00:${Number.parseInt(val)}`
  } else {
    var min_total = Math.floor(val / 60); // 分钟
    var sec = Math.floor(val % 60); // 余秒

    if (min_total < 60) {
      // return min_total + "\t分钟" + sec + "\t秒";
      return `${Number.parseInt(min_total)} : ${Number.parseInt(sec)}`;
    } else {
      var hour_total = Math.floor(min_total / 60); // 小时数
      var min = Math.floor(min_total % 60); // 余分钟

      return hour_total + "\t小时" + min + "\t分钟" + sec + "\t秒";
    }
  }
}
export default {
  showTime
};
