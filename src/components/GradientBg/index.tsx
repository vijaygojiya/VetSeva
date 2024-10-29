import {useAppTheme} from '@/hooks';
import {fonts, fontSize} from '@/styles';
import React, {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const GradientBg = ({children}: PropsWithChildren) => {
  const {colors} = useAppTheme();
  return (
    <LinearGradient
      useAngle={true}
      angle={55}
      style={[styles.gradientBg, {backgroundColor: colors.background}]}
      colors={[colors.primary600, colors.primary300]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.medium,
  },
  gradientBg: {flex: 1},
});
