import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppTheme} from '@/hooks';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {fonts, fontSize, spacing} from '@/styles';
import {PlaceholderSvg} from '@/assets';
import {AppStackScreenProps} from '@/types/navigation';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import {AppButton} from '@/components';
import {useMMKVBoolean} from 'react-native-mmkv';
import {storageKeys} from '@/utils';

const data = [
  {
    title: 'Welcome to VetSeva',
    subTitle:
      'Your trusted platform to find expert veterinary doctors in rural areas. Get the best care for your animals with just a few taps.',
  },
  {
    title: 'Find Nearby Vets',
    subTitle:
      'Discover vets in your area with location-based search. Easily connect with qualified doctors nearby for quick assistance.',
  },
  {
    title: 'Filter by Expertise and Budget',
    subTitle:
      'Filter veterinary doctors by their expertise, ratings, and services that fit your budget to ensure the best care for your animals.',
  },
  {
    title: 'Book Appointments Easily',
    subTitle:
      'Schedule appointments with vets online, or even book teleconsultations for remote advice. Caring for your animals has never been easier!',
  },
  {
    title: 'Trusted Reviews & Ratings',
    subTitle:
      'Read verified reviews from other users and choose vets with the highest ratings for peace of mind and quality care.',
  },
];
const screenWidth = Dimensions.get('screen').width;

const Onboarding = ({}: AppStackScreenProps<'Onboarding'>) => {
  const [_, setIsGetStarted] = useMMKVBoolean(storageKeys.isGetStarted);
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  const {colors} = useAppTheme();

  const handleGetStarted = () => {
    setIsGetStarted(true);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.neutral100}]}>
      <Animated.ScrollView
        ref={animatedRef}
        horizontal={true}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate="normal"
        disableIntervalMomentum={true}
        pagingEnabled={true}>
        {data.map(({title, subTitle}, index) => {
          return (
            <View
              key={`onboarding-page-${index}`}
              style={[
                styles.itemContainer,
                {backgroundColor: colors.neutral100},
              ]}>
              <PlaceholderSvg
                style={styles.placeholderSvg}
                height={screenWidth - 80}
                width={screenWidth - 80}
              />
              <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
              <Text style={[styles.subTitle, {color: colors.neutral500}]}>
                {subTitle}
              </Text>
              {index + 1 === data.length ? (
                <AppButton
                  containerStyle={styles.getStartedBtnContainer}
                  onPress={handleGetStarted}
                  title="Get Started"
                />
              ) : null}
            </View>
          );
        })}
      </Animated.ScrollView>
      <Indicators scrollOffset={scrollOffset} />
    </SafeAreaView>
  );
};

export default Onboarding;

const Indicators = ({scrollOffset}: {scrollOffset: SharedValue<number>}) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.indicatorContainer,
        {
          bottom: bottom + 28,
        },
      ]}>
      {data.map((_, index) => {
        return (
          <Indicator
            index={index}
            scrollOffset={scrollOffset}
            key={'indicator' + index}
          />
        );
      })}
    </View>
  );
};

const size = 9;

const Indicator = ({
  scrollOffset,
  index,
}: {
  scrollOffset: SharedValue<number>;
  index: number;
}) => {
  const {colors} = useAppTheme();

  const aniStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    const outputRange = [-size, 0, size];
    return {
      transform: [
        {
          translateX: interpolate(
            scrollOffset.value / screenWidth,
            inputRange,
            outputRange,
          ),
        },
      ],
    };
  });

  return (
    <View
      style={[
        styles.dotCircle,
        {
          backgroundColor: colors.primary200,
        },
      ]}>
      <Animated.View
        style={[
          styles.dotCircle,
          aniStyle,
          {
            backgroundColor: colors.primary500,
          },
        ]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.xxLarge,
    fontFamily: fonts.semiBold,
    marginHorizontal: 22,
    textAlign: 'center',
    marginTop: 22,
  },
  subTitle: {
    fontSize: fontSize.small,
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginHorizontal: 22,
  },

  itemContainer: {
    flex: 1,
    paddingTop: spacing.xxxl,
    rowGap: 6,
    width: screenWidth,
  },
  placeholderSvg: {
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
    flexDirection: 'row',
  },
  dotCircle: {
    height: size,
    width: size,
    borderRadius: size / 2,
    overflow: 'hidden',
  },
  getStartedBtnContainer: {
    marginHorizontal: spacing.lg,
  },
});
