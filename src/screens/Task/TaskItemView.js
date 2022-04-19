/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import _ from 'lodash';
import { StyleSheet, Text, View, LayoutAnimation } from 'react-native';

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  TickIcon,
  UnTickIcon,
} from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import { AppDefaultTheme } from '../../contexts/theme/AppTheme';
import useAppContext from '~src/contexts/app';
import useLocalization from '~src/contexts/i18n';
import { Typography } from '~src/styles';
import { sw } from '~src/styles/Mixins';

TaskItemView.defaultProps = {
  item: null,
  index: null,
  groupName: null,
  onTickIconPressed: () => {},
  isCompleted: false,
};

export default function TaskItemView({
  item,
  index,
  groupName,
  onTickIconPressed,
  isCompleted,
}) {
  const { t, locale, setLocale } = useLocalization();
  const { showLoading, hideLoading } = useAppContext();
  const theme = AppDefaultTheme.settings;
  const styles = getStyle(theme, locale);

  const [isItemExtendPressed, setIsItemExtendPressed] = useState(false);

  const onItemExtendPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsItemExtendPressed(!isItemExtendPressed);
  };

  let node = _.get(item, 'node', '');
  return (
    node === 1 && (
      <View>
        <View key={index} style={styles.itemView}>
          <View style={styles.itemLeftRowView}>
            <AppPressable onPress={onTickIconPressed}>
              {isCompleted ? (
                <TickIcon fill={'#FFEAA1'} />
              ) : (
                <UnTickIcon stroke={'#FFEAA1'} />
              )}
            </AppPressable>
            <Text style={styles.itemTitleText}>{item.title}</Text>
          </View>

          <AppPressable onPress={onItemExtendPress}>
            {item.subTask.length > 0 ? (
              !isItemExtendPressed ? (
                <ArrowDownIcon fill={'#FFF'} />
              ) : (
                <ArrowUpIcon fill={'#FFF'} />
              )
            ) : (
              <ArrowRightIcon fill={'#FFF'} />
            )}
          </AppPressable>
        </View>
        {isItemExtendPressed &&
          item.subTask.length > 0 &&
          item.subTask.map((subItem, subIndex) => {
            let isSubTaskCompleted =
              subItem.status === 'IN_PROGRESS' ? false : true;
            const onSubTickIconPressed = () => {
              isSubTaskCompleted = !isSubTaskCompleted;
              // recentTaskList.map((selectedItem) => {
              //   if (selectedItem.uid === item.uid) {
              //     selectedItem.status =
              //       isCompleted === true ? 'COMPLETED' : 'IN_PROGRESS';
              //   }
              // });
            };
            return (
              <View
                key={subIndex}
                style={{ ...styles.itemView, marginLeft: sw(46) }}>
                <View style={styles.itemLeftRowView}>
                  <AppPressable onPress={onSubTickIconPressed}>
                    {isSubTaskCompleted ? (
                      <TickIcon
                        fill={'#D3FFB8'}
                        width={sw(25)}
                        height={sw(25)}
                      />
                    ) : (
                      <UnTickIcon
                        stroke={'#D3FFB8'}
                        width={sw(25)}
                        height={sw(25)}
                      />
                    )}
                  </AppPressable>
                  <Text style={styles.itemTitleText}>{subItem.title}</Text>
                </View>
                <ArrowRightIcon fill={'#FFF'} />
              </View>
            );
          })}
      </View>
    )
  );
}

const getStyle = (theme, locale) => {
  return StyleSheet.create({
    itemView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#424450',
      borderRadius: sw(20),
      justifyContent: 'space-between',
      paddingHorizontal: sw(16),
      paddingVertical: sw(12),
      marginBottom: sw(12),
    },
    itemLeftRowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemTitleText: {
      ...Typography.ts(theme.fonts.weight.regular, sw(16)),
      color: '#FFF',
      paddingLeft: sw(18),
    },
  });
};
