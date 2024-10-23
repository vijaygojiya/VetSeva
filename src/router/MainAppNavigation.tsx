import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AppRouts} from '.';
import {LoginScreen, OnboardingScreen, RegistrationScreen} from '@/screens';
import {AppStackParamsList} from '@/types/navigation';
import {colors, fonts, fontSize} from '@/styles';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getCurrentUserInfo} from '@/services/firebase';
import {useMMKVBoolean} from 'react-native-mmkv';
import {storageKeys} from '@/utils';
import TabNavigator from './TabNavigator';

export const renderHeaderBackground = () => {
  return (
    <LinearGradient
      useAngle={true}
      angle={55}
      style={styles.gradientBg}
      colors={[colors.primary600, colors.primary300]}
    />
  );
};
const AppStack = createNativeStackNavigator<AppStackParamsList>();

const MainAppNavigation = () => {
  const [isGetStarted] = useMMKVBoolean(storageKeys.isGetStarted);

  const {data: isLoggedIn} = useQuery({
    queryKey: ['userDetail'],
    queryFn: async () => {
      return getCurrentUserInfo();
    },
    select: Boolean,
  });

  return (
    <NavigationContainer
      theme={{...DefaultTheme, colors: {...DefaultTheme.colors, ...colors}}}>
      <AppStack.Navigator
        screenOptions={{
          animation: 'ios',
          headerShadowVisible: false,
          statusBarStyle: 'light',
          statusBarTranslucent: true,
          headerTintColor: colors.neutral100,
          statusBarColor: colors.transparent,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          headerBackground: renderHeaderBackground,
        }}>
        {isLoggedIn ? (
          <AppStack.Screen
            name={AppRouts.Tab}
            component={TabNavigator}
            options={{
              headerShown: false,
              headerBackground: undefined,
            }}
          />
        ) : (
          <AppStack.Group>
            {isGetStarted ? (
              <>
                <AppStack.Screen
                  name={AppRouts.Login}
                  component={LoginScreen}
                />
                <AppStack.Screen
                  name={AppRouts.Registration}
                  component={RegistrationScreen}
                />
              </>
            ) : (
              <AppStack.Screen
                name={AppRouts.Onboarding}
                component={OnboardingScreen}
                options={{
                  headerShown: false,
                  statusBarStyle: 'dark',
                  headerShadowVisible: false,
                  headerBackground: undefined,
                }}
              />
            )}
          </AppStack.Group>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default MainAppNavigation;

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.medium,
  },
  gradientBg: {flex: 1, backgroundColor: colors.background},
});
