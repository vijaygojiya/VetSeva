import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AppRouts} from '.';
import {
  LoadingScreen,
  LoginScreen,
  OnboardingScreen,
  RegistrationScreen,
} from '@/screens';
import {AppStackParamsList} from '@/types/navigation';
import {colors} from '@/styles';
import {useIsRestoring, useQuery} from '@tanstack/react-query';
import {getCurrentUserInfo} from '@/services/firebase';
import {useMMKVBoolean} from 'react-native-mmkv';
import {storage, storageKeys} from '@/utils';
import TabNavigator from './TabNavigator';
import Routes from './router';
import {useSetupNotification} from '@/hooks';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const MainAppNavigation = () => {
  const [isGetStarted] = useMMKVBoolean(storageKeys.isGetStarted, storage);
  const isRestoring = useIsRestoring();

  useSetupNotification();

  const {data: isLoggedIn} = useQuery({
    queryKey: ['userDetail'],
    queryFn: async () => {
      return getCurrentUserInfo();
    },
    select: Boolean,
  });

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors, ...colors},
      }}>
      <AppStack.Navigator
        screenOptions={{
          statusBarStyle: 'dark',
          statusBarColor: colors.neutral100,
          headerShown: false,
        }}
        initialRouteName={
          isLoggedIn
            ? Routes.Tab
            : isGetStarted
            ? Routes.Login
            : Routes.Onboarding
        }>
        {isRestoring ? (
          <AppStack.Screen name={AppRouts.Loading} component={LoadingScreen} />
        ) : isLoggedIn ? (
          <AppStack.Screen name={AppRouts.Tab} component={TabNavigator} />
        ) : (
          <AppStack.Group>
            <AppStack.Screen
              name={AppRouts.Onboarding}
              component={OnboardingScreen}
            />
            <AppStack.Screen name={AppRouts.Login} component={LoginScreen} />
            <AppStack.Screen
              name={AppRouts.Registration}
              component={RegistrationScreen}
            />
          </AppStack.Group>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default MainAppNavigation;
