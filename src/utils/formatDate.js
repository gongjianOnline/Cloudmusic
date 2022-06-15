/**
 * splitValue 获取当前时间
 * @param value
 * @returns {array}
 */

export function showTime(val) {
  if (val < 60) {
    return `00:${PrefixZero(Number.parseInt(val),2)}`
  } else {
    var min_total = Math.floor(val / 60); // 分钟
    var sec = Math.floor(val % 60); // 余秒

    if (min_total < 60) {
      // return min_total + "\t分钟" + sec + "\t秒";
      return `${PrefixZero(Number.parseInt(min_total),2)} : ${PrefixZero(Number.parseInt(sec),2)}`;
    } else {
      var hour_total = Math.floor(min_total / 60); // 小时数
      var min = Math.floor(min_total % 60); // 余分钟

      return hour_total + "\t小时" + min + "\t分钟" + sec + "\t秒";
    }
  }
}

// 数字补零
function PrefixZero(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

export default {
  showTime
};
