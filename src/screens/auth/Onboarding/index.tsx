import {
  Animated,
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

const Onboarding = () => {
  const [index, setIndex] = React.useState(0);

  const listRef = React.useRef<FlatList>(null);
  const scrollX = React.useRef<Animated.AnimatedValue>(
    new Animated.Value(0),
  ).current;

  const {colors} = useAppTheme();
  const onMomentumScrollEndEvent = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => setIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth));

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: true},
  );

  const onPressLeft = () => {
    listRef?.current?.scrollToOffset({
      offset: (index - 1) * screenWidth,
      animated: true,
    });
    setIndex(curIndex => curIndex - 1);
  };

  const onPressRight = () => {
    listRef?.current?.scrollToOffset({
      offset: (index + 1) * screenWidth,
      animated: true,
    });
    setIndex(curIndex => curIndex + 1);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
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
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: colors.neutral100,
                width: screenWidth,
                rowGap: 8,
              }}>
              <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
              <Text style={[styles.subTitle, {color: colors.neutral500}]}>
                {subTitle}
              </Text>
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Pressable
          style={{
            backgroundColor: 'red',
            paddingHorizontal: 22,
            paddingVertical: 8,
            borderRadius: 8,
          }}
          onPress={onPressLeft}
          disabled={index === 0}
          >
          <Text>Previous</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: 'red',
            paddingHorizontal: 22,
            paddingVertical: 8,
            borderRadius: 8,
          }}
          onPress={onPressRight}
          disabled={index + 1 === data.length}>
          <Text>Next</Text>
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
  },
  subTitle: {
    fontSize: fontSize.small,
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginHorizontal: 22,
  },
});
