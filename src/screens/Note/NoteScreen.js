import React from 'react';

import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';

import useLocalization from '~src/contexts/i18n';
import { AppDefaultTheme } from '~src/contexts/theme/AppTheme';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';
import { SettingIcon } from '../../assets/images';
import BaseHeader from '../../components/BaseHeader';

const NoteScreen = ({ navigation }) => {
  const { t, locale, setLocale } = useLocalization();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme);

  const NoteList = [
    {
      title: 'Note1',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    },
    {
      title: 'Note2',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s ...',
    },
    {
      title: 'Note3',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s ...',
    },
    {
      title: 'Note4',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s ...',
    },
    {
      title: 'Note5',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s ...',
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemView}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemContent}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader notShowBackIcon={true} />
      <View style={styles.container}>
        <View style={styles.settingView}>
          <SettingIcon />
        </View>

        <Text style={styles.text}>Notes</Text>
        <FlatList
          data={NoteList}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  paddingBottom: sw(200),
                }}
              />
            );
          }}
        />
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
    flatList: {
      paddingTop: sw(30),
      marginHorizontal: sw(13),
    },
    text: {
      ...Typography.ts(theme.fonts.weight.bold, sw(45)),
      color: '#FFF',
      textAlign: 'center',
    },
    settingView: {
      marginTop: sw(12),
      marginRight: sw(40),
      marginBottom: sw(20),
      alignSelf: 'flex-end',
    },
    itemView: {
      width: sw(164),
      backgroundColor: '#2A2A32',
      paddingVertical: sw(18),
      paddingHorizontal: sw(12),
      borderRadius: sw(20),
      margin: sw(15),
      shadowOpacity: 0.5,
      shadowRadius: 10,
      shadowOffset: { 0: 10 },
      shadowColor: '#000',
      elevation: 10,
    },
    itemTitle: {
      ...Typography.ts(theme.fonts.weight.bold, sw(20)),
      color: '#FFF',
      marginBottom: sw(8),
    },
    itemContent: {
      ...Typography.ts(theme.fonts.weight.light, sw(16)),
      color: '#B6B6B6',
    },
  });
};

export default NoteScreen;
