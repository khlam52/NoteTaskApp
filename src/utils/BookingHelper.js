import _ from 'lodash';
import moment from 'moment';
import ApiService from '../services/ApiService';
import CommonUtil from './CommonUtil';
import useAppContext from '~src/contexts/app';

export const STATUS_CODE_MAP = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  PAID: 'paid',
};
const getTimeArray = () => {
  let timeArray = [];
  let timeNextDayArray = [];
  let timeRangeArray = [];

  new Array(25).fill().forEach((acc, index) => {
    let startRangeTime = moment({ hour: index }).format('HH:mm');
    let endRangeTime = moment({ hour: index, minute: 30 }).format('HH:mm');
    timeRangeArray.push(startRangeTime);
    timeRangeArray.push(endRangeTime);
    timeRangeArray.push(endRangeTime);
  });
  timeArray.push('date1', '');
  timeNextDayArray.push('date2', '');
  timeRangeArray.map((item, index) => {
    if (
      item !== timeRangeArray[index + 1] &&
      item.includes(':') &&
      timeRangeArray[index + 1].includes(':')
    ) {
      timeArray.push(item + '-' + timeRangeArray[index + 1]);
      timeNextDayArray.push(item + '-' + timeRangeArray[index + 1]);
    }
  });

  let flattenList = [...timeArray, ...timeNextDayArray];
  console.log('flattenList:', flattenList);
  return flattenList;
};

const getUnAvailableTimeList = async (uid, date, showLoading, hideLoading) => {
  let tempUnavailableTimearr = [];
  let unavailableTimearr = [];
  let unAvailableTimeList = [];
  let formattedDate = date.replace(/[/]/g, '-');
  showLoading();
  try {
    let response = await ApiService.bookingTimeChecking(formattedDate, uid);
    unAvailableTimeList = response;
    console.log('booking time checking response:', response);
    hideLoading();
  } catch (error) {
    console.log('booking time checking error:', error);
    hideLoading();
  }

  // round the time list
  unAvailableTimeList.forEach((item, index) => {
    let startDate = CommonUtil.getMomentDate(
      item.start_time,
      null,
      'YYYY/MM/DD',
    );
    let endDate = CommonUtil.getMomentDate(item.end_time, null, 'YYYY/MM/DD');
    let startH = moment(item.start_time).hours();
    let endH = moment(item.end_time).hours();
    let startMinute = moment(item.start_time).minute();
    let endMinute = moment(item.end_time).minute();
    let startTime, endTime;

    if (startMinute >= 0 && startMinute < 30) {
      startTime = '00';
    } else if (startMinute >= 30) {
      startTime = '30';
    }

    if (endMinute > 0 && endMinute <= 30) {
      endTime = '30';
    } else if (endMinute > 30 || endMinute === 0) {
      endTime = '00';
    }

    if (startDate !== endDate) {
      if (startDate === date) {
        endH = '24';
        endTime = '00';
      } else if (endDate === date) {
        startH = '00';
        startTime = '00';
      }
    }

    tempUnavailableTimearr.push({
      start_time:
        (Number(startH) < 10 ? '0' + startH : startH) + ':' + startTime,
      end_time: (Number(endH) < 10 ? '0' + endH : endH) + ':' + endTime,
    });
  });
  ////
  console.log('strt diff:', tempUnavailableTimearr);
  // create time range list
  tempUnavailableTimearr.forEach((item, index) => {
    let startHour = Number(item.start_time.split(':')[0]);
    let endHour = Number(item.end_time.split(':')[0]);
    let startM = Number(item.start_time.split(':')[1]);
    let endM = Number(item.end_time.split(':')[1]);
    let timesInBetween = [];

    let startRangeHour = startHour;
    new Array(endHour - startHour + 1).fill().forEach((acc, index) => {
      let startRangeTime = '';
      let endRangeTime = '';
      if (startM === 0) {
        if (timesInBetween[timesInBetween.length - 1] !== item.end_time) {
          startRangeTime = moment({ hour: startRangeHour }).format('HH:mm');
          timesInBetween.push(startRangeTime);
        }
        if (timesInBetween[timesInBetween.length - 1] !== item.end_time) {
          endRangeTime = moment({ hour: startRangeHour, minute: 30 }).format(
            'HH:mm',
          );
          timesInBetween.push(endRangeTime);
          timesInBetween.push(endRangeTime);
        }
      } else {
        if (timesInBetween[timesInBetween.length - 1] !== item.end_time) {
          startRangeTime = moment({ hour: startRangeHour, minute: 30 }).format(
            'HH:mm',
          );
          timesInBetween.push(startRangeTime);
        }
        if (timesInBetween[timesInBetween.length - 1] !== item.end_time) {
          endRangeTime = moment({ hour: startRangeHour + 1 }).format('HH:mm');
        }
        timesInBetween.push(endRangeTime);
        timesInBetween.push(endRangeTime);
      }
      if (timesInBetween[timesInBetween.length - 1] !== item.end_time) {
        startRangeHour = startRangeHour + 1;
      }
    });

    timesInBetween.map((items, indexs) => {
      if (items !== timesInBetween[indexs + 1]) {
        unavailableTimearr.push(items + '-' + timesInBetween[indexs + 1]);
      }
    });
  });
  ////
  console.log('unavailableTimearr in helper:', unavailableTimearr);
  return unavailableTimearr;
};

const getStartDate = (form) => {
  let startDate = _.get(form, 'start_time', '');
  startDate = CommonUtil.showCommonDateFormat(startDate);
  return startDate;
};

const getDDMMMStartDate = (form) => {
  let startDate = _.get(form, 'start_time', '');
  startDate = CommonUtil.showDDMMMDateFormat(startDate);
  return startDate;
};

const getEndDate = (form) => {
  let endDate = _.get(form, 'end_time', '');
  endDate = CommonUtil.showCommonDateFormat(endDate);
  return endDate;
};

const getDDMMMEndDate = (form) => {
  let endDate = _.get(form, 'end_time', '');
  endDate = CommonUtil.showDDMMMDateFormat(endDate);
  return endDate;
};

const getYYYYMMDDStartDate = (form) => {
  let startDate = _.get(form, 'start_time', '');
  startDate = CommonUtil.getMomentDate(startDate, null, 'YYYY/MM/DD');
  return startDate;
};

const getYYYYMMDDEndDate = (form) => {
  let endDate = _.get(form, 'end_time', '');
  endDate = CommonUtil.getMomentDate(endDate, null, 'YYYY/MM/DD');
  return endDate;
};

const getBookingTime = (form) => {
  let startT = _.get(form, 'start_time', '');
  let endT = _.get(form, 'end_time', '');
  startT = CommonUtil.showBookingTimeFormat(startT);
  endT = CommonUtil.showBookingTimeFormat(endT);
  return startT + ' - ' + endT;
};

const getStartTime = (form) => {
  let startT = _.get(form, 'start_time', '');
  startT = CommonUtil.showBookingTimeFormat(startT);
  return startT;
};

const getEndTime = (form) => {
  let endT = _.get(form, 'end_time', '');
  endT = CommonUtil.showBookingTimeFormat(endT);
  return endT;
};

const getNumOfUser = (form) => {
  return _.get(form, 'num_users', '');
};

const getStatusColor = (status) => {
  switch (status) {
    case STATUS_CODE_MAP.PENDING:
      return '#EFB488';
    case STATUS_CODE_MAP.CONFIRMED:
      return '#BCF3C8';
    case STATUS_CODE_MAP.REJECTED:
      return '#F78989';
    case STATUS_CODE_MAP.CANCELLED:
      return '#EFF3BB';
    case STATUS_CODE_MAP.PAID:
      return '#AEBDEF';
  }
};

const getStatus = (status) => {
  switch (status) {
    case STATUS_CODE_MAP.PENDING:
      return 'Pending';
    case STATUS_CODE_MAP.CONFIRMED:
      return 'Confirmed';
    case STATUS_CODE_MAP.REJECTED:
      return 'Rejected';
    case STATUS_CODE_MAP.CANCELLED:
      return 'Cancelled';
    case STATUS_CODE_MAP.PAID:
      return 'Paid';
  }
};

const getSatusContent = (status) => {
  switch (status) {
    case STATUS_CODE_MAP.PENDING:
      return 'Pending for room owner confirm. After confirmed by owner, he / she will send the price to you and you can finish the payment.\n\n*You can still edit the booking info or cancel booking before owner confirmed.';
    case STATUS_CODE_MAP.CONFIRMED:
      return 'The owner will send the payment detail to you through message. please finish the payment in 6 hrs (15 mins in case booked date within 24 hours) before the booking date. Otherwise, the booking will be rejected.\n\n*If you want to edit or cancel booking, you must ask the owner to do, please chat with the owner thourgh message.';
    case STATUS_CODE_MAP.REJECTED:
      return 'The reservation has been rejected, you can ask the owner the reason on message.';
    case STATUS_CODE_MAP.CANCELLED:
      return 'The reservation has been cancelled.';
    case STATUS_CODE_MAP.PAID:
      return 'The reservation has been paid.';
  }
};

export default {
  getTimeArray,
  getUnAvailableTimeList,
  getStartDate,
  getEndDate,
  getBookingTime,
  getNumOfUser,
  getStartTime,
  getEndTime,
  getDDMMMStartDate,
  getDDMMMEndDate,
  getYYYYMMDDStartDate,
  getYYYYMMDDEndDate,
  getStatusColor,
  getStatus,
  getSatusContent,
};
