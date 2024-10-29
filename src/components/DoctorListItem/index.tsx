import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {useAppTheme} from '@/hooks';
import {fonts, fontSize} from '@/styles';
import {IDoctor} from '@/types/appTypes';
import dayjs from 'dayjs';
import {ShieldCrossSvg} from '@/assets';

const DoctorListItem = ({
  name,
  specialization,
  rating,
  location,
  totalReviews,
  startDate,
}: IDoctor) => {
  const {colors} = useAppTheme();

  // Calculate years of experience
  const experience = useMemo(() => {
    const startDateMoment = dayjs(startDate);
    const yearsExperience = dayjs().diff(startDateMoment, 'year');
    const monthsExperience = dayjs().diff(startDateMoment, 'month');

    if (yearsExperience >= 1) {
      return yearsExperience > 1
        ? `${yearsExperience} years`
        : `${yearsExperience} year`;
    } else if (monthsExperience >= 11) {
      return 'About a year';
    } else if (monthsExperience > 1) {
      return `${monthsExperience} months`;
    } else if (monthsExperience === 1) {
      return '1 month';
    } else {
      return 'Just started';
    }
  }, [startDate]);

  return (
    <View style={[styles.card, {backgroundColor: colors.neutral100}]}>
      <Image
        style={[styles.doctorAvatar, {backgroundColor: colors.neutral500}]}
      />

      <View style={styles.infoContainer}>
        {/* Doctor's name and specialization */}
        <Text
          numberOfLines={2}
          style={[styles.doctorName, {color: colors.neutral800}]}>
          {name}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.doctorSpecialization, {color: colors.neutral700}]}>
          {specialization} • 🏆 {experience}
        </Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text
            numberOfLines={1}
            style={[styles.rating, {color: colors.primary500}]}>
            ⭐ {rating.toFixed(1)}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.totalReviews, {color: colors.neutral600}]}>
            ({totalReviews} reviews)
          </Text>
        </View>
        {/* Location */}
        <Text
          numberOfLines={1}
          style={[styles.location, {color: colors.neutral500}]}>
          📍 {location.name}, Gujarat
        </Text>
      </View>
      <ShieldCrossSvg stroke={'green'}  strokeWidth={2} />
    </View>
  );
};

export default DoctorListItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingBottom: 16,
    paddingStart: 16,
    paddingTop: 8,
    paddingEnd: 8,
    borderRadius: 12,
    boxShadow: [
      {offsetX: 0, offsetY: 4, blurRadius: 8, color: 'rgba(0,0,0,0.1)'},
    ],
  },
  doctorAvatar: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  doctorName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.medium,
  },
  doctorSpecialization: {
    fontFamily: fonts.regular,
    fontSize: fontSize.small,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    marginTop: 4,
  },
  rating: {
    fontFamily: fonts.medium,
    fontSize: fontSize.small,
  },
  totalReviews: {
    fontFamily: fonts.regular,
    fontSize: fontSize.small,
    marginLeft: 4,
  },
  location: {
    fontFamily: fonts.regular,
    fontSize: fontSize.small,
    marginTop: 4,
  },
});
