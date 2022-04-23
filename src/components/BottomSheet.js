import { BlurView } from '@react-native-community/blur';
import React, { useState, useCallback } from 'react';

import { StyleSheet, View, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';

import { sh, sw } from '~src/styles/Mixins';

let DEFAULT_SWIPE_HIGHT = 50;
export default function BottomSheet(props) {
  const { view, isOpenBottomSheet, onSetIsOpenBottomSheet } = props;

  const styles = getStyle();
  const [contentHeight, setContentHeight] = useState(
    Dimensions.get('screen').height,
  );

  const setSwipeHightArea = useCallback((event) => {
    if (contentHeight !== null) {
      return;
    }
    const { height } = event.nativeEvent.layout;
    const layout = {
      height: height,
    };
    setContentHeight(layout);
  }, []);

  const closeBottomSheetModal = () => {
    onSetIsOpenBottomSheet(false);
  };

  return (
    <Modal
      swipeToClose={false}
      backdropPressToClose={false}
      entry="bottom"
      style={styles.modalBox}
      isOpen={isOpenBottomSheet}
      onClosed={closeBottomSheetModal}
      useNativeDriver={true}>
      <View
        onLayout={setSwipeHightArea}
        style={[styles.content, contentHeight]}>
        <BlurView
          style={{
            position: 'absolute',
            bottom: 0,
            top: 0,
            right: 0,
            left: 0,
            borderTopRightRadius: sw(20),
            borderTopLeftRadius: sw(20),
            overflow: 'hidden',
            borderRadius: sw(20),
          }}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        {view}
      </View>
    </Modal>
  );
}

const getStyle = () => {
  return StyleSheet.create({
    modalBox: {
      flex: 1,
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      backgroundColor: 'transparent',
    },
    content: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      justifyContent: 'center',
      borderTopLeftRadius: sw(20),
      maxHeight: '95%',
      borderTopRightRadius: sw(20),
      paddingTop: sh(20),
      // backgroundColor: '#2A2A321A',
    },
  });
};
