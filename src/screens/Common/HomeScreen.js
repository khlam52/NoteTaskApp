import React, { useEffect } from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BaseHeader from '../../components/BaseHeader';
import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';
import {
  CreateNoteIcon,
  CreateTaskIcon,
  PlusIcon,
  SettingIcon,
} from '../../assets/images';

const HomeScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  useEffect(() => {
    console.log('HomeScreen');
  }, []);

  const renderCreateItemView = (title, icon, callback) => {
    return (
      <View style={styles.itemView}>
        {icon}
        <View style={styles.btnView}>
          <View style={styles.plusIconView}>
            <PlusIcon fill={'#FFF'} />
          </View>
          <Text style={styles.btnTitleText}>{title}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <BaseHeader notShowBackIcon={true} />
      <View style={styles.container}>
        <Text style={styles.text}>Note Space</Text>
        {renderCreateItemView('Create Task', <CreateTaskIcon />)}
        {renderCreateItemView('Create Note', <CreateNoteIcon />)}
      </View>
    </View>
  );
};

const getStyle = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B191E',
      alignItems: 'center',
    },
    text: {
      ...Typography.ts(theme.fonts.weight.bold, sw(45)),
      color: '#FFF',
      textAlign: 'center',
      marginBottom: sw(30),
    },
    settingView: {
      marginTop: sw(12),
      marginRight: sw(40),
      marginBottom: sw(20),
      alignSelf: 'flex-end',
    },
    itemView: {
      width: sw(332),
      backgroundColor: '#29282D',
      alignItems: 'center',
      borderRadius: sw(20),
      paddingTop: sw(26),
      marginVertical: sw(28),
      shadowOpacity: 0.5,
      shadowRadius: 30,
      shadowOffset: { 0: 10 },
      shadowColor: '#000',
      elevation: 10,
    },
    btnView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#424450',
      borderRadius: sw(20),
      justifyContent: 'center',
      paddingVertical: sw(8),
      marginTop: sw(18),
    },
    plusIconView: {
      shadowOpacity: 0.5,
      shadowRadius: 6,
      shadowOffset: { 0: 10 },
      shadowColor: '#000',
      elevation: 10,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    btnTitleText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(20)),
      color: '#FFF',
      paddingLeft: sw(18),
    },
  });
};

export default HomeScreen;
