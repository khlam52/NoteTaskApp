import { StyleSheet } from 'react-native';

import { scaleHorizontalSpace } from '~src/styles/Mixins';

const base = (theme, insets) => {
  return StyleSheet.create({});
};

const shadowStyles = StyleSheet.create({
  card: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: scaleHorizontalSpace(4),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleHorizontalSpace(4),
    elevation: scaleHorizontalSpace(4),
    marginBottom: scaleHorizontalSpace(8),
  },
});

export default function getBaseStyleSheet(theme, insets) {
  return base(theme, insets);
}

export { shadowStyles };
