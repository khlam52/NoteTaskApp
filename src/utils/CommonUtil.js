import React from 'react';

import moment from 'moment';

import 'moment/locale/zh-hk';
import 'moment/locale/zh-cn';
import i18n from 'i18n-js';

const getMomentDate = (
  date,
  preSetDateFormat = null,
  dateFormat = 'DD MMMM YYYY, ddd HH:mm',
  local = 'en',
) => {
  let returnDate = 'N/A';
  if (i18n.locale === 'zh-Hant' || i18n.locale === 'zh-Hans') {
    local = 'zh-hk';
    dateFormat = 'llll';
  }

  if (date && preSetDateFormat) {
    returnDate =
      moment(date, preSetDateFormat).isValid() === true
        ? moment(date, preSetDateFormat)
            .utcOffset('+0800')
            .locale(local)
            .format(dateFormat)
        : 'N/A';
  } else if (date && !preSetDateFormat) {
    returnDate =
      moment(date).isValid() === true
        ? moment(date).utcOffset('+0800').locale(local).format(dateFormat)
        : 'N/A';
  }
  if (returnDate === 'Invalid date') {
    returnDate = 'N/A';
  }

  return returnDate;
};

const getMomentToday = () => {
  return moment().utcOffset('+0800');
};

const getMomentYesterday = () => {
  return moment().utcOffset('+0800').add(-1, 'days');
};

const getMomentTomorrow = () => {
  return moment().utcOffset('+0800').add(1, 'days');
};

const getMomentDaysAfter = (_after) => {
  return moment().utcOffset('+0800').add(_after, 'days');
};

const getMomentDaysAfterTheDay = (date, _after) => {
  return moment(date).utcOffset('+0800').add(_after, 'days');
};

const getMomentDaysWithin = (day = 6, _start = getMomentToday(), _end) => {
  let result = [],
    formatStr = 'DD.MM.YYYY HH:mm';
  if (_end === undefined) return result;
  if (_end.isSameOrBefore(_start)) return result;
  if (!moment.isMoment(_end) && !moment.isDate(_end)) return result;
  //   let now = _start.day(day);
  let startStr = moment(_start).format(formatStr);
  let endStr = moment(_end).format(formatStr);
  let nowStr = moment(_start).day(day).format(formatStr);
  //   if (now.isBefore(_start)) {
  //     now.add(7, 'd');
  //     startStr = moment(startStr, formatStr).add(7, 'd').format(formatStr);
  //   }
  while (
    moment(nowStr, formatStr).isBetween(
      moment(startStr, formatStr).subtract(1, 'days'),
      moment(endStr, formatStr),
    )
  ) {
    result.push(moment(nowStr, formatStr));
    nowStr = moment(nowStr, formatStr).add(7, 'd').format(formatStr);
  }
  return result;
};

const getMomentDateRange = (_start, _end, _poolToExclude) => {
  let result = [],
    formatStr = 'DD.MM.YYYY HH:mm';
  console.log('_start : ', _start);
  console.log('_end : ', _end);
  if (_end === undefined || _start === undefined) return result;
  if (
    (!moment.isMoment(_start) && !moment.isDate(_start)) ||
    (!moment.isMoment(_end) && !moment.isDate(_end))
  )
    return result;
  if (_end.isSameOrBefore(_start)) return result;
  let tar = _start;
  let startStr = moment(_start).format(formatStr);
  let endStr = moment(_end).format(formatStr);
  let tarStr = startStr;

  while (
    moment(tarStr, formatStr).isBetween(
      moment(startStr, formatStr).subtract(1, 'days'),
      moment(endStr, formatStr).add(1, 'days'),
    )
  ) {
    result.push(moment(tarStr, formatStr));
    tarStr = moment(tarStr, formatStr).add(1, 'd').format(formatStr);
  }

  return result;
};

const showCommonDateFormat = (date) => {
  let local = 'en';
  let dateFormat = 'DD MMM YYYY';
  if (i18n.locale === 'zh-Hant' || i18n.locale === 'zh-Hans') {
    local = 'zh-hk';
    dateFormat = 'LL';
  }
  return getMomentDate(date, null, dateFormat, local);
};

const showDDMMMDateFormat = (date) => {
  let local = 'en';
  let dateFormat = 'DD MMM';
  if (i18n.locale === 'zh-Hant' || i18n.locale === 'zh-Hans') {
    local = 'zh-hk';
    dateFormat = 'M月DD日';
  }
  return getMomentDate(date, null, dateFormat, local);
};

const showMMMYYYYDateFormat = (date) => {
  let local = 'en';
  let dateFormat = 'MMM YYYY';
  if (i18n.locale === 'zh-Hant' || i18n.locale === 'zh-Hans') {
    local = 'zh-hk';
    dateFormat = 'YYYY年MM月';
  }
  return getMomentDate(date, null, dateFormat, local);
};

const showBookingTimeFormat = (date) => {
  let local = 'en';
  let dateFormat = 'HH:mm';
  if (i18n.locale === 'zh-Hant' || i18n.locale === 'zh-Hans') {
    local = 'zh-hk';
    dateFormat = 'HH:mm';
  }
  return getMomentDate(date, null, dateFormat, local);
};

export default {
  getMomentDate,
  getMomentToday,
  getMomentYesterday,
  getMomentTomorrow,
  getMomentDaysAfter,
  getMomentDaysWithin,
  getMomentDateRange,
  getMomentDaysAfterTheDay,
  showCommonDateFormat,
  showBookingTimeFormat,
  showDDMMMDateFormat,
  showMMMYYYYDateFormat,
};
