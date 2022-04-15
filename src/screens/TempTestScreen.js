import React from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import useLocalization from '../contexts/i18n';
import { AppDefaultTheme } from '../contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

const TempTestScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Note App</Text>
    </View>
  );
};

const getStyle = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      ...Typography.ts(theme.fonts.weight.bold, sw(45)),
      color: '#000',
    },
  });
};

export default TempTestScreen;
