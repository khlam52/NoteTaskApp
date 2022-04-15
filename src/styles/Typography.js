import { sf, sw, scaleHorizontalSpace } from './Mixins';

// FONT FAMILY (We must use font family instead of weight to control the thickness of the font)
export const FONT_FAMILY_100 = 'Nunito-Light'; //FontWeight = 100
export const FONT_FAMILY_200 = 'Nunito-Light'; //FontWeight = 200
export const FONT_FAMILY_300 = 'Nunito-Light'; //FontWeight = 300
export const FONT_FAMILY_400 = 'Nunito-Regular'; // FontWeight = 400
export const FONT_FAMILY_500 = 'Nunito-Regular'; //FontWeight = 500
export const FONT_FAMILY_600 = 'Nunito-Semibold'; //FontWeight = 600
export const FONT_FAMILY_700 = 'Nunito-Bold'; // FontWeight = 700
export const FONT_FAMILY_800 = 'Nunito-Bold'; // FontWeight = 800
export const FONT_FAMILY_900 = 'Nunito-Bold'; // FontWeight = 900

const getTextStyle = (fontFamily, fontSizeInDp = 18, lineHeightInDp = 0) => {
  let lineHeight = sw(lineHeightInDp);
  if (lineHeightInDp === 0) {
    lineHeight = getLineHeight(fontSizeInDp);
  }
  return {
    fontFamily: fontFamily,
    fontSize: sf(fontSizeInDp),
    lineHeight: lineHeight,
  };
};

export const ts = getTextStyle;

const getLineHeight = (fontSizeInDp) => {
  let multiplier = 1.2;
  let lineHeight = sw(Math.round(fontSizeInDp * multiplier));
  return lineHeight;
};

export const getTextExtraPadding = (fontSizeInDp) => {
  return {
    paddingVertical: scaleHorizontalSpace(fontSizeInDp * 0.375),
  };
};
