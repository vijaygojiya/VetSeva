import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppTheme} from '@/hooks';
import {fonts, fontSize} from '@/styles';

const DoctorListHeader = () => {
  const {colors} = useAppTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: colors.neutral800}]}>
        Find Best Doctor For Your Pet
      </Text>
    </View>
  );
};

export default DoctorListHeader;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
  },
});
