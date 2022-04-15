import { Linking, Platform, Text } from 'react-native';

const goToAppStore = async (appStoreUrl, googlePlayUrl) => {
  let redirectUrl = googlePlayUrl
    ? googlePlayUrl
    : 'https://play.google.com/store/apps/';
  if (Platform.OS === 'ios') {
    redirectUrl = appStoreUrl
      ? appStoreUrl
      : 'https://www.apple.com/app-store/';
  }

  try {
    await Linking.openURL(redirectUrl);
  } catch (error) {
    console.log('openURL error:', error);
  }
};

export default {
  goToAppStore,
};
