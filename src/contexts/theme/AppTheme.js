import { default as ColorPalette } from '~src/contexts/theme/AppColorPalette';

const baseSpacings = {
  s1: 8,
  s2: 16,
  s3: 24,
  s4: 32,
  s5: 40,
  s6: 48,
  s7: 56,
};

const baseRadiuses = {
  container: 48,
  item: 24,
  corner: 16,
};

// Info System
//// Checking & Saving
//// Fixed Deposit
//// Loans & Credit Card

const baseColorScheme = {
  // ↓↓↓ To Be Obsoleted ↓↓↓
  accent: '#000000',
  accent86: '#000000',
  text95: '#04142D',
  text86: '#0B234BDB',
  text60: '#0B234B99',
  text40: '#0B234B66',
  text30: '#0B234B4D',
  text22: '#0B234B38',
  deep: '#0B234B',
  deep11: '#132E5A1C',
  // ↑↑↑ To Be Obsoleted ↑↑↑

  border: 'transparent', // RN
  borderFocus: 'transparent',
  inputFocus: '#FFFFFF',
  inputBlur: '#DFEAF5',
  buttonText: '#ffffff',
  card: 'rgb(255, 255, 255)', // RN
  disabled: 'rgba(0, 0, 0, 0.26)',

  // ↓↓↓ Text Color System ↓↓↓
  text: ColorPalette.navyBlue.raw,
  text950: ColorPalette.navyBlue.dark,
  text800: ColorPalette.navyBlue.raw,
  text500: ColorPalette.greyBlue.raw,
  text300: ColorPalette.paleBlue.light,
  text200: ColorPalette.paleBlue.lightSoft,
  textPositive: ColorPalette.green.raw,
  textDimmed: '#C3C8CD',
  textOnPrimary: '#ffffff',
  textOnSecondary: '#1C468F',
  textOnSupportive: '#ffffff',
  inputText: '#000000',
  onBackground: '#000000',
  onSurface: '#000000',

  // ↓↓↓ Background Color System ↓↓↓
  backdrop: 'rgba(0, 0, 0, 0.5)',
  surface: ColorPalette.white.raw,
  background: ColorPalette.white.raw,
  underlayerLt: ColorPalette.paleBlue.raw,
  underlayer: ColorPalette.paleBlue.raw,

  // ↓↓↓ Function/Info Color System ↓↓↓
  positive: ColorPalette.green.raw,
  underPositive: ColorPalette.green.light,
  alert: ColorPalette.red.raw,
  underAlert: ColorPalette.red.light,
  error: ColorPalette.pinkRed.raw,

  barInstallment: ColorPalette.pinkRed.raw,
  barProgress: ColorPalette.purple.raw,

  loansNCredit: ColorPalette.greyBlue.raw,
  LNC: ColorPalette.greyBlue.raw,
  loans: ColorPalette.greyBlue.raw,
  credit: ColorPalette.greyBlue.raw,
  underLoansNCredit: ColorPalette.greyBlue.lightSoft,
  underLNC: ColorPalette.greyBlue.lightSoft,

  checkingNSaving: ColorPalette.skyBLue.raw,
  CNS: ColorPalette.skyBLue.raw,
  checking: ColorPalette.skyBLue.raw,
  saving: ColorPalette.skyBLue.raw,
  underCheckingNSaving: ColorPalette.skyBLue.lightSoft,
  underCNS: ColorPalette.skyBLue.lightSoft,

  fixedDeposit: ColorPalette.pink.raw,
  FD: ColorPalette.pink.raw,
  underFixedDeposit: ColorPalette.pink.lightSoft,
  underFD: ColorPalette.pink.lightSoft,

  securities: ColorPalette.grey.raw,
  SECS: ColorPalette.grey.raw,
  underSecurities: ColorPalette.grey.light,
  underSECS: ColorPalette.grey.light,

  allAccounts: ColorPalette.navyBlue.raw,
  AACC: ColorPalette.navyBlue.raw,
  underAllAccounts: ColorPalette.grey.light,
  underAACC: ColorPalette.grey.light,

  // ↓↓↓ Component Color System ↓↓↓
  primary: ColorPalette.oceanBlue.raw,
  primaryDimmed: ColorPalette.oceanBlue.tl50,
  overPrimary: ColorPalette.oceanBlue.tl80,
  overPrimaryPressed: ColorPalette.oceanBlue.tl50,
  secondary: ColorPalette.white.raw,
  secondaryDimmed: ColorPalette.white.tl50,
  supportive: '#357CB6',
  placeholder: '#0B234B99',
  placeholderFocus: '#0B234B99',
  notification: '#f50057',
};

const baseFonts = {
  weight: {
    thin: 'Nunito-Light',
    extralight: 'Nunito-Light',
    light: 'Nunito-Light',
    regular: 'Nunito-Regular',
    medium: 'Nunito-Regular',
    semibold: 'Nunito-Semibold',
    bold: 'Nunito-Bold',
    extrabold: 'Nunito-Bold',
    black: 'Nunito-Bold',
  },
  size: {
    note2: 14,
    note1: 15,
    desc: 16,
    para: 18,
    lead: 20,
    ///
    h5: 20,
    h4: 24,
    h3: 28,
    h2: 32,
    h1: 48,
  },
};

const AppDefaultTheme = {
  name: 'DEFAULT',
  settings: {
    roundness: baseRadiuses,
    spacings: baseSpacings,
    colors: baseColorScheme,
    fonts: baseFonts,
    animation: { scale: 1 },
  },
};

// const AppZoomedTheme = {
//   name: 'ZOOMED',
//   settings: {
//     roundness: baseRadiuses,
//     spacings: baseSpacings,
//     colors: baseColorScheme,
//     fonts: {
//       weight: { ...baseFonts.weight },
//       size: { ...baseFonts.size },
//       // size: { ...baseFonts.size, ...{ note2: 20 } },
//       // Above is an example to demostrate how we can only revise specific and required values from base settings.
//     },
//     animation: { scale: 1 },
//   },
// };

export { AppDefaultTheme };
