import {
  // Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useAppTheme} from '@/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts, fontSize} from '@/styles';
import {PlaceholderSvg} from '@/assets';
import {AppStackScreenProps} from '@/types/navigation';
import {AppRouts} from '@/router';
const screenWidth = Dimensions.get('screen').width;

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

const Onboarding = ({navigation}: AppStackScreenProps<'Onboarding'>) => {
  const [index, setIndex] = React.useState(0);

  const listRef = React.useRef<FlatList>(null);
  // const scrollX = React.useRef<Animated.AnimatedValue>(
  //   new Animated.Value(0),
  // ).current;

  const {colors} = useAppTheme();
  const onMomentumScrollEndEvent = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => setIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth));

  // const onScroll = Animated.event(
  //   [{nativeEvent: {contentOffset: {x: scrollX}}}],
  //   {useNativeDriver: true},
  // );

  const onPressLeft = () => {
    listRef?.current?.scrollToOffset({
      offset: (index - 1) * screenWidth,
      animated: true,
    });
    setIndex(curIndex => {
      if (curIndex > 0) {
        return curIndex - 1;
      }
      return curIndex;
    });
  };

  const onPressRight = () => {
    listRef?.current?.scrollToOffset({
      offset: (index + 1) * screenWidth,
      animated: true,
    });
    setIndex(oldIndex => {
      if (oldIndex === data.length - 1) {
        navigation.replace(AppRouts.Login);
        return oldIndex;
      }
      return oldIndex + 1;
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.neutral100}]}>
      <FlatList
        ref={listRef}
        data={data}
        horizontal={true}
        pagingEnabled={true}
        scrollEventThrottle={16}
        overScrollMode="never"
        bounces={false}
        keyExtractor={(_, i) => `Onboard-item${i}`}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEndEvent}
        renderItem={({item: {title, subTitle}}) => {
          return (
            <View
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
            </View>
          );
        }}
      />
      <View style={styles.navigationContainer}>
        <Pressable
          style={[styles.button]}
          onPress={onPressLeft}
          disabled={index === 0}>
          <Text>Previous</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            // index + 1 === data.length && styles.disabledButton,
          ]}
          onPress={onPressRight}
          // disabled={index + 1 === data.length}
        >
          <Text>{index + 1 < data.length ? 'Next' : 'Start'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

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
    justifyContent: 'center',
    width: screenWidth,
    alignItems: 'center',
    rowGap: 6,
  },
  placeholderSvg: {
    borderRadius: 8,
    overflow: 'hidden',
  },

  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'red',
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
