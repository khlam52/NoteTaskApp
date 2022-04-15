/* Note:
  - For opacity value in hexcode format, you may refer to this website: https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4.
*/
const AppColorPalette = {
  skyBLue: {
    // h195
    raw: '#74DCFF',
    lightWarm: '#A6E4FC',
    light: '#CFEFFC',
    lightSoft: '#EDFAFF',
    gridient: { from: '#72B3FF', to: '#75F7FF' },
  },
  oceanBlue: {
    // h206, h207
    raw: '#357CB6',
    light: '#DAEAF6',
    lightSoft: '#EEF6FC', // list sub header background
    gridient: { from: '#6CADE1', to: '#357CB6' },
    tl50: '#DEEEFA80',
    tl80: '#12568DCC',
  },
  paleBlue: {
    // h208, h218, h217
    raw: '#EEF5FB', // under layer backgroud, and back button on white background
    light: '#8591A5', // text/300
    lightSoft: '#CED3DB', // text/200
  },
  violetBlue: {
    // h218, but brighter
    raw: '#5D8BDA',
  },
  greyBlue: {
    // h218 | Loans
    raw: '#3C4F6F', // deco color of Loans, and, text/500
    lightWarm: '#54698D', // deco color of Loans at brighter tone
    light: '#B9CBE9', // Info box background on Loans detail page
    lightSoft: '#E0ECFF', // List Sub Header background on Loans detail page
  },
  navyBlue: {
    // h218
    raw: '#0B234B', // text/800 | interactive element, ie. dropdown...
    dark: '#04142D', // text/950
    tl22: '#0B234B38',
    tl40: '#0B234B66',
    tl60: '#0B234B99',
  },
  red: {
    // h0
    raw: '#BA5151', // textAlert
    light: '#FFEBEB',
  },
  pinkRed: {
    // h357
    raw: '#D0121B',
    tl07: '#D0121B12',
  },
  pink: {
    // h0, but brighter
    raw: '#FF9999',
    lightWarm: '#FDC3C3',
    light: '#FCD4D4',
    lightSoft: '#FFE1E1',
  },
  purple: {
    raw: '#872880',
    light: '#FCF6FB',
    tl07: '#87288012',
  },
  yellow: {
    raw: '#F2BA45',
    tl07: '#F2BA4512',
  },
  green: {
    raw: '#00C1AA',
    light: '#E8FEF7',
  },
  grey: {
    raw: '#E2E2E2',
    lightWarm: '#E3E5E8',
    light: '#F3F4F6',
    lightSoft: '#F9FAFA',
    tl20: '#F0F4FA33',
  },
  white: {
    raw: '#FFFFFF',
    tl20: '#FFFFFF33',
    tl50: '#FFFFFF80',
  },
};

export default AppColorPalette;
