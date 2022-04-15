import { Dimensions, PixelRatio, StatusBar } from 'react-native';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_PR = PixelRatio.get();
export const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
export const WHPercentageToDP = wp2dp;
export const HGPercentageToDP = hp2dp;

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on iphone pro max screen mobile device
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

// resize matter approach
const scale = (size) => (shortDimension / guidelineBaseWidth) * size;
const verticalScale = (size) => (longDimension / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// react-native screen approach
const wp = (dimension) => {
  return wp2dp((dimension / guidelineBaseWidth) * 100 + '%');
};

const hp = (dimension) => {
  return hp2dp((dimension / guidelineBaseHeight) * 100 + '%');
};

export const sw = wp; // scaleWidth
export const sh = hp; // scaleHeight
export const ms = moderateScale;
export const sf = wp; //scaleFont

export function boxShadow(
  color,
  offset = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
