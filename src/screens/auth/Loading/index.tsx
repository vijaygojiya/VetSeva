import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {useAppTheme} from '@/hooks';

const LoadingScreen = () => {
  const {colors} = useAppTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.neutral100}]}>
      <ActivityIndicator size="large" color={colors.primary500} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
