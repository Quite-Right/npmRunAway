import React from 'react';
import {StyleSheet, Platform, View} from 'react-native';

interface IFixedButtonGroupProptypes {
  top?: number | string;
  right?: number | string;
  children: React.ReactNode;
}

const FixedButtonGroup = ({
  top = Platform.OS === 'ios' ? 50 : 20,
  right = 10,
  children,
}: IFixedButtonGroupProptypes) => {
  console.log(1);
  return (
    <View
      style={[
        styles.fixedButtonGroup,
        {
          top,
          right,
        },
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  fixedButtonGroup: {
    position: 'absolute',
    zIndex: 2,
  },
});

export default FixedButtonGroup;
