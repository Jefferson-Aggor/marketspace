const moment = require("moment");
const humanize = require("humanize");

const formatDate = (date) => {
  return moment(date).format("DD-MM");
};

const formatText = (str) => {
  return humanize.nl2br(str);
};

const formatLongText = (str) => {
  return humanize.truncatechars(str, 100);
};
const formatNum = (num) => {
  return humanize.numberFormat(num);
};

module.exports = { formatDate, formatText, formatNum, formatLongText };
