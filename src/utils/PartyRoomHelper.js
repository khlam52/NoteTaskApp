import React from 'react';

import I18n from 'i18n-js';
import _ from 'lodash';
import Moment from 'moment';
import {
  AirConIcon,
  BilliardIcon,
  BoardgameIcon,
  DiceIcon,
  GameIcon,
  KaraokeIcon,
  MJIcon,
  OtherEntertainIcon,
  PhotoIcon,
  PokerIcon,
  ToiletIcon,
  TVIcon,
  WifiIcon,
} from '../assets/images';
import { View } from 'react-native';
import { sw } from '~src/styles/Mixins';
import {
  AREA_LIST_MAP,
  DISTRICT_LIST_MAP,
  LOCATION_LIST_MAP,
} from '../constants/Constant';

const areaLocationList = [
  {
    name: 'HONG KONG',
    shortName: AREA_LIST_MAP.HKI,
  },
  {
    name: 'KOWLOON',
    shortName: AREA_LIST_MAP.KWN,
  },
  {
    name: 'N.T.',
    shortName: AREA_LIST_MAP.NT,
  },
];

const HKIslandList = [
  {
    name: 'Central and Western',
    shortName: DISTRICT_LIST_MAP.CW,
  },
  {
    name: 'Wan Chai',
    shortName: DISTRICT_LIST_MAP.WC,
  },
  {
    name: 'Eastern',
    shortName: DISTRICT_LIST_MAP.E,
  },
  {
    name: 'Southern',
    shortName: DISTRICT_LIST_MAP.S,
  },
];

const KowloonList = [
  {
    name: 'Yau Tsim Mong',
    shortName: DISTRICT_LIST_MAP.YTM,
  },
  {
    name: 'Sham Shui Po',
    shortName: DISTRICT_LIST_MAP.SSP,
  },
  {
    name: 'Kowloon City',
    shortName: DISTRICT_LIST_MAP.KC,
  },
  {
    name: 'Wong Tai Sin',
    shortName: DISTRICT_LIST_MAP.WTS,
  },
  {
    name: 'Kwun Tong',
    shortName: DISTRICT_LIST_MAP.KT,
  },
];

const NTList = [
  {
    name: 'Kwai Tsing',
    shortName: DISTRICT_LIST_MAP.NKT,
  },
  {
    name: 'Tsuen Wan',
    shortName: DISTRICT_LIST_MAP.TW,
  },
  {
    name: 'Tuen Mun',
    shortName: DISTRICT_LIST_MAP.TM,
  },
  {
    name: 'Yuen Long',
    shortName: DISTRICT_LIST_MAP.YL,
  },
  {
    name: 'North',
    shortName: DISTRICT_LIST_MAP.N,
  },
  {
    name: 'Tai Po',
    shortName: DISTRICT_LIST_MAP.TP,
  },
  {
    name: 'Sha Tin',
    shortName: DISTRICT_LIST_MAP.ST,
  },
  {
    name: 'Sai Kung',
    shortName: DISTRICT_LIST_MAP.SK,
  },
  {
    name: 'Islands',
    shortName: DISTRICT_LIST_MAP.I,
  },
];

const getArea = (params) => {
  let area;
  areaLocationList.forEach((item, key) => {
    if (params === item.shortName) {
      area = item.name;
    }
  });
  return area;
};

const getDistrict = (params) => {
  let district;
  HKIslandList.forEach((item, key) => {
    if (params === item.shortName) {
      district = item.name;
    }
  });
  KowloonList.forEach((item, key) => {
    if (params === item.shortName) {
      district = item.name;
    }
  });
  NTList.forEach((item, key) => {
    if (params === item.shortName) {
      district = item.name;
    }
  });
  return district;
};

const getEntertainItemIcon = (item) => {
  switch (item) {
    case 'Mahjong':
      return <MJIcon />;
    case 'Poker':
      return <PokerIcon />;
    case 'Game':
      return <GameIcon />;
    case 'Boardgames':
      return <BoardgameIcon />;
    case 'Karaoke':
      return <KaraokeIcon />;
    case 'Billiard':
      return <BilliardIcon />;
    case 'Dice':
      return <DiceIcon />;
    default:
      return <OtherEntertainIcon />;
  }
};

const getVenueItemIcon = (item) => {
  switch (item) {
    case 'Air-Con':
      return <AirConIcon />;
    case 'Wifi':
      return <WifiIcon />;
    case 'Photo':
      return <PhotoIcon />;
    case 'Toilet':
      return <ToiletIcon />;
    case 'TV':
      return <TVIcon />;
  }
};

const restructureEntertainList = (list, rowNum) => {
  let rowList = [];
  rowList = list.slice(rowNum, rowNum + 3);
  return rowList;
};

export default {
  areaLocationList,
  HKIslandList,
  KowloonList,
  NTList,
  getEntertainItemIcon,
  getVenueItemIcon,
  getArea,
  getDistrict,
  restructureEntertainList,
};
