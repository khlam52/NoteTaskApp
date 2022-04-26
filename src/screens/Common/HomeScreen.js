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
import Route from '../../navigations/Route';
import AppPressable from '../../components/AppPressable';

const HomeScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  useEffect(() => {
    console.log('HomeScreen');
  }, []);

  const goTaskCreateScreen = () => {
    navigation.navigate(Route.TASK_CREATE_SCREEN);
  };

  const goNoteCreateScreen = () => {
    navigation.navigate(Route.CREATE_AND_EDIT_NOTE_SCREEN, {
      isCreateNote: true,
    });
  };

  const renderCreateItemView = (title, icon, callback) => {
    return (
      <View style={styles.itemView}>
        {icon}
        <View>
          <AppPressable onPress={callback}>
            <View style={styles.btnView}>
              <PlusIcon fill={'#FFF'} width={sw(25)} height={sw(25)} />
              <Text style={styles.btnTitleText}>{title}</Text>
            </View>
          </AppPressable>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <BaseHeader notShowBackIcon={true} />
      <View style={styles.container}>
        <Text style={styles.text}>Note Space</Text>
        {renderCreateItemView(
          'Create Task',
          <CreateTaskIcon />,
          goTaskCreateScreen,
        )}
        {renderCreateItemView(
          'Create Note',
          <CreateNoteIcon />,
          goNoteCreateScreen,
        )}
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
      marginBottom: sw(60),
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
      width: sw(332),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#424450',
      borderRadius: sw(20),
      justifyContent: 'center',
      paddingVertical: sw(8),
      marginTop: sw(18),
    },
    btnTitleText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(20)),
      color: '#FFF',
      paddingLeft: sw(18),
    },
  });
};

export default HomeScreen;
